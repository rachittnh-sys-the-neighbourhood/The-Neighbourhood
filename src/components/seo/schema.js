// Pure JSON-LD builder functions. Nothing here invents facts — every
// value either comes from SITE_META constants (already stated elsewhere
// on the live site) or is passed in by the caller from real, visible
// page content (e.g. buildFaqPage(FAQS) from Faq.jsx's own data).
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  ORG_EMAIL,
  SOCIAL_PROFILES,
} from "../../data/siteMeta.js";

export function buildOrganization() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: DEFAULT_OG_IMAGE,
    description: SITE_DESCRIPTION,
    email: ORG_EMAIL,
    sameAs: SOCIAL_PROFILES,
  };
}

export function buildWebSite() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-IN",
  };
}

export function buildAboutPage({ path = "/about", name, description }) {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: `${SITE_URL}${path}`,
    name,
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
  };
}

// Only call this with the exact question/answer pairs already visibly
// rendered on the page — per Google's structured-data guidelines, and
// per this project's own instruction not to add FAQPage schema where the
// Q&A isn't genuinely present on screen.
export function buildFAQPage(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

// Minimal, honest LocalBusiness entry: only the locality the founders
// have confirmed (Sector 31, Gurugram), nothing else. streetAddress,
// telephone, openingHoursSpecification and additional services are left
// as explicit TODOs rather than invented — fill in and the schema
// becomes materially more useful for local search, but it validates and
// is truthful as-is.
export function buildLocalBusiness({ path = "/parenting-space-gurugram", name, description }) {
  return {
    "@context": "https://schema.org",
    "@type": "ChildCare",
    name,
    description,
    url: `${SITE_URL}${path}`,
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sector 31, Gurugram",
      addressRegion: "Haryana",
      addressCountry: "IN",
      // TODO(founders): streetAddress and postalCode.
      streetAddress: "TODO",
      postalCode: "TODO",
    },
    // TODO(founders): telephone number.
    telephone: "TODO",
    // TODO(founders): opening hours, e.g.
    // [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", ...], opens: "09:00", closes: "18:00" }]
    openingHoursSpecification: [],
  };
}

export function buildArticle({
  path,
  headline,
  description,
  datePublished,
  dateModified,
  authorName,
  reviewerName,
  image = DEFAULT_OG_IMAGE,
}) {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}${path}#article`,
    headline,
    description,
    url: `${SITE_URL}${path}`,
    image,
    datePublished,
    dateModified: dateModified || datePublished,
    publisher: { "@id": `${SITE_URL}/#organization` },
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };

  // Person schema only when an actual named author/reviewer is supplied
  // — per this project's own instruction not to fabricate people.
  if (authorName) {
    article.author = { "@type": "Person", name: authorName };
  }
  if (reviewerName) {
    article.reviewedBy = { "@type": "Person", name: reviewerName };
  }

  return article;
}
