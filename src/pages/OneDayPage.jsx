import { useMemo, useState } from "react";
import NavbarV3 from "../components/v3/NavbarV3.jsx";
import FooterV3 from "../components/v3/FooterV3.jsx";
import WaitlistDialogV3 from "../components/v3/WaitlistDialogV3.jsx";
import useScrollReveal from "../components/useScrollReveal.js";
import journeyStages from "../data/journeyStages.json";
import Seo from "../components/seo/Seo.jsx";
import { buildArticle } from "../components/seo/schema.js";
import { CONTENT_LAUNCH_DATE } from "../data/siteMeta.js";
import aanganSpace from "../assets/aangan-space.jpg";
import neighboursCircle from "../assets/neighbours-circle.jpg";
import guidancePhone from "../assets/guidance-phone.jpg";

/**
 * /day — "One Day, Lived."
 *
 * An experimental landing page told as a single day in second person:
 * six timestamps from 6:41 am to 2:07 am, each answering one of the
 * visitor's unspoken questions. The three layers of the product are never
 * named — they simply appear where they live in a real day: the phone in
 * the morning and at night, the Aangan mid-morning, the circle of parents
 * in the afternoon. One interactive beat (the age question at 6:20 pm)
 * personalises the evening activity from the real journeyStages data.
 * The current homepage at "/" is untouched.
 */

// Age pill -> stage id in journeyStages.json. The dataset is now 9
// stages — quarterly to 12 months, then yearly to 6 years — rather than
// the 15-stage (quarterly to 3 years) version this used to index into,
// so "One" through "Five" map to the yearly bands (ids 4–8); "Under 1"
// still lands on a quarterly one (id 2 = 7–9 months) since those didn't
// move.
const AGE_OPTIONS = [
  { label: "Under 1", stageId: 2 },
  { label: "One", stageId: 4 },
  { label: "Two", stageId: 5 },
  { label: "Three", stageId: 6 },
  { label: "Four", stageId: 7 },
  { label: "Five", stageId: 8 },
];

const DEFAULT_STAGE_ID = 4; // 1–2 years — the season most scenes reference

// Matches an activity's domain to the emoji MorningNote/the evening scene
// render inline. Kept to the four domains journeyStages.json actually
// uses (see the domain names in the data itself).
const DOMAIN_ICON = {
  Motor: "🏃",
  Communication: "💬",
  "Social & Emotional": "🤝",
  Cognitive: "🧠",
};

// journeyStages.json holds developmental milestones grouped by domain,
// not the activityThemes shape this used to read — see the matching
// comment on getStageActivities in TodayPage.jsx. The first domain with
// a milestone becomes the sample activity; guide.try is the suggested
// practice.
function firstActivityOf(stage) {
  const domain = stage.domains.find((d) => d.milestones?.[0]?.guide?.try);
  const milestone = domain?.milestones?.[0];
  return milestone
    ? {
        icon: DOMAIN_ICON[domain.name] || "🌱",
        name: milestone.text,
        tagline: domain.name,
        why: milestone.guide.try,
        steps: [milestone.guide.try],
        theme: domain.name,
      }
    : null;
}

function observationFor(stage) {
  const domain = stage.domains.find((d) => d.milestones?.[0]?.guide?.watch);
  const watch = domain?.milestones?.[0]?.guide?.watch || "";
  return watch.replace(/\.$/, "").toLowerCase();
}

/**
 * A thin arc with a marker showing where this moment sits in the day.
 * Daytime hours render a filled warm dot above the line (the sun's path);
 * night hours render a hollow dot on the mirrored arc beneath it.
 */
function TimeMark({ hour, minute = 0 }) {
  const h = hour + minute / 60;
  const isDay = h >= 6 && h < 18;
  const t = isDay ? (h - 6) / 12 : ((h - 18 + 24) % 24) / 12;

  const P0 = { x: 8, y: 26 };
  const P1 = { x: 112, y: 26 };
  const C = { x: 60, y: isDay ? -6 : 58 };
  const x = (1 - t) * (1 - t) * P0.x + 2 * (1 - t) * t * C.x + t * t * P1.x;
  const y = (1 - t) * (1 - t) * P0.y + 2 * (1 - t) * t * C.y + t * t * P1.y;

  return (
    <svg viewBox="0 0 120 52" className="w-20 h-9" aria-hidden="true">
      <path d="M 8 26 Q 60 -6 112 26" fill="none" stroke="#8B7355" strokeOpacity="0.25" strokeWidth="1.5" />
      {isDay ? (
        <circle cx={x} cy={y} r="4" fill="#8B7355" />
      ) : (
        <circle cx={x} cy={y} r="4" fill="none" stroke="#4A3323" strokeWidth="1.5" />
      )}
    </svg>
  );
}

/** Shared scene shell: timestamp + arc, then whatever the moment holds. */
function Scene({ id, time, hour, minute, title, children, className = "" }) {
  const { ref, inView } = useScrollReveal(0.2);
  return (
    <section
      ref={ref}
      id={id}
      className={`v3-fade ${inView ? "in-view" : ""} py-16 md:py-24 px-margin-mobile md:px-gutter ${className}`}
    >
      <div className="max-w-container-max mx-auto">
        <div className="flex items-center gap-5 mb-6">
          <TimeMark hour={hour} minute={minute} />
          <p className="v3-eyebrow text-warm-taupe">{time}</p>
        </div>
        <h2 className="v3-h2 text-charcoal max-w-2xl mb-8">{title}</h2>
        {children}
      </div>
    </section>
  );
}

/** The app's morning note, rendered as the artifact itself — not a screenshot. */
function MorningNote({ activity }) {
  return (
    <div className="max-w-md rounded-[24px] bg-white/50 border border-warm-taupe/15 p-7 shadow-[0_18px_60px_rgba(139,115,85,0.08)]">
      <p className="v3-eyebrow text-warm-taupe mb-4">This morning</p>
      <p className="text-charcoal text-[15px] leading-relaxed mb-3">
        Good morning. One small idea for today, whenever it fits:
      </p>
      <p className="font-medium text-charcoal mb-1">
        {activity.icon} {activity.name}
      </p>
      <p className="v3-serif italic text-sm text-on-surface-variant">{activity.tagline}</p>
    </div>
  );
}

export default function OneDayPage() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [stageId, setStageId] = useState(null); // null until the visitor answers
  const [noticed, setNoticed] = useState(null); // demo-only, never persisted

  const stage = useMemo(
    () => journeyStages.find((s) => s.id === (stageId ?? DEFAULT_STAGE_ID)),
    [stageId]
  );
  const activity = useMemo(() => firstActivityOf(stage), [stage]);
  const watchText = useMemo(() => observationFor(stage), [stage]);

  return (
    <div className="overflow-x-clip bg-surface-cream min-h-screen">
      <Seo
        title="One day, lived"
        description="Raising a child was never meant to be done alone — a walk through one ordinary day inside The Neighbourhood, from a 2am search to the friends who become family."
        path="/day"
        jsonLd={buildArticle({
          path: "/day",
          headline: "One day, lived",
          description:
            "Raising a child was never meant to be done alone — a walk through one ordinary day inside The Neighbourhood, from a 2am search to the friends who become family.",
          datePublished: CONTENT_LAUNCH_DATE,
        })}
      />

      <NavbarV3 onJoin={() => setWaitlistOpen(true)} />

      {/* HERO — orientation, not intrigue. Headline is final. One photograph,
          one CTA, and no animation performing for attention: everything
          arrives together, still. */}
      <header className="pt-40 md:pt-48 pb-20 px-margin-mobile md:px-gutter">
        <div className="max-w-container-max mx-auto grid lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-7">
            <p className="v3-eyebrow text-warm-taupe mb-6">One day in the village</p>
            <h1 className="v3-display text-charcoal max-w-3xl">
              Raising a child was never meant to be done{" "}
              <em className="v3-serif text-warm-taupe">alone.</em>
            </h1>
            <p className="v3-body-lg text-on-surface-variant mt-7 max-w-2xl">
              The Neighbourhood is a village for your child&rsquo;s first six years
              &mdash; calm preschools, a daily companion on your phone, and parents
              who become real neighbours. Joining is free, and it starts the day
              you do.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <button
                onClick={() => setWaitlistOpen(true)}
                className="bg-charcoal text-surface-cream px-9 py-4 rounded-full font-medium text-lg hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
              >
                Join the Village
              </button>
              <a
                href="#morning"
                className="text-charcoal/70 hover:text-charcoal text-base underline underline-offset-4 decoration-soft-sand transition-colors"
              >
                Or scroll through one day
              </a>
            </div>
          </div>
          <div className="hidden lg:block lg:col-span-5">
            <div className="rounded-[28px] overflow-hidden aspect-[4/3]">
              <img
                src={neighboursCircle}
                alt="Parents sitting together in easy conversation while their children read on a rug nearby, in warm evening light"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* 6:41 AM — What is this? */}
        <Scene id="morning" time="6:41 am" hour={6} minute={41} title="Your kitchen. Still quiet.">
          <div className="grid md:grid-cols-2 gap-10 items-center max-w-4xl">
            <p className="v3-body-lg text-on-surface-variant max-w-md">
              The kettle&rsquo;s on. Your phone sits on the counter, and on it,
              three lines &mdash; one small idea for the day. No feed. No noise.
              Nothing to catch up on. Just today, offered gently.
            </p>
            <MorningNote activity={activity} />
          </div>
        </Scene>

        {/* 9:15 AM — the seam: this part is real. */}
        <Scene time="9:15 am" hour={9} minute={15} title="Your phone is in your pocket. The village is a building." className="bg-white/30">
          <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl">
            <div className="rounded-[28px] overflow-hidden aspect-[4/3]">
              <img
                src={aanganSpace}
                alt="Inside The Aangan: a child absorbed in a wooden activity tray in a calm, light-filled Montessori room"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="max-w-md">
              <p className="v3-body-lg text-on-surface-variant mb-6">
                Low shelves. Soft light. Room to move. A place designed around a
                child&rsquo;s nervous system, where the morning simply unfolds.
              </p>
              <p className="v3-serif italic text-xl text-charcoal leading-relaxed">
                This part isn&rsquo;t an app. You can walk into it.
              </p>
            </div>
          </div>
        </Scene>

        {/* 1:30 PM — Can I trust it? (people, not technology) */}
        <Scene time="1:30 pm" hour={13} minute={30} title="A message from someone who gets it.">
          <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl">
            <div className="max-w-md order-2 md:order-1">
              <div className="rounded-[20px] bg-white/60 border border-warm-taupe/15 px-5 py-4 mb-3 max-w-xs">
                <p className="text-[15px] text-charcoal">she napped!! the wind-down thing worked 🙏</p>
              </div>
              <div className="rounded-[20px] bg-surface-container-low/80 border border-warm-taupe/10 px-5 py-4 mb-6 max-w-xs ml-8">
                <p className="text-[15px] text-charcoal">told you. same time tomorrow :)</p>
              </div>
              <p className="v3-body-lg text-on-surface-variant">
                Not a forum. Not five hundred strangers. A small circle of
                parents whose children are the same age as yours &mdash; the same
                faces, week after week, until they stop being strangers.
              </p>
            </div>
            <div className="rounded-[28px] overflow-hidden aspect-[4/3] order-1 md:order-2">
              <img
                src={neighboursCircle}
                alt="Parents sitting on floor cushions in easy conversation beneath a tree-shaped bookshelf while two children read nearby"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Scene>

        {/* 6:20 PM — How does it help me? The interactive beat. */}
        <Scene time="6:20 pm" hour={18} minute={20} title="Five minutes on the kitchen floor." className="bg-surface-container-low/50">
          <div className="max-w-2xl">
            <p className="v3-body-lg text-on-surface-variant mb-8">
              Dinner&rsquo;s done. There&rsquo;s a small window before the bath
              &mdash; and tonight&rsquo;s five minutes are already waiting.
              They&rsquo;re not generic. They&rsquo;re built for exactly where
              your child is right now.
            </p>

            <div className="mb-8">
              <p className="v3-eyebrow text-warm-taupe mb-4">How old is yours?</p>
              <div className="flex flex-wrap gap-3" role="group" aria-label="Choose your child's age">
                {AGE_OPTIONS.map((option) => (
                  <button
                    key={option.label}
                    onClick={() => setStageId(option.stageId)}
                    aria-pressed={stageId === option.stageId}
                    className={`px-6 py-3 rounded-full border text-sm transition-all duration-200 ${
                      stageId === option.stageId
                        ? "bg-charcoal text-surface-cream border-charcoal"
                        : "border-warm-taupe/25 text-charcoal hover:bg-warm-taupe/10"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] bg-white/55 border border-warm-taupe/15 p-7 md:p-8 shadow-[0_18px_60px_rgba(139,115,85,0.08)]">
              <p className="v3-eyebrow text-warm-taupe mb-3">
                {stage.label} &middot; tonight&rsquo;s five minutes
              </p>
              <p className="text-lg font-semibold text-charcoal mb-2">
                {activity.icon} {activity.name}
              </p>
              <p className="v3-serif italic text-on-surface-variant mb-5">{activity.tagline}</p>
              <ul className="space-y-2">
                {activity.steps.slice(0, 3).map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-on-surface-variant">
                    <span className="text-warm-taupe flex-shrink-0">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ul>
              {stageId === null && (
                <p className="text-xs text-on-surface-variant/60 mt-5 italic">
                  Showing {stage.label} — tap an age above and this becomes your child&rsquo;s.
                </p>
              )}
            </div>
          </div>
        </Scene>

        {/* 9:50 PM — What happens every day? The noticed milestone. */}
        <Scene time="9:50 pm" hour={21} minute={50} title="A moment you'd have missed, noticed.">
          <div className="max-w-2xl">
            <p className="v3-body-lg text-on-surface-variant mb-8">
              The house is finally quiet. One soft question appears &mdash; not a
              form, not a score. Just something worth remembering.
            </p>

            <div className="rounded-[24px] bg-white/55 border border-warm-taupe/15 p-7 md:p-8 max-w-lg">
              <p className="v3-eyebrow text-warm-taupe mb-4">From today</p>
              <p className="v3-h3 text-charcoal mb-6 leading-snug">
                Did you notice {watchText}?
              </p>
              {noticed ? (
                <p className="v3-serif italic text-lg text-charcoal today-response-enter">
                  {noticed === "yes"
                    ? "Noticed. That's all tracking ever needed to be."
                    : "That's alright — it'll come when it comes. We'll keep an eye out together."}
                </p>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {[
                    { label: "Yes", value: "yes" },
                    { label: "Not yet", value: "notyet" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setNoticed(option.value)}
                      className="px-6 py-3 rounded-full border border-warm-taupe/25 text-charcoal hover:bg-warm-taupe/10 transition-colors"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Scene>

        {/* 2:07 AM — Why is this different? The answer in the dark. */}
        <section className="px-margin-mobile md:px-gutter py-16 md:py-24">
          <div className="max-w-container-max mx-auto bg-charcoal rounded-[40px] px-8 py-16 md:p-20 relative overflow-hidden">
            <div className="flex items-center gap-5 mb-6">
              <TimeMark hour={2} minute={7} />
              <p className="v3-eyebrow text-soft-sand/70">2:07 am</p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="v3-h2 text-surface-cream max-w-md mb-7">
                  She&rsquo;s awake. So are you. You ask the dark a question.
                </h2>
                <p className="v3-body-lg text-surface-cream/70 max-w-md mb-6">
                  And the answer that comes back isn&rsquo;t ten blue links
                  written for an average child who doesn&rsquo;t exist. It knows
                  her age. It knows her temperament. It knows she had a short nap.
                </p>
                <p className="v3-serif italic text-xl text-soft-sand leading-relaxed">
                  It answers like a friend who happens to know the research.
                </p>
              </div>
              <div className="rounded-[28px] overflow-hidden aspect-[4/3]">
                <img
                  src={guidancePhone}
                  alt="A phone held up at night showing a gentle, reassuring reply, a sleeping baby softly visible in warm lamplight"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* DAWN — the close of the loop. */}
        <Scene time="6:41 am, again" hour={6} minute={41} title="And then it's tomorrow.">
          <p className="v3-serif italic text-2xl md:text-3xl text-charcoal leading-relaxed max-w-2xl">
            That&rsquo;s the product. That&rsquo;s all of it. A village that
            shows up every day &mdash; on your counter, down your street, in
            your corner of the world &mdash; until raising a child stops
            feeling like something you do alone.
          </p>
        </Scene>

        {/* THE LETTER — trust, compressed. */}
        <section className="px-margin-mobile md:px-gutter py-16 md:py-24">
          <div className="max-w-container-max mx-auto">
            <div className="max-w-2xl mx-auto rounded-[28px] bg-white/45 border border-warm-taupe/15 p-8 md:p-14">
              <p className="v3-eyebrow text-warm-taupe mb-8">A note from the founders</p>
              <div className="space-y-5 v3-body-lg text-on-surface-variant">
                <p>
                  We looked everywhere for a place that got safety, warmth and
                  learning right at the same time &mdash; and couldn&rsquo;t
                  find one.
                </p>
                <p>
                  So we started building it. First for Mehr, then for Rudr, and
                  somewhere along the way, for every family who felt what we felt.
                </p>
                <p>
                  The village we grew up in didn&rsquo;t follow us into
                  adulthood. We&rsquo;re rebuilding it &mdash; patiently, room
                  by room, family by family.
                </p>
                <p>
                  Not to tell you how to raise your child. So you never have to
                  figure it out alone.
                </p>
              </div>
              <p className="v3-serif italic text-xl text-charcoal mt-10">&mdash; Sakshi &amp; Rachit</p>

              <div className="border-t border-warm-taupe/15 mt-10 pt-10 text-center">
                <h2 className="v3-h2 text-charcoal mb-7">
                  There&rsquo;s a place here for{" "}
                  <em className="v3-serif text-warm-taupe">your family.</em>
                </h2>
                <button
                  onClick={() => setWaitlistOpen(true)}
                  className="bg-charcoal text-surface-cream px-10 py-4 rounded-full font-medium text-lg hover:opacity-90 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200"
                >
                  Join the Village
                </button>
                <p className="text-sm text-on-surface-variant/60 mt-6">
                  Free to join &middot; Among the first families &middot; A quiet inbox, promised
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterV3 />
      <WaitlistDialogV3 open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </div>
  );
}
