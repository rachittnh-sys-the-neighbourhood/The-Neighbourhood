import { useState } from "react";
import { Link } from "react-router-dom";
import NavbarV3 from "../components/v3/NavbarV3.jsx";
import FooterV3 from "../components/v3/FooterV3.jsx";
import WaitlistDialogV3 from "../components/v3/WaitlistDialogV3.jsx";
import { Container } from "../components/ui/Section.jsx";
import Card from "../components/ui/Card.jsx";
import AccentLabel from "../components/ui/AccentLabel.jsx";
import Seo from "../components/seo/Seo.jsx";
import { buildArticle } from "../components/seo/schema.js";
import ContentPageMeta from "../components/content/ContentPageMeta.jsx";
import stages from "../data/timelineSummary.js";
import journeyStages from "../data/journeyStages.json";
import { CONTENT_LAUNCH_DATE } from "../data/siteMeta.js";

const DESCRIPTION =
  "The nine developmental stages The Neighbourhood follows from birth to six years, across motor, communication, social/emotional and cognitive growth — no percentiles, no rankings, no comparison to other children.";

// Shorter than DESCRIPTION on purpose — DESCRIPTION is also the visible
// intro paragraph below, but a search-result snippet gets truncated
// around ~155-160 characters, so the meta tag uses its own copy rather
// than reusing (and implicitly shortening) the on-page paragraph.
const META_DESCRIPTION =
  "The nine developmental stages The Neighbourhood follows from birth to six years — motor, communication, social/emotional and cognitive growth.";

const LAST_UPDATED = "2026-09-20";

export default function ChildDevelopmentPage() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-clip bg-cream-peach">
      <Seo
        title="Child development milestones"
        description={META_DESCRIPTION}
        path="/child-development"
        jsonLd={buildArticle({
          path: "/child-development",
          headline: "Child development milestones, birth to six years",
          description: META_DESCRIPTION,
          datePublished: CONTENT_LAUNCH_DATE,
          dateModified: LAST_UPDATED,
        })}
      />

      <NavbarV3 onJoin={() => setWaitlistOpen(true)} />

      <main className="pt-3xl">
        <Container className="py-2xl md:py-3xl">
          <div className="mx-auto max-w-measure-xl text-center">
            <AccentLabel>Child development</AccentLabel>
            <h1 className="type-hero-display mt-md text-deep-purple">
              Every child on their own clock.
            </h1>
            <p className="type-body-large mt-lg text-slate-blue">{DESCRIPTION}</p>
          </div>

          <ContentPageMeta
            className="mx-auto mt-xl max-w-measure-xl"
            lastUpdated={LAST_UPDATED}
            source="Milestones drawn from WHO and Indian Academy of Pediatrics developmental frameworks."
          />

          <div className="mx-auto mt-3xl flex max-w-measure-xl flex-col gap-2xl">
            {stages.map((stage) => {
              const detail = journeyStages.find((s) => s.id === stage.id);
              return (
                <Card key={stage.id} as="section" surface="white" elevated>
                  <AccentLabel>{stage.label}</AccentLabel>
                  <h2 className="type-card-heading mt-sm text-deep-purple">{detail?.title}</h2>
                  {detail?.note && (
                    <p className="type-body-regular mt-sm text-slate-blue">{detail.note}</p>
                  )}
                  <div className="mt-lg grid gap-lg sm:grid-cols-2 lg:grid-cols-4">
                    {stage.highlights.map((h) => (
                      <div key={h.domain}>
                        <p className="type-caption uppercase text-warm-orange">{h.domain}</p>
                        <p className="type-body-regular mt-xs text-deep-purple">{h.milestone}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>

          <p className="type-sub-heading mx-auto mt-3xl max-w-measure-lg text-center text-deep-purple">
            No percentiles. No rankings. No other children.
          </p>

          <p className="type-caption mx-auto mt-md max-w-measure-lg text-center font-normal text-slate-blue">
            This page is general information, not a substitute for your paediatrician. Concerned
            about something specific? See our{" "}
            <Link to="/faq" className="underline hover:text-warm-orange">
              FAQ
            </Link>{" "}
            or the{" "}
            <Link to="/editorial-policy" className="underline hover:text-warm-orange">
              editorial policy
            </Link>{" "}
            behind this page.
          </p>
        </Container>
      </main>

      <FooterV3 />
      <WaitlistDialogV3 open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </div>
  );
}
