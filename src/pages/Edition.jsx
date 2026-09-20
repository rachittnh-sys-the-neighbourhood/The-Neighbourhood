import { useEffect, useState } from "react";
import NavbarV3 from "../components/v3/NavbarV3.jsx";
import FooterV3 from "../components/v3/FooterV3.jsx";
import WaitlistDialogV3 from "../components/v3/WaitlistDialogV3.jsx";

import HeroV4 from "../components/v4/HeroV4.jsx";
import Welcome from "../components/v4/Welcome.jsx";
import TheQuestion from "../components/v4/TheQuestion.jsx";
import Today from "../components/v4/Today.jsx";
import GroundedIn from "../components/v4/GroundedIn.jsx";
import LongArc from "../components/v4/LongArc.jsx";
import Invitation from "../components/v4/Invitation.jsx";
import AppPromo from "../components/v4/AppPromo.jsx";

import FounderStory from "../components/v3/FounderStory.jsx";
import Values from "../components/v3/Values.jsx";
import AboutContact from "../components/v3/AboutContact.jsx";
import Faq from "../components/v3/Faq.jsx";

import Seo from "../components/seo/Seo.jsx";
import { buildOrganization, buildWebSite, buildAboutPage, buildFAQPage } from "../components/seo/schema.js";
import FAQS from "../data/faqs.js";
import { SITE_DESCRIPTION } from "../data/siteMeta.js";

const PAGE_SEO = {
  home: {
    // Not shown anywhere on the page itself (the visible H1 is "Raising
    // a child was never meant to be done alone.") — kept short enough
    // that " | The Neighbourhood" doesn't push the <title> tag past the
    // ~60-char guideline before search results start truncating it.
    title: "A village for families raising kids 0–7",
    // Not SITE_DESCRIPTION — that single dense paragraph is meant for
    // JSON-LD/GEO consumption (still used as-is inside buildOrganization
    // and buildWebSite below) and runs 450+ characters, far past where a
    // search snippet truncates (~155-160 chars). This is the meta tag's
    // own, shorter version of the same facts.
    description:
      "A parenting ecosystem for families raising children aged 0–7: a guidance app, local parent circles, and physical spaces in Gurugram.",
    path: "/",
    jsonLd: [buildOrganization(), buildWebSite()],
  },
  about: {
    title: "About The Neighbourhood",
    description:
      "The founders' story, values, and how to reach us — Sakshi and Rachit, building the village they couldn't find for their own children in Gurugram.",
    path: "/about",
    jsonLd: buildAboutPage({
      path: "/about",
      name: "About The Neighbourhood",
      description: SITE_DESCRIPTION,
    }),
  },
  faq: {
    title: "Frequently asked questions",
    description:
      "Honest answers to what prospective families ask most about The Neighbourhood — location, cost, who's behind it, and what joining the waitlist actually means.",
    path: "/faq",
    jsonLd: buildFAQPage(FAQS),
  },
};

/**
 * The site — home, about (story + values + contact, merged) and FAQ,
 * switched by `page`.
 *
 * Every section component below still takes a `legacy` prop, a leftover
 * from when a second "refresh" edition previewed at /type alongside the
 * live site. That route is retired (see App.jsx) and every remaining
 * route always passes `legacy`, so the refresh branches — HeroV4's trust
 * badge, GroundedIn's Tag badges, Invitation's dark card, the gradient
 * washes in index.css's root tokens vs. .edition-legacy — are dormant
 * rather than removed. Left in place rather than stripped out along with
 * the route.
 */
export default function Edition({ legacy = false, page = "home" }) {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const openWaitlist = () => setWaitlistOpen(true);

  // basePath is only ever "" now that /type is retired (see the comment
  // above) — kept rather than hardcoded, since it's what the dormant
  // refresh branches above still key off of.
  const basePath = legacy ? "" : "/type";

  // Anchors need a real path before the "#", not just the fragment —
  // basePath is "" for legacy, which would otherwise produce a bare
  // "#the-question" href. A bare fragment never navigates; it only
  // scrolls within the current document, so from /about or /faq (a
  // different page than home) it silently does nothing instead of
  // returning to "/" first. Same fix homePath already uses below.
  const homeHref = basePath || "/";

  const links = [
    { label: "Why we exist", href: `${homeHref}#the-question` },
    { label: "What we're building", href: `${homeHref}#today` },
    {
      label: "About Us",
      children: [
        { label: "Our story", href: `${basePath}/about#story` },
        { label: "Our values", href: `${basePath}/about#values` },
        { label: "Contact", href: `${basePath}/about#contact` },
      ],
    },
    { label: "FAQ", href: `${basePath}/faq` },
  ];

  const isHome = page === "home";
  const seo = PAGE_SEO[page];

  // The nav's anchor links (#the-question, #today, #contact) force a real
  // navigation from other routes, not just an in-page jump — but Edition
  // is lazy-loaded, so on a fresh page load the browser's one-shot native
  // "scroll to #fragment" fires before the chunk has even arrived, let
  // alone rendered the target section. By the time this effect runs post
  // mount, every section (including the footer, which is always present)
  // genuinely exists, so it re-does the scroll the browser gave up on.
  // A same-page click (already on "/") never remounts Edition, so this
  // effect doesn't run for it — but the browser's own native scroll
  // already handles that case correctly, since the element was already
  // there.
  useEffect(() => {
    if (!window.location.hash) return;
    const target = document.getElementById(window.location.hash.slice(1));
    target?.scrollIntoView();
  }, []);

  return (
    <div
      className={`${legacy ? "edition-legacy" : ""} min-h-screen overflow-x-clip bg-cream-peach`}
    >
      {seo && <Seo {...seo} />}

      <NavbarV3 onJoin={openWaitlist} links={links} homePath={homeHref} />

      <main className={isHome ? undefined : "pt-3xl"}>
        {isHome && (
          <>
            <HeroV4 onJoin={openWaitlist} legacy={legacy} />
            <Welcome legacy={legacy} />
            <TheQuestion legacy={legacy} />
            <Today onJoin={openWaitlist} legacy={legacy} />
            <GroundedIn legacy={legacy} />
            <LongArc legacy={legacy} />
            <Invitation onJoin={openWaitlist} />
          </>
        )}
        {page === "about" && (
          <>
            <FounderStory />
            <Values />
            <AboutContact />
          </>
        )}
        {page === "faq" && <Faq />}
      </main>

      <FooterV3 />
      <WaitlistDialogV3 open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
      {isHome && <AppPromo />}
    </div>
  );
}
