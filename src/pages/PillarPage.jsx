import { useState } from "react";
import { Link } from "react-router-dom";
import NavbarV3 from "../components/v3/NavbarV3.jsx";
import FooterV3 from "../components/v3/FooterV3.jsx";
import WaitlistDialogV3 from "../components/v3/WaitlistDialogV3.jsx";
import { Container } from "../components/ui/Section.jsx";
import AccentLabel from "../components/ui/AccentLabel.jsx";
import Button from "../components/ui/Button.jsx";
import BlobImage from "../components/ui/BlobImage.jsx";
import Seo from "../components/seo/Seo.jsx";
import { buildLocalBusiness } from "../components/seo/schema.js";
import PILLARS from "../data/pillars.js";

/**
 * Shared layout for the three pillar pages (/parenting-app,
 * /parenting-community, /parenting-space-gurugram) — each is the same
 * homepage "What we're building" copy (see data/pillars.js) given its
 * own indexable URL, real <h1>, and cross-links to the other two and to
 * /about, rather than three near-duplicate page components.
 */
export default function PillarPage({ slug }) {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const pillar = PILLARS.find((p) => p.slug === slug);
  const others = PILLARS.filter((p) => p.slug !== slug);

  const isSpaces = slug === "parenting-space-gurugram";

  const jsonLd = isSpaces
    ? buildLocalBusiness({
        path: `/${slug}`,
        name: `The Neighbourhood — ${pillar.eyebrow}`,
        description: pillar.body,
      })
    : undefined;

  return (
    <div className="min-h-screen overflow-x-clip bg-cream-peach">
      <Seo
        title={pillar.title}
        description={pillar.body}
        path={`/${slug}`}
        image={pillar.image.src}
        jsonLd={jsonLd}
      />

      <NavbarV3 onJoin={() => setWaitlistOpen(true)} />

      <main className="pt-3xl">
        <Container className="py-2xl md:py-3xl">
          <div className="mx-auto max-w-measure-xl text-center">
            <AccentLabel>{pillar.eyebrow}</AccentLabel>
            <h1 className="type-hero-display mt-md text-deep-purple">{pillar.title}</h1>
            <p className="type-body-large mt-lg text-slate-blue">{pillar.body}</p>
          </div>

          <div className="mx-auto mt-2xl max-w-measure-sm">
            <BlobImage src={pillar.image.src} alt={pillar.image.alt} variant="a" />
          </div>

          {isSpaces && (
            <p className="type-caption mx-auto mt-lg max-w-measure text-center font-normal text-slate-blue">
              Near Sector 31, Gurugram. Full address and visiting details are shared with
              founding families as spaces open — see the{" "}
              <Link to="/faq" className="underline hover:text-warm-orange">
                FAQ
              </Link>{" "}
              for what's confirmed today.
            </p>
          )}

          <div className="mx-auto mt-2xl flex flex-col items-center gap-md">
            <Button onClick={() => setWaitlistOpen(true)} size="lg">
              Start with your child
            </Button>
          </div>

          <div className="mx-auto mt-3xl max-w-measure-lg border-t border-lavender-mist pt-2xl text-center">
            <AccentLabel className="mb-md">The other two parts</AccentLabel>
            <div className="flex flex-col items-center gap-sm sm:flex-row sm:justify-center sm:gap-2xl">
              {others.map((other) => (
                <Link
                  key={other.slug}
                  to={`/${other.slug}`}
                  className="type-body-regular text-deep-purple transition-colors duration-200 hover:text-warm-orange"
                >
                  {other.eyebrow} &rarr;
                </Link>
              ))}
              <Link
                to="/about"
                className="type-body-regular text-deep-purple transition-colors duration-200 hover:text-warm-orange"
              >
                Our story &rarr;
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
