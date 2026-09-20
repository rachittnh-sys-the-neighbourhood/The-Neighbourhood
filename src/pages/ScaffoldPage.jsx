import { useState } from "react";
import { Link } from "react-router-dom";
import NavbarV3 from "../components/v3/NavbarV3.jsx";
import FooterV3 from "../components/v3/FooterV3.jsx";
import WaitlistDialogV3 from "../components/v3/WaitlistDialogV3.jsx";
import { Container } from "../components/ui/Section.jsx";
import AccentLabel from "../components/ui/AccentLabel.jsx";
import Seo from "../components/seo/Seo.jsx";

/**
 * Shared shell for routes that exist (so the nav/IA can be built and
 * previewed now, and so the URL is stable once real content lands) but
 * have no founder-approved content yet: /workshops, /nutrition,
 * /fatherhood, /parent-guides. Deliberately not "thin SEO content" —
 * it's marked noindex via <Seo> and left out of sitemap.xml (see
 * scripts/gen-sitemap.mjs's ROUTES list) precisely so it never competes
 * for a search ranking it hasn't earned. Un-noindex it and add it to the
 * sitemap once real content replaces this.
 */
export default function ScaffoldPage({ title, description }) {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-clip bg-cream-peach">
      <Seo title={title} description={description} noindex />

      <NavbarV3 onJoin={() => setWaitlistOpen(true)} />

      <main className="pt-3xl">
        <Container className="py-3xl">
          <div className="mx-auto max-w-measure-lg text-center">
            <AccentLabel>Coming soon</AccentLabel>
            <h1 className="type-hero-display mt-md text-deep-purple">{title}</h1>
            <p className="type-body-large mt-lg text-slate-blue">
              We're still putting this together properly, rather than publishing something
              thin just to have the page exist. Join the waitlist and we'll let you know when
              it's ready.
            </p>
            <div className="mt-2xl flex flex-col items-center gap-md">
              <button
                type="button"
                onClick={() => setWaitlistOpen(true)}
                className="type-body-small-bold rounded-pill bg-primary px-2xl py-md text-white transition-colors duration-200 hover:bg-primary-hover"
              >
                Join the waitlist
              </button>
              <Link
                to="/"
                className="type-body-regular text-deep-purple transition-colors duration-200 hover:text-warm-orange"
              >
                Back to home
              </Link>
            </div>
          </div>
        </Container>
      </main>

      <FooterV3 />
      <WaitlistDialogV3 open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </div>
  );
}
