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
import Contact from "../components/v4/Contact.jsx";

import FounderStory from "../components/v3/FounderStory.jsx";
import Values from "../components/v3/Values.jsx";
import Faq from "../components/v3/Faq.jsx";

const TYPEKIT_STYLESHEET = "https://use.typekit.net/gzw2wee.css";

/**
 * Pull in the legacy edition's webfont only when it's actually rendered,
 * so /type doesn't pay for a type system it doesn't use. Left in place
 * once added — removing it on unmount would cause a visible reflow when
 * navigating within the legacy edition.
 */
function useEditionStylesheet(href) {
  useEffect(() => {
    if (!href || document.querySelector(`link[href="${href}"]`)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }, [href]);
}

/**
 * The site — home, story, values and FAQ, switched by `page`.
 *
 * Two editions share every section component below, so layout, spacing,
 * navigation, animation and behaviour can't drift between them:
 *
 *   legacy (default, "/")   sama-latin type and the flatter, less-rounded
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
  useEditionStylesheet(legacy ? TYPEKIT_STYLESHEET : null);

  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const openWaitlist = () => setWaitlistOpen(true);

  // Legacy routes are rooted at "/"; the refresh previews under /type, so
  // its internal links stay inside it while browsing.
  const basePath = legacy ? "" : "/type";

  const links = [
    { label: "Why we exist", href: `${basePath}#the-question` },
    { label: "What we're building", href: `${basePath}#today` },
    { label: "Our story", href: `${basePath}/story` },
    { label: "Our values", href: `${basePath}/values` },
    { label: "FAQ", href: `${basePath}/faq` },
    { label: "Contact", href: `${basePath}#contact` },
  ];

  const isHome = page === "home";

  return (
    <div
      className={`${legacy ? "edition-legacy" : ""} min-h-screen overflow-x-clip bg-cream-peach`}
    >
      <NavbarV3 onJoin={openWaitlist} links={links} homePath={basePath || "/"} />

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
            <Contact legacy={legacy} />
          </>
        )}
        {page === "story" && <FounderStory />}
        {page === "values" && <Values />}
        {page === "faq" && <Faq />}
      </main>

      <FooterV3 />
      <WaitlistDialogV3 open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </div>
  );
}
