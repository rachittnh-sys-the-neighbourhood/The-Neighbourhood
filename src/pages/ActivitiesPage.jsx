import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import NavbarV3 from "../components/v3/NavbarV3.jsx";
import FooterV3 from "../components/v3/FooterV3.jsx";
import WaitlistDialogV3 from "../components/v3/WaitlistDialogV3.jsx";
import { Container } from "../components/ui/Section.jsx";
import Card from "../components/ui/Card.jsx";
import AccentLabel from "../components/ui/AccentLabel.jsx";
import Seo from "../components/seo/Seo.jsx";
import ContentPageMeta from "../components/content/ContentPageMeta.jsx";
import activities from "../data/activityLibrary.json";

const DESCRIPTION =
  "A library of age-specific activities for children from birth to seven years, organised by age band and developmental area — gross motor, fine motor, language and communication, cognitive, social-emotional, sensory, and self-care.";

// Grouped once, not per render — 1,149 rows across 28 age bands.
function groupByAgeBand(list) {
  const order = [];
  const groups = {};
  for (const a of list) {
    if (!groups[a.ageBand]) {
      groups[a.ageBand] = [];
      order.push(a.ageBand);
    }
    groups[a.ageBand].push(a);
  }
  return order.map((ageBand) => ({ ageBand, items: groups[ageBand] }));
}

function AgeBandSection({ ageBand, items, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);

  const byDomain = useMemo(() => {
    const groups = {};
    const order = [];
    for (const item of items) {
      if (!groups[item.domain]) {
        groups[item.domain] = [];
        order.push(item.domain);
      }
      groups[item.domain].push(item);
    }
    return order.map((domain) => ({ domain, items: groups[domain] }));
  }, [items]);

  return (
    <Card as="section" surface="white" elevated>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between text-left"
      >
        <div>
          <AccentLabel>{ageBand}</AccentLabel>
          <h2 className="type-card-heading mt-xs text-deep-purple">
            {items.length} activities
          </h2>
        </div>
        <span
          className="material-symbols-outlined text-warm-orange transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "none" }}
          aria-hidden="true"
        >
          expand_more
        </span>
      </button>

      {/* Kept in the DOM (not unmounted) even when visually collapsed —
          a static-HTML snapshot of this page (see scripts/prerender.mjs)
          needs the full activity library present in markup, since a
          non-JS crawler never runs the click that would reveal it. */}
      <div
        className={`grid overflow-hidden transition-all duration-300 ${
          open ? "mt-lg grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="flex min-h-0 flex-col gap-lg">
          {byDomain.map(({ domain, items: domainItems }) => (
            <div key={domain}>
              <p className="type-caption uppercase text-warm-orange">{domain}</p>
              <ul className="mt-sm flex flex-col gap-sm">
                {domainItems.map((activity) => (
                  <li key={activity.name} className="border-t border-lavender-mist pt-sm">
                    <p className="type-body-small-bold text-deep-purple">{activity.name}</p>
                    <p className="type-body-regular mt-xs text-slate-blue">{activity.howTo}</p>
                    <p className="type-caption mt-xs font-normal text-slate-blue">
                      {activity.durationMin} min &middot; {activity.materials}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default function ActivitiesPage() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const grouped = useMemo(() => groupByAgeBand(activities), []);

  return (
    <div className="min-h-screen overflow-x-clip bg-cream-peach">
      <Seo title="Activities by age, birth to seven years" description={DESCRIPTION} path="/activities" />

      <NavbarV3 onJoin={() => setWaitlistOpen(true)} />

      <main className="pt-3xl">
        <Container className="py-2xl md:py-3xl">
          <div className="mx-auto max-w-measure-xl text-center">
            <AccentLabel>Activities</AccentLabel>
            <h1 className="type-hero-display mt-md text-deep-purple">
              An activity for every age and stage.
            </h1>
            <p className="type-body-large mt-lg text-slate-blue">{DESCRIPTION}</p>
          </div>

          <ContentPageMeta
            className="mx-auto mt-xl max-w-measure-xl"
            lastUpdated="2026-09-20"
            source={`${activities.length} activities across ${grouped.length} age bands, from The Neighbourhood's activity library.`}
          />

          <div className="mx-auto mt-3xl flex max-w-measure-xl flex-col gap-lg">
            {grouped.map((group, i) => (
              <AgeBandSection key={group.ageBand} {...group} defaultOpen={i === 0} />
            ))}
          </div>

          <p className="type-caption mx-auto mt-3xl max-w-measure-lg text-center font-normal text-slate-blue">
            Curious how these connect to broader milestones? See{" "}
            <Link to="/child-development" className="underline hover:text-warm-orange">
              child development, birth to six years
            </Link>
            .
          </p>
        </Container>
      </main>

      <FooterV3 />
      <WaitlistDialogV3 open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </div>
  );
}
