// Single source of truth for site-wide SEO/GEO constants — the canonical
// domain, default social preview image, and the organisation description
// reused across <Seo>, JSON-LD builders, and llms.txt/sitemap generation.
// Keeping these in one place means the canonical domain or org description
// can never drift between what a page's <head> says and what its
// structured data says.

export const SITE_URL = "https://www.theneighbourhood.co.in";
export const SITE_NAME = "The Neighbourhood";
export const SITE_TAGLINE = "Safe Spaces, Warm Hearts, Bright Futures";

// One factual description, reused everywhere a bot or an AI assistant
// needs to understand what this is in a single paragraph: who it serves,
// the age range, and the three layers (app, community, physical space).
// Every word here is something already said elsewhere on the live site —
// nothing new is being claimed.
export const SITE_DESCRIPTION =
  "The Neighbourhood is a parenting ecosystem for families raising children from birth to age seven, rebuilding the support a village once gave: The Guidance, a quiet app that answers parenting questions shaped by your own child's age and temperament; The Neighbours, small local circles of parents matched by their child's age and stage; and The Spaces, physical spaces including The Aangan, near Sector 31, Gurugram, designed around a child's nervous system.";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.png`;

// Used as Article JSON-LD's datePublished/dateModified wherever a page
// has no other real date to point to — the date this content actually
// became indexable, not a fabricated earlier "written on" date.
export const CONTENT_LAUNCH_DATE = "2026-09-20";

export const ORG_EMAIL = "founders@theneighbourhood.co.in";
export const ORG_LOCATION = "Gurugram, Haryana, India";
export const ORG_LINKEDIN = "https://www.linkedin.com/company/theneighbourhud/";

// TODO(founders): confirm and replace once official social handles exist.
export const SOCIAL_PROFILES = [ORG_LINKEDIN];
