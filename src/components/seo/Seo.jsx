import { useEffect } from "react";
import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE } from "../../data/siteMeta.js";

/**
 * Per-route document head management, without a new dependency
 * (react-helmet and friends solve exactly this, but the codebase already
 * favours small custom hooks over extra packages — see useScrollReveal —
 * and this is a small enough problem to match that).
 *
 * Two jobs, matching the two audiences that read <head> tags:
 *
 * 1. Real browsers navigating client-side (React Router never triggers a
 *    full reload, so without this the tab title/meta would stay whatever
 *    the previous route left behind). This component's effect handles it.
 *
 * 2. Crawlers that don't execute JavaScript at all (GPTBot, ClaudeBot,
 *    PerplexityBot, OAI-SearchBot, per their own published docs). This
 *    component's effect does NOT help them — they never run it. That's
 *    what scripts/prerender.mjs is for: it drives a real browser over
 *    each route after `vite build`, waits for exactly these tags to
 *    settle, and freezes the result as static HTML. The props passed
 *    here are what ends up baked into that static file.
 *
 * `jsonLd` accepts one schema object or an array of them; each is
 * serialised into its own <script type="application/ld+json">.
 */
export default function Seo({
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  noindex = false,
  jsonLd,
}) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const canonical = `${SITE_URL}${path === "/" ? "" : path}`;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (selector, attrs) => {
      let el = document.head.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        document.head.appendChild(el);
      }
      Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
    };

    setMeta('meta[name="description"]', { name: "description", content: description });
    setMeta('meta[name="robots"]', {
      name: "robots",
      content: noindex ? "noindex, nofollow" : "index, follow",
    });

    setMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    setMeta('meta[property="og:site_name"]', { property: "og:site_name", content: SITE_NAME });
    setMeta('meta[property="og:title"]', { property: "og:title", content: fullTitle });
    setMeta('meta[property="og:description"]', {
      property: "og:description",
      content: description,
    });
    setMeta('meta[property="og:url"]', { property: "og:url", content: canonical });
    setMeta('meta[property="og:image"]', { property: "og:image", content: image });

    setMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    setMeta('meta[name="twitter:title"]', { name: "twitter:title", content: fullTitle });
    setMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: description,
    });
    setMeta('meta[name="twitter:image"]', { name: "twitter:image", content: image });

    let canonicalEl = document.head.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute("href", canonical);

    // JSON-LD: remove this route's previous script tags before adding
    // the current ones, so navigating away doesn't leave stale
    // structured data describing the wrong page behind in <head>.
    document.head
      .querySelectorAll('script[type="application/ld+json"][data-seo="true"]')
      .forEach((el) => el.remove());

    const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
    schemas.forEach((schema) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.seo = "true";
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      document.head
        .querySelectorAll('script[type="application/ld+json"][data-seo="true"]')
        .forEach((el) => el.remove());
    };
  }, [fullTitle, description, canonical, image, noindex, jsonLd]);

  return null;
}
