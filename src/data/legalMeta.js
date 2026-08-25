// Single source of truth for the dates, version and contact details shown
// across all four legal pages, so they can never drift out of sync from
// one another. Bump `version` and both dates together whenever any of the
// four documents changes materially.
export const LEGAL_META = {
  entityName: "The Neighbourhood",
  effectiveDate: "August 3, 2026",
  lastUpdated: "August 25, 2026",
  version: "1.1",
  contactEmail: "founders@theneighbourhood.co.in",
  location: "Gurugram, Haryana, India",
};
