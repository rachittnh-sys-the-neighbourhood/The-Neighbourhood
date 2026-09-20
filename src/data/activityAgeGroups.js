// Groups activityLibrary.json's 28 raw age bands (quarterly to 3 years,
// then 3-month bands to 7 years — too fine-grained to be distinct,
// searchable pages on their own; nobody searches "activities for a 3
// year 3 month old") into the same 9 natural stages already used by
// journeyStages.json/timelineSummary.js, plus one extra "6-7 years"
// group — the activity library runs to 7 years but the milestones
// dataset stops at 6, so that last group has no matching stageId.
//
// Single source of truth for src/pages/ActivityAgeGroupPage.jsx, the
// "browse by age" links on /activities and /child-development, and the
// route lists in App.jsx, scripts/gen-sitemap.mjs and
// scripts/prerender.mjs — every one of those imports this file rather
// than repeating the slug/label/band list.
const ACTIVITY_AGE_GROUPS = [
  { slug: "0-3-months", label: "0–3 months", stageId: 0, ageBands: ["0–3 months"] },
  { slug: "4-6-months", label: "4–6 months", stageId: 1, ageBands: ["4–6 months"] },
  { slug: "7-9-months", label: "7–9 months", stageId: 2, ageBands: ["7–9 months"] },
  { slug: "10-12-months", label: "10–12 months", stageId: 3, ageBands: ["10–12 months"] },
  {
    slug: "1-2-years",
    label: "1–2 years",
    stageId: 4,
    ageBands: ["13–15 months", "16–18 months", "19–21 months", "22–24 months"],
  },
  {
    slug: "2-3-years",
    label: "2–3 years",
    stageId: 5,
    ageBands: ["25–27 months", "28–30 months", "31–33 months", "34–36 months"],
  },
  {
    slug: "3-4-years",
    label: "3–4 years",
    stageId: 6,
    ageBands: ["3y–3y3m", "3y3m–3y6m", "3y6m–3y9m", "3y9m–4y"],
  },
  {
    slug: "4-5-years",
    label: "4–5 years",
    stageId: 7,
    ageBands: ["4y–4y3m", "4y3m–4y6m", "4y6m–4y9m", "4y9m–5y"],
  },
  {
    slug: "5-6-years",
    label: "5–6 years",
    stageId: 8,
    ageBands: ["5y–5y3m", "5y3m–5y6m", "5y6m–5y9m", "5y9m–6y"],
  },
  {
    slug: "6-7-years",
    label: "6–7 years",
    stageId: null,
    ageBands: ["6y–6y3m", "6y3m–6y6m", "6y6m–6y9m", "6y9m–7y"],
  },
];

export default ACTIVITY_AGE_GROUPS;
