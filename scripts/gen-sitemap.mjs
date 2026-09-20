// Generates public/sitemap.xml from one explicit route list, so "is this
// page in the sitemap" is always a deliberate decision made here, not an
// accident of what happens to exist under src/pages. Routes not listed
// (the noindex scaffolds — /today, /workshops, /nutrition, /fatherhood,
// /parent-guides — and every redirect-only route) are excluded on
// purpose; see each page's own <Seo noindex /> and App.jsx.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ACTIVITY_AGE_GROUPS from "../src/data/activityAgeGroups.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = "https://www.theneighbourhood.co.in";

// changefreq/priority are hints, not guarantees — kept modest and honest
// rather than tuned to game anything.
const ROUTES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/faq", changefreq: "monthly", priority: "0.7" },
  { path: "/parenting-app", changefreq: "monthly", priority: "0.8" },
  { path: "/parenting-community", changefreq: "monthly", priority: "0.8" },
  { path: "/parenting-space-gurugram", changefreq: "monthly", priority: "0.8" },
  { path: "/child-development", changefreq: "monthly", priority: "0.7" },
  { path: "/activities", changefreq: "monthly", priority: "0.7" },
  ...ACTIVITY_AGE_GROUPS.map((g) => ({
    path: `/activities/${g.slug}`,
    changefreq: "monthly",
    priority: "0.6",
  })),
  { path: "/editorial-policy", changefreq: "yearly", priority: "0.3" },
  { path: "/day", changefreq: "monthly", priority: "0.6" },
  { path: "/privacy-policy", changefreq: "yearly", priority: "0.2" },
  { path: "/terms-and-conditions", changefreq: "yearly", priority: "0.2" },
  { path: "/cookie-policy", changefreq: "yearly", priority: "0.2" },
  { path: "/disclaimer", changefreq: "yearly", priority: "0.2" },
];

const lastmod = new Date().toISOString().slice(0, 10);

const urlset = ROUTES.map(
  ({ path: p, changefreq, priority }) => `  <url>
    <loc>${SITE_URL}${p}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
).join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlset}
</urlset>
`;

const outFile = path.join(__dirname, "../public/sitemap.xml");
fs.writeFileSync(outFile, xml);
console.log(`Wrote ${ROUTES.length} URLs to ${outFile}`);
