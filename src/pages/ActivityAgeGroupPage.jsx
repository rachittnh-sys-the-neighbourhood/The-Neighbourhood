import { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import NavbarV3 from "../components/v3/NavbarV3.jsx";
import FooterV3 from "../components/v3/FooterV3.jsx";
import WaitlistDialogV3 from "../components/v3/LazyWaitlistDialog.jsx";
import { Container } from "../components/ui/Section.jsx";
import Card from "../components/ui/Card.jsx";
import AccentLabel from "../components/ui/AccentLabel.jsx";
import Seo from "../components/seo/Seo.jsx";
import { buildArticle } from "../components/seo/schema.js";
import ContentPageMeta from "../components/content/ContentPageMeta.jsx";
import activities from "../data/activityLibrary.json";
import journeyStages from "../data/journeyStages.json";
import ACTIVITY_AGE_GROUPS from "../data/activityAgeGroups.js";
import { CONTENT_LAUNCH_DATE } from "../data/siteMeta.js";

const LAST_UPDATED = "2026-09-20";

function groupByDomain(list) {
  const order = [];
  const groups = {};
  for (const item of list) {
    if (!groups[item.domain]) {
      groups[item.domain] = [];
      order.push(item.domain);
    }
    groups[item.domain].push(item);
  }
  return order.map((domain) => ({ domain, items: groups[domain] }));
}

/**
 * One page per natural age group (see data/activityAgeGroups.js),
 * pulling from the same real activityLibrary.json the main /activities
 * library page uses — filtered to that age range, and paired with the
 * real developmental note for that stage from journeyStages.json where
 * one exists, rather than just being a narrower slice of the same list.
 */
export default function ActivityAgeGroupPage() {
  const { ageGroup: slug } = useParams();
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  const groupIndex = ACTIVITY_AGE_GROUPS.findIndex((g) => g.slug === slug);
  const group = ACTIVITY_AGE_GROUPS[groupIndex];

  const matched = useMemo(() => {
    if (!group) return [];
    return activities.filter((a) => group.ageBands.includes(a.ageBand));
  }, [group]);

  const byDomain = useMemo(() => groupByDomain(matched), [matched]);

  if (!group) {
    return <Navigate to="/activities" replace />;
  }

  const stage = group.stageId != null ? journeyStages.find((s) => s.id === group.stageId) : null;
  const prev = ACTIVITY_AGE_GROUPS[groupIndex - 1];
  const next = ACTIVITY_AGE_GROUPS[groupIndex + 1];

  const title = `Activities for ${group.label}`;
  const description = `${matched.length} age-specific activities for ${group.label.toLowerCase()}, across gross motor, fine motor, language, cognitive, social-emotional, sensory and self-care.`;

  return (
    <div className="min-h-screen overflow-x-clip bg-cream-peach">
      <Seo
        title={title}
        description={description}
        path={`/activities/${slug}`}
        jsonLd={buildArticle({
          path: `/activities/${slug}`,
          headline: title,
          description,
          datePublished: CONTENT_LAUNCH_DATE,
          dateModified: LAST_UPDATED,
        })}
      />

      <NavbarV3 onJoin={() => setWaitlistOpen(true)} />

      <main className="pt-3xl">
        <Container className="py-2xl md:py-3xl">
          <div className="mx-auto max-w-measure-xl text-center">
            <AccentLabel>Activities &middot; {group.label}</AccentLabel>
            <h1 className="type-hero-display mt-md text-deep-purple">{title}</h1>
            <p className="type-body-large mt-lg text-slate-blue">{description}</p>
          </div>

          {stage?.note && (
            <Card
              as="aside"
              surface="white"
              elevated
              className="mx-auto mt-xl max-w-measure-xl"
            >
              <AccentLabel>Typical at this age &mdash; {stage.title}</AccentLabel>
              <p className="type-body-regular mt-sm text-slate-blue">{stage.note}</p>
              <Link
                to="/child-development"
                className="type-caption mt-sm inline-block underline hover:text-warm-orange"
              >
                See the full milestone picture &rarr;
              </Link>
            </Card>
          )}

          <ContentPageMeta
            className="mx-auto mt-xl max-w-measure-xl"
            lastUpdated={LAST_UPDATED}
            source={`${matched.length} activities from The Neighbourhood's activity library.`}
          />

          <div className="mx-auto mt-3xl flex max-w-measure-xl flex-col gap-lg">
            {byDomain.map(({ domain, items }) => (
              <Card key={domain} as="section" surface="white" elevated>
                <AccentLabel>{domain}</AccentLabel>
                <ul className="mt-sm flex flex-col gap-sm">
                  {items.map((activity) => (
                    <li key={activity.name} className="border-t border-lavender-mist pt-sm">
                      <p className="type-body-small-bold text-deep-purple">{activity.name}</p>
                      <p className="type-body-regular mt-xs text-slate-blue">{activity.howTo}</p>
                      <p className="type-caption mt-xs font-normal text-slate-blue">
                        {activity.durationMin} min &middot; {activity.materials}
                      </p>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <div className="mx-auto mt-2xl flex max-w-measure-xl flex-wrap items-center justify-between gap-md border-t border-lavender-mist pt-xl">
            {prev ? (
              <Link
                to={`/activities/${prev.slug}`}
                className="type-body-regular text-deep-purple transition-colors duration-200 hover:text-warm-orange"
              >
                &larr; {prev.label}
              </Link>
            ) : (
              <span />
            )}
            <Link
              to="/activities"
              className="type-body-regular text-deep-purple underline transition-colors duration-200 hover:text-warm-orange"
            >
              Full activity library
            </Link>
            {next ? (
              <Link
                to={`/activities/${next.slug}`}
                className="type-body-regular text-deep-purple transition-colors duration-200 hover:text-warm-orange"
              >
                {next.label} &rarr;
              </Link>
            ) : (
              <span />
            )}
          </div>
        </Container>
      </main>

      <FooterV3 />
      <WaitlistDialogV3 open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </div>
  );
}
