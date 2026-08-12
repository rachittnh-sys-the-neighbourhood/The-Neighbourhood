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

/**
 * Alternate editions of the site.
 *
 * Every edition imports the same section components as the default
 * routes rather than copying them, so layout, spacing, navigation,
 * animation and behaviour are shared and cannot drift between versions.
 * An edition is nothing more than a wrapper class that redefines design
 * tokens for its subtree (see src/index.css), plus the webfont it needs.
 *
 *   typekit — "/"   the refined brand palette, set in sama-latin.
 *
 * This used to preview at /type alongside the old src/legacy design at
 * "/". It's now what "/" itself serves — src/legacy was retired — so
 * basePath is "" and every link below resolves to a root path directly.
 */
const EDITIONS = {
  typekit: {
    // Stacks both classes: the refined palette from .edition-v2, the
    // sama-latin type from .edition-typekit. They set disjoint tokens,
    // so neither wins over the other.
    className: "edition-v2 edition-typekit",
    basePath: "",
    stylesheet: "https://use.typekit.net/gzw2wee.css",
  },
};

/**
 * Pull in an edition's webfont only when that edition is actually
 * rendered, so the default site doesn't pay for three type systems it
 * never uses. The link is added once and left in place — removing it on
 * unmount would cause a visible reflow when navigating within an
 * edition.
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

export default function Edition({ edition = "typekit", page = "home" }) {
  const config = EDITIONS[edition];
  useEditionStylesheet(config.stylesheet);

  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const openWaitlist = () => setWaitlistOpen(true);

  const { basePath } = config;

  // Same nav structure as the default site, rebased onto this edition so
  // a visitor stays inside it while browsing.
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
      className={`${config.className} min-h-screen overflow-x-clip bg-cream-peach`}
    >
      <NavbarV3 onJoin={openWaitlist} links={links} homePath={basePath || "/"} />

      <main className={isHome ? undefined : "pt-3xl"}>
        {isHome && (
          <>
            <HeroV4 onJoin={openWaitlist} />
            <Welcome />
            <TheQuestion />
            <Today onJoin={openWaitlist} />
            <GroundedIn />
            <LongArc />
            <Invitation onJoin={openWaitlist} />
            <Contact />
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
