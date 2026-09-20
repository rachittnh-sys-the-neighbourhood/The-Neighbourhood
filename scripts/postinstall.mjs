// On Vercel, scripts/prerender.mjs drives @sparticuz/chromium (a Chromium
// build packaged for restricted Amazon-Linux serverless/build containers)
// via playwright-core, so no separate browser download is needed there —
// and Playwright's own downloaded Chromium can't run in that container
// anyway (it's linked against desktop-Linux shared libraries the container
// doesn't have, e.g. libnspr4.so). Locally, prerender.mjs falls back to
// Playwright's own Chromium, so download it for every other environment.
import { execSync } from "node:child_process";

if (process.env.VERCEL) {
  console.log("Skipping `playwright install chromium` on Vercel (prerender.mjs uses @sparticuz/chromium there).");
} else {
  execSync("playwright install chromium", { stdio: "inherit" });
}
