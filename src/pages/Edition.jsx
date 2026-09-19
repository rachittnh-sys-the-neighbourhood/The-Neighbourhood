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
import Faq from "../components/v3/Faq.jsx";

/**
 * The site — home, story, values and FAQ, switched by `page`.
 *
 * Two editions share every section component below, so layout, spacing,
 * navigation, animation and behaviour can't drift between them:
 *
 *   legacy (default, "/")   Inter type and the flatter, less-rounded
 *                           geometry that's live today — see
 *                           .edition-legacy in index.css. Same brand
 *                           palette as refresh; colour was never part of
 *                           this split.
 *   refresh ("/type")       this session's redesign: Poppins + italic
 *                           Playfair Display, rounder geometry, soft
 *                           shadows and gradient washes — the bare root
 *                           tokens, i.e. what renders with no wrapper
 *                           class at all.
 *
 * `legacy` also reaches every section with a genuine structural difference
 * between editions — a token override alone can restyle an existing
 * element, but can't add, remove, or reshape one: HeroV4's trust badge,
 * GroundedIn's Tag badges, Invitation's dark card and its atmosphere, and
 * the soft layered background washes (`gradient` on <Section>, see
 * GRADIENT WASHES in index.css) that every homepage section carries in
 * refresh but not in legacy.
 */
export default function Edition({ legacy = false, page = "home" }) {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const openWaitlist = () => setWaitlistOpen(true);

  // Legacy routes are rooted at "/"; the refresh previews under /type, so
  // its internal links stay inside it while browsing.
  const basePath = legacy ? "" : "/type";

  // Anchors need a real path before the "#", not just the fragment —
  // basePath is "" for legacy, which would otherwise produce a bare
  // "#the-question" href. A bare fragment never navigates; it only
  // scrolls within the current document, so from /story, /values or
  // /faq (a different page than home) it silently does nothing instead
  // of returning to "/" first. Same fix homePath already uses below.
  const homeHref = basePath || "/";

  const links = [
    { label: "Why we exist", href: `${homeHref}#the-question` },
    { label: "What we're building", href: `${homeHref}#today` },
    { label: "Our story", href: `${basePath}/story` },
    { label: "Our values", href: `${basePath}/values` },
    { label: "FAQ", href: `${basePath}/faq` },
    { label: "Contact", href: `${homeHref}#contact` },
  ];

  const isHome = page === "home";

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
        {page === "story" && <FounderStory />}
        {page === "values" && <Values />}
        {page === "faq" && <Faq />}
      </main>

      <FooterV3 />
      <WaitlistDialogV3 open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
      {isHome && <AppPromo />}
    </div>
  );
}
