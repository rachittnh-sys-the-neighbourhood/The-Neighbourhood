// Post-build static-HTML snapshotting.
//
// Why this exists: this app is a client-rendered SPA (no SSR/SSG). Real
// browsers and Googlebot execute JavaScript and eventually see rendered
// content, but GPTBot, ClaudeBot, PerplexityBot and OAI-SearchBot do not
// (per their own published crawler docs) — they read raw HTML only, and
// without this step every route would serve the same empty
// `<div id="root"></div>` shell.
//
// This script starts `vite preview` against the just-built dist/,
// drives a real (headless) browser to each route below, waits for the
// <Seo> component's effect to populate <head> and for the page's own
// content to render, and writes the resulting full HTML to
// dist/<route>/index.html. Vercel serves a matching static file before
// it ever applies vercel.json's SPA rewrite, so each of these routes
// then serves fully-rendered HTML to every crawler — while the same
// file still boots the React app and hydrates into the normal
// interactive SPA for a real visitor, since the bundled <script> tag is
// preserved as-is.
//
// Routes NOT listed here (redirect-only routes, e.g. /story, /v1) don't
// need prerendering — they have no content of their own to snapshot.
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, "../dist");
const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;

const ROUTES = [
  "/",
  "/about",
  "/faq",
  "/parenting-app",
  "/parenting-community",
  "/parenting-space-gurugram",
  "/child-development",
  "/activities",
  "/editorial-policy",
  "/today",
  "/day",
  "/workshops",
  "/nutrition",
  "/fatherhood",
  "/parent-guides",
  "/privacy-policy",
  "/terms-and-conditions",
  "/cookie-policy",
  "/disclaimer",
];

// Vercel's build container is a minimal Amazon-Linux image: it's missing
// the desktop-Linux shared libraries (libnspr4.so, libnss3.so, ...) that
// Playwright's own downloaded Chromium is linked against, so that binary
// can't launch there at all. @sparticuz/chromium ships a Chromium build
// packaged specifically for that kind of restricted serverless/build
// container (self-contained, no missing-.so problem) — use it there, via
// playwright-core, and fall back to Playwright's own Chromium (installed
// locally by scripts/postinstall.mjs) everywhere else.
async function launchBrowser() {
  if (process.env.VERCEL) {
    const { default: sparticuzChromium } = await import("@sparticuz/chromium");
    return chromium.launch({
      args: sparticuzChromium.args,
      executablePath: await sparticuzChromium.executablePath(),
      headless: true,
    });
  }
  return chromium.launch({ args: ["--no-sandbox"] });
}

function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const attempt = async () => {
      try {
        const res = await fetch(url);
        if (res.ok || res.status === 404) return resolve();
      } catch {
        // not up yet
      }
      if (Date.now() - start > timeoutMs) {
        return reject(new Error(`Server at ${url} did not start within ${timeoutMs}ms`));
      }
      setTimeout(attempt, 300);
    };
    attempt();
  });
}

async function main() {
  if (!fs.existsSync(DIST_DIR)) {
    console.error("dist/ not found — run `vite build` first.");
    process.exit(1);
  }

  console.log("Starting vite preview server...");
  const server = spawn(
    "npx",
    ["vite", "preview", "--port", String(PORT), "--strictPort"],
    { stdio: "pipe" }
  );
  server.on("error", (err) => {
    console.error("Failed to start preview server:", err);
    process.exit(1);
  });

  try {
    await waitForServer(BASE_URL);

    const browser = await launchBrowser();
    const page = await browser.newPage();

    for (const route of ROUTES) {
      const url = `${BASE_URL}${route}`;
      await page.goto(url, { waitUntil: "load", timeout: 30000 });

      // <Seo>'s effect runs on mount, synchronously fast — but give
      // React one tick, plus wait for the description tag it creates,
      // as a concrete signal the route actually rendered rather than
      // snapshotting mid-mount.
      await page
        .waitForFunction(() => !!document.querySelector('meta[name="description"]'), {
          timeout: 5000,
        })
        .catch(() => {
          console.warn(`  (no <meta name="description"> detected for ${route} — snapshotting anyway)`);
        });

      const html = await page.content();

      const outDir = route === "/" ? DIST_DIR : path.join(DIST_DIR, route.slice(1));
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, "index.html"), html);
      console.log(`Prerendered ${route} -> ${path.relative(DIST_DIR, path.join(outDir, "index.html")) || "index.html"}`);
    }

    await browser.close();
  } finally {
    server.kill();
  }

  console.log(`Prerendered ${ROUTES.length} routes.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
