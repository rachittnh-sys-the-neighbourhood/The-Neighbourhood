// One-time-ish conversion of the mobile app's activity library CSV into
// JSON this repo can import directly. The source CSV lives in the
// mobile repo (the-neighbourhood-mobile/content/activity_library.csv),
// not this one, and this project's build doesn't have access to that
// repo at Vercel build time — so the output is committed as static data
// here, same as journeyStages.json. Re-run manually (with SOURCE_CSV
// pointed at the current file) whenever the mobile team updates the
// source library.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SOURCE_CSV =
  process.env.SOURCE_CSV ||
  "/Users/theneighbourhood/Downloads/the-neighbourhood-mobile/content/activity_library.csv";
const OUT_FILE = path.join(__dirname, "../src/data/activityLibrary.json");

function parseCsv(input) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < input.length; i++) {
    const c = input[i];
    if (inQuotes) {
      if (c === '"') {
        if (input[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (c === "\r") {
      // skip
    } else {
      field += c;
    }
  }
  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

const text = fs.readFileSync(SOURCE_CSV, "utf-8");
const rows = parseCsv(text);
const dataRows = rows.slice(1).filter((r) => r.length === 6 && r[0].trim());

const activities = dataRows.map((r) => ({
  name: r[0].trim(),
  howTo: r[1].trim(),
  domain: r[2].trim(),
  durationMin: r[3].trim(),
  materials: r[4].trim(),
  ageBand: r[5].trim(),
}));

fs.writeFileSync(OUT_FILE, JSON.stringify(activities, null, 2) + "\n");
console.log(`Wrote ${activities.length} activities to ${OUT_FILE}`);
