import { useEffect, useMemo, useState } from "react";
import NavbarV3 from "../components/v3/NavbarV3.jsx";
import FooterV3 from "../components/v3/FooterV3.jsx";
import WaitlistDialogV3 from "../components/v3/WaitlistDialogV3.jsx";
import OpeningGesture from "../components/today/OpeningGesture.jsx";
import useChildProfile, { stageIdForDob } from "../components/today/useChildProfile.js";
import useDailyMoments, { todayKey } from "../components/today/useDailyMoments.js";
import useCompanionMeta from "../components/today/useCompanionMeta.js";
import journeyStages from "../data/journeyStages.json";

const REASSURANCE =
  "You do not have to make today perfect. A few present minutes are enough.";

const STAGE_MOODS = [
  "A tender season of bonding.",
  "A quiet season of noticing.",
  "A curious season of reaching out.",
  "A steady season of exploration.",
  "A lively season of movement.",
  "A warm season of trying.",
  "A bright season of discovery.",
  "A playful season of independence.",
  "A thoughtful season of expression.",
  "A full season of imagination.",
  "A growing season of confidence.",
  "A social season of becoming.",
  "A brave season of storytelling.",
  "A big-hearted season of wonder.",
  "A capable season of learning.",
];

const EVERYDAY_CONNECTION_ACTIVITY = {
  icon: "💬",
  pills: ["Connection", "A few minutes", "Any moment"],
  name: "Tell the ordinary story",
  tagline: "Your voice makes everyday life feel safe and interesting.",
  why: "When you put ordinary moments into words, your child hears language, rhythm, and the steady reassurance of your attention. There is nothing extra to prepare.",
  steps: [
    "Choose one ordinary moment: getting dressed, looking out the window, or settling after a meal.",
    "Say what you both notice in a calm, natural voice.",
    "Pause for their look, sound, movement, or smile before carrying on."
  ],
  parentNote: "The conversation does not need an answer to be shared.",
  watchFor: [
    "A look, sound, movement, or smile in response to your voice",
    "Any small pause where they seem to take you in"
  ]
};

function timeGreeting(parentName) {
  const hour = new Date().getHours();
  const name = parentName ? `, ${parentName}` : "";
  if (hour < 12) return `Good morning${name}`;
  if (hour < 17) return `Good afternoon${name}`;
  return `Good evening${name}`;
}

function stageMood(stage) {
  return STAGE_MOODS[stage.id] || "A beautiful season of growing.";
}

function shortWhy(activity) {
  const match = activity.why?.match(/^.*?[.!?](\s|$)/);
  return (match ? match[0] : activity.tagline || activity.why || "").trim();
}

function estimate(activity) {
  return activity.pills?.find((pill) => /min|time|meal|bath|walk|any/i.test(pill)) || "A few minutes";
}

function activitySymbol(activity) {
  const attributes = activity.pills?.join(" ").toLowerCase() || "";
  if (/motor|movement|physical/.test(attributes)) return "directions_run";
  if (/communication|language|speech/.test(attributes)) return "chat_bubble";
  if (/social|emotional|attachment/.test(attributes)) return "favorite";
  if (/cognitive|thinking/.test(attributes)) return "lightbulb";
  if (/sensory|food|meal/.test(attributes)) return "touch_app";
  if (/creative|music|art/.test(attributes)) return "palette";
  if (/connection/.test(attributes)) return "forum";
  return "auto_awesome";
}

function ActivityIcon({ activity, className = "" }) {
  return (
    <span
      className={`material-symbols-outlined text-warm-taupe ${className}`}
      aria-hidden="true"
    >
      {activitySymbol(activity)}
    </span>
  );
}

// journeyStages.json holds developmental milestones grouped by domain
// (Motor, Communication, Social & Emotional, Cognitive), not the
// activityThemes/activities shape this page was originally written
// against — that shape was replaced when the dataset was cut over to
// real CDC-sourced milestone data (see "Refine homepage navigation and
// timeline data"). Each milestone's guide doubles as a daily activity:
// `try` is the suggested practice, `watch`/`see` are what to notice.
function getStageActivities(stage) {
  return stage.domains.flatMap((domain) =>
    domain.milestones
      .filter((milestone) => milestone.guide?.try)
      .map((milestone) => ({
        name: milestone.text,
        tagline: domain.name,
        why: milestone.guide.try,
        steps: [milestone.guide.try],
        watchFor: [milestone.guide.watch, milestone.guide.see].filter(Boolean),
        pills: [domain.name],
        theme: domain.name,
      }))
  );
}

function getDailyPlan(stage, dayNumber) {
  const stageActivities = getStageActivities(stage);
  const availableActivities =
    stageActivities.length >= 4
      ? stageActivities
      : [...stageActivities, EVERYDAY_CONNECTION_ACTIVITY];
  const primaryIndex = availableActivities.length ? (dayNumber - 1) % availableActivities.length : 0;
  const activities = Array.from(
    { length: Math.min(4, availableActivities.length) },
    (_, offset) => availableActivities[(primaryIndex + offset) % availableActivities.length]
  );
  return { primary: activities[0], activities };
}

function findActivityByName(activityName) {
  if (activityName === EVERYDAY_CONNECTION_ACTIVITY.name) return EVERYDAY_CONNECTION_ACTIVITY;
  return journeyStages
    .flatMap((stage) => getStageActivities(stage))
    .find((activity) => activity.name === activityName);
}

function recommendationReason(activity, observations, childName) {
  const latest = observations.at(-1);
  if (!latest) return `A gentle place to begin for ${childName}'s season.`;
  if (latest.signal && latest.signal !== "Nothing clear yet") {
    return `Yesterday, you noticed ${latest.signal.toLowerCase()} during a shared moment. ${activity.name} offers another gentle way to follow that.`;
  }
  const previousActivity = latest.activityNames?.[0];
  return previousActivity
    ? `Yesterday, you made room for ${previousActivity}. ${activity.name} is a gentle next invitation.`
    : `A gentle place to begin for ${childName}'s season.`;
}

function quietThread(observations, childName) {
  if (observations.length < 3) return null;
  const signals = observations
    .map((item) => item.signal)
    .filter((signal) => signal && signal !== "Nothing clear yet");
  if (signals.length === 0) {
    return `Over the last few days, you have made room for small shared moments. You are getting to know ${childName}'s rhythm.`;
  }
  const mostNoticed = signals.reduce(
    (mostCommon, signal) =>
      signals.filter((item) => item === signal).length > signals.filter((item) => item === mostCommon).length
        ? signal
        : mostCommon,
    signals[0]
  );
  return `Across recent shared moments, you have often noticed ${mostNoticed.toLowerCase()}. You are getting to know what catches ${childName}'s attention.`;
}

function localTodayForInput() {
  return todayKey();
}

function cleanQuote(text = "") {
  return text.replace(/^"|"$/g, "");
}

function PrimaryButton({ children, className = "", ...props }) {
  return (
    <button
      className={`bg-charcoal text-surface-cream px-8 py-3.5 rounded-full font-medium text-base md:text-lg hover:opacity-90 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function GhostButton({ children, className = "", ...props }) {
  return (
    <button
      className={`text-sm text-warm-taupe hover:text-charcoal underline underline-offset-4 decoration-soft-sand active:scale-[0.98] transition-all duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function Onboarding({ onSave }) {
  const [step, setStep] = useState(0);
  const [parentName, setParentName] = useState("");
  const [childName, setChildName] = useState("");
  const [dob, setDob] = useState("");

  const stage = useMemo(() => {
    if (!dob) return null;
    return journeyStages.find((item) => item.id === stageIdForDob(dob));
  }, [dob]);

  const finish = () => {
    if (!childName.trim() || !dob) return;
    onSave(childName, dob, parentName);
  };

  return (
    <div className="min-h-screen bg-surface-cream overflow-hidden">
      <div className="max-w-container-max mx-auto min-h-screen px-margin-mobile md:px-gutter pt-28 pb-16 flex items-center">
        <div className="w-full max-w-xl mx-auto">
          <OpeningGesture />
          <div key={step} className="onboarding-screen rounded-[28px] bg-surface-container-low/55 border border-warm-taupe/10 p-8 md:p-12 shadow-[0_24px_80px_rgba(139,115,85,0.10)]">
            {step === 0 && (
              <>
                <p className="v3-eyebrow text-warm-taupe mb-5">The Neighbourhood</p>
                <h1 className="v3-h2 text-charcoal mb-5">Welcome. You have a little village here.</h1>
                <p className="v3-body-lg text-on-surface-variant mb-9">
                  A calm place for the small everyday moments that help your child grow.
                </p>
                <PrimaryButton onClick={() => setStep(1)}>Begin gently</PrimaryButton>
              </>
            )}

            {step === 1 && (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  if (childName.trim()) setStep(2);
                }}
              >
                <p className="v3-eyebrow text-warm-taupe mb-5">A small hello</p>
                <h1 className="v3-h2 text-charcoal mb-4">What should we call your child?</h1>
                <p className="text-on-surface-variant leading-relaxed mb-8">
                  You can add your name too, if you would like a more personal hello.
                </p>
                <div className="space-y-4 mb-9">
                  <label className="sr-only" htmlFor="parent-name">Parent&rsquo;s first name</label>
                  <input
                    id="parent-name"
                    type="text"
                    value={parentName}
                    onChange={(event) => setParentName(event.target.value)}
                    placeholder="Your name (optional)"
                    className="w-full px-5 py-3.5 rounded-full border border-warm-taupe/25 bg-white/60 text-charcoal placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-warm-taupe/40 focus:border-transparent"
                  />
                  <label className="sr-only" htmlFor="child-name">Child&rsquo;s name</label>
                  <input
                    id="child-name"
                    type="text"
                    required
                    autoFocus
                    value={childName}
                    onChange={(event) => setChildName(event.target.value)}
                    placeholder="Child's name"
                    className="w-full px-5 py-3.5 rounded-full border border-warm-taupe/25 bg-white/60 text-charcoal placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-warm-taupe/40 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <GhostButton type="button" onClick={() => setStep(0)}>Back</GhostButton>
                  <PrimaryButton type="submit" disabled={!childName.trim()}>Continue</PrimaryButton>
                </div>
              </form>
            )}

            {step === 2 && (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  if (dob) setStep(3);
                }}
              >
                <p className="v3-eyebrow text-warm-taupe mb-5">Their season</p>
                <h1 className="v3-h2 text-charcoal mb-4">When were they born?</h1>
                <p className="text-on-surface-variant leading-relaxed mb-8">
                  This helps us choose guidance that fits where {childName.trim() || "your child"} is right now.
                </p>
                <label className="sr-only" htmlFor="child-dob">Date of birth</label>
                <input
                  id="child-dob"
                  type="date"
                  required
                  autoFocus
                  value={dob}
                  max={localTodayForInput()}
                  onChange={(event) => setDob(event.target.value)}
                  className="w-full px-5 py-3.5 rounded-full border border-warm-taupe/25 bg-white/60 text-charcoal focus:outline-none focus:ring-2 focus:ring-warm-taupe/40 focus:border-transparent mb-9"
                />
                <div className="flex items-center justify-between gap-4">
                  <GhostButton type="button" onClick={() => setStep(1)}>Back</GhostButton>
                  <PrimaryButton type="submit" disabled={!dob}>Continue</PrimaryButton>
                </div>
              </form>
            )}

            {step === 3 && stage && (
              <>
                <p className="v3-eyebrow text-warm-taupe mb-5">{stage.label}</p>
                <h1 className="v3-h2 text-charcoal mb-4">
                  {childName.trim()} is in {stageMood(stage).replace("A ", "a ")}
                </h1>
                <p className="text-on-surface-variant leading-relaxed mb-4">
                  This season is full of small changes. You do not need to catch them all.
                </p>
                <p className="v3-serif italic text-xl text-charcoal leading-relaxed mb-9">
                  {stage.note}
                </p>
                <div className="flex items-center justify-between gap-4">
                  <GhostButton type="button" onClick={() => setStep(2)}>Back</GhostButton>
                  <PrimaryButton onClick={finish}>Begin today</PrimaryButton>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileSettings({ profile, onSave, onClose }) {
  const [parentName, setParentName] = useState(profile.parentName || "");
  const [childName, setChildName] = useState(profile.name || "");
  const [dob, setDob] = useState(profile.dob || "");

  return (
    <PreviewShell onClose={onClose}>
      <p className="v3-eyebrow text-warm-taupe mb-4">Child details</p>
      <h2 className="v3-h3 text-charcoal mb-4">Keep the guidance close to where they are.</h2>
      <p className="text-on-surface-variant leading-relaxed mb-7">
        If something has changed, you can adjust it quietly here.
      </p>
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          if (!childName.trim() || !dob) return;
          onSave(childName, dob, parentName);
          onClose();
        }}
      >
        <label className="sr-only" htmlFor="profile-parent-name">Parent's first name</label>
        <input
          id="profile-parent-name"
          type="text"
          value={parentName}
          onChange={(event) => setParentName(event.target.value)}
          placeholder="Your name (optional)"
          className="w-full px-5 py-3.5 rounded-full border border-warm-taupe/25 bg-white/60 text-charcoal placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-warm-taupe/40 focus:border-transparent"
        />
        <label className="sr-only" htmlFor="profile-child-name">Child's name</label>
        <input
          id="profile-child-name"
          type="text"
          required
          value={childName}
          onChange={(event) => setChildName(event.target.value)}
          placeholder="Child's name"
          className="w-full px-5 py-3.5 rounded-full border border-warm-taupe/25 bg-white/60 text-charcoal placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-warm-taupe/40 focus:border-transparent"
        />
        <label className="sr-only" htmlFor="profile-child-dob">Date of birth</label>
        <input
          id="profile-child-dob"
          type="date"
          required
          value={dob}
          max={localTodayForInput()}
          onChange={(event) => setDob(event.target.value)}
          className="w-full px-5 py-3.5 rounded-full border border-warm-taupe/25 bg-white/60 text-charcoal focus:outline-none focus:ring-2 focus:ring-warm-taupe/40 focus:border-transparent"
        />
        <div className="flex items-center justify-between gap-4 pt-4">
          <GhostButton type="button" onClick={onClose}>Cancel</GhostButton>
          <PrimaryButton type="submit" disabled={!childName.trim() || !dob}>Save details</PrimaryButton>
        </div>
      </form>
    </PreviewShell>
  );
}

function PrimaryMomentCard({ activity, reason, isCommitted, onCommit, onClearCommitment }) {
  const [isExploring, setIsExploring] = useState(false);
  const steps = activity.steps?.slice(0, 3) || [];
  const watchFor = activity.watchFor?.slice(0, 2) || [];

  useEffect(() => {
    setIsExploring(isCommitted);
  }, [activity.name, isCommitted]);

  return (
    <section className="today-fade in max-w-3xl rounded-[28px] bg-surface-container-low/65 border border-warm-taupe/10 p-8 md:p-10 mb-7 shadow-[0_24px_80px_rgba(139,115,85,0.10)]">
      <div className="flex items-start justify-between gap-5 mb-7">
        <span className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-warm-taupe/10">
          <ActivityIcon activity={activity} className="text-2xl" />
        </span>
        <span className="rounded-full bg-surface-cream/80 border border-warm-taupe/10 px-3 py-1 text-xs text-warm-taupe">
          {estimate(activity)}
        </span>
      </div>
      <p className="v3-eyebrow text-warm-taupe mb-3">
        {isCommitted ? "A small plan for today" : "What may fit today"}
      </p>
      <h2 className="v3-h2 text-charcoal max-w-2xl mb-4">{activity.name}</h2>
      <p className="text-on-surface-variant leading-relaxed mb-5">{shortWhy(activity)}</p>
      <p className="v3-serif italic text-xl text-charcoal leading-relaxed mb-8">
        {activity.tagline}
      </p>
      <div className="border-l-2 border-warm-taupe/25 pl-4 mb-8 max-w-2xl">
        <p className="v3-eyebrow text-warm-taupe mb-2">Why this may fit</p>
        <p className="text-sm leading-relaxed text-on-surface-variant">{reason}</p>
      </div>

      {isExploring ? (
        <div className="today-pick-label">
          <div className="inline-flex items-center gap-2 rounded-full bg-surface-cream/80 border border-warm-taupe/15 px-4 py-2 text-sm text-warm-taupe mb-8">
            <span className="material-symbols-outlined text-base" aria-hidden="true">check</span>
            <span className="v3-serif italic">{isCommitted ? "Here for today" : "Take a look"}</span>
          </div>

          {steps.length > 0 && (
            <div className="mb-8">
              <p className="v3-eyebrow text-warm-taupe mb-4">A gentle way to try it</p>
              <ol className="space-y-4">
                {steps.map((step, index) => (
                  <li key={step} className="flex gap-4 text-on-surface-variant leading-relaxed">
                    <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-warm-taupe/10 text-xs font-medium text-warm-taupe">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {watchFor.length > 0 && (
            <div className="border-t border-warm-taupe/15 pt-6">
              <p className="v3-eyebrow text-warm-taupe mb-3">What to notice</p>
              <ul className="space-y-3">
                {watchFor.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-on-surface-variant">
                    <span className="material-symbols-outlined mt-0.5 text-base text-warm-taupe" aria-hidden="true">visibility</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activity.parentNote && (
            <p className="v3-serif italic text-lg text-charcoal leading-relaxed border-t border-warm-taupe/15 mt-6 pt-6">
              {cleanQuote(activity.parentNote)}
            </p>
          )}

          {isCommitted ? (
            <div className="border-t border-warm-taupe/15 mt-6 pt-6">
              <p className="text-sm leading-relaxed text-on-surface-variant mb-4">
                You have made room for this moment. It can sit alongside any others that fit your day.
              </p>
              <GhostButton onClick={() => onClearCommitment(activity.name)}>Remove from today</GhostButton>
            </div>
          ) : (
            <div className="border-t border-warm-taupe/15 mt-6 pt-6">
              <p className="v3-eyebrow text-warm-taupe mb-3">Does this feel possible today?</p>
              <div className="flex flex-wrap items-center gap-4">
                <PrimaryButton onClick={() => onCommit(activity.name)}>I'll make room for this</PrimaryButton>
                <p className="text-sm leading-relaxed text-on-surface-variant max-w-sm">
                  A few present minutes are enough.
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-4">
          <PrimaryButton onClick={() => setIsExploring(true)}>See the simple way</PrimaryButton>
          <p className="text-sm leading-relaxed text-on-surface-variant max-w-sm">
            No perfect version needed. A few present minutes count.
          </p>
        </div>
      )}
    </section>
  );
}

function SeasonSummary({ stage }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="today-fade in max-w-3xl mb-7">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        className="w-full rounded-[24px] border border-warm-taupe/10 bg-white/25 px-5 py-4 text-left transition-all duration-200 hover:bg-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-warm-taupe/40"
      >
        <span className="flex items-start justify-between gap-5">
          <span>
            <span className="v3-eyebrow block text-warm-taupe mb-2">{stage.label}</span>
            <span className="block text-base font-semibold text-charcoal">{stageMood(stage)}</span>
          </span>
          <span className="material-symbols-outlined text-warm-taupe" aria-hidden="true">
            {isOpen ? "expand_less" : "expand_more"}
          </span>
        </span>
      </button>

      {isOpen && (
        <div className="today-response-enter px-5 pt-4 pb-2">
          <p className="text-sm leading-relaxed text-on-surface-variant max-w-2xl mb-3">{stage.note}</p>
          <p className="v3-serif italic text-base text-charcoal leading-relaxed max-w-2xl">{REASSURANCE}</p>
        </div>
      )}
    </section>
  );
}

function ActivityDetail({ activity, isOpen, onToggle }) {
  const steps = activity.steps?.slice(0, 3) || [];
  const watchFor = activity.watchFor?.slice(0, 2) || [];

  return (
    <div className="border-t border-warm-taupe/15 first:border-t-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full py-5 text-left flex items-start justify-between gap-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-warm-taupe/40"
      >
        <span className="flex gap-4">
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[11px] bg-warm-taupe/10">
            <ActivityIcon activity={activity} className="text-lg" />
          </span>
          <span>
            <span className="block text-base font-semibold text-charcoal">{activity.name}</span>
            <span className="mt-1 block text-sm leading-relaxed text-on-surface-variant">{activity.tagline}</span>
            <span className="mt-2 block text-sm leading-relaxed text-on-surface-variant">{shortWhy(activity)}</span>
          </span>
        </span>
        <span className="flex flex-shrink-0 items-center gap-2 text-xs text-warm-taupe">
          {estimate(activity)}
          <span className="material-symbols-outlined text-base" aria-hidden="true">
            {isOpen ? "expand_less" : "expand_more"}
          </span>
        </span>
      </button>

      {isOpen && (
        <div className="pb-7 pl-11 today-response-enter">
          <div className="max-w-2xl space-y-6">
            {activity.why && (
              <div>
                <p className="v3-eyebrow text-warm-taupe mb-2">Why it matters</p>
                <p className="text-sm leading-relaxed text-on-surface-variant">{activity.why}</p>
              </div>
            )}

            {steps.length > 0 && (
              <div>
                <p className="v3-eyebrow text-warm-taupe mb-3">How to try it gently</p>
                <ol className="space-y-3">
                  {steps.map((step, index) => (
                    <li key={step} className="flex gap-3 text-sm leading-relaxed text-on-surface-variant">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-warm-taupe/10 text-[11px] font-medium text-warm-taupe">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {watchFor.length > 0 && (
              <div>
                <p className="v3-eyebrow text-warm-taupe mb-3">What to notice</p>
                <ul className="space-y-2">
                  {watchFor.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-on-surface-variant">
                      <span className="material-symbols-outlined mt-0.5 text-base text-warm-taupe" aria-hidden="true">visibility</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activity.parentNote && (
              <p className="v3-serif italic text-base text-charcoal leading-relaxed">
                {cleanQuote(activity.parentNote)}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ActivityLibrary({ activities, activeActivityName, committedNames, onSelect, onCommit, onClearCommitment }) {
  const [isVisible, setIsVisible] = useState(false);
  const [openName, setOpenName] = useState(activeActivityName);
  const otherActivities = activities.filter((activity) => activity.name !== activeActivityName).slice(0, 3);

  useEffect(() => {
    setOpenName(activeActivityName);
  }, [activeActivityName]);

  return (
    <section className="max-w-3xl mb-12">
      {otherActivities.length > 0 && (
        <div className="mb-6">
          <p className="v3-eyebrow text-warm-taupe mb-3">Other ways to be together today</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {otherActivities.map((activity) => (
              <div key={activity.name} className="min-h-[154px] rounded-[8px] border border-warm-taupe/12 bg-white/25 p-4 text-left transition-all duration-200 hover:bg-white/45">
                <button
                  type="button"
                  onClick={() => {
                    onSelect(activity);
                    setOpenName(activity.name);
                  }}
                  className="w-full text-left focus:outline-none"
                >
                  <span className="mb-4 flex items-start justify-between gap-3">
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[11px] bg-warm-taupe/10">
                      <ActivityIcon activity={activity} className="text-lg" />
                    </span>
                    <span className="text-xs text-warm-taupe whitespace-nowrap">{estimate(activity)}</span>
                  </span>
                  <span className="block text-sm font-semibold text-charcoal mb-2">{activity.name}</span>
                  <span className="block text-sm leading-relaxed text-on-surface-variant">{shortWhy(activity)}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (committedNames.has(activity.name)) onClearCommitment(activity.name);
                    else onCommit(activity.name);
                  }}
                  className="mt-4 text-sm font-medium text-warm-taupe underline underline-offset-4 decoration-soft-sand hover:text-charcoal active:scale-[0.98] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-warm-taupe/40"
                >
                  {committedNames.has(activity.name) ? "Remove from today" : "I'll make room for this"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsVisible((current) => !current)}
        aria-expanded={isVisible}
        className="inline-flex items-center gap-2 text-sm font-medium text-warm-taupe hover:text-charcoal active:scale-[0.98] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-warm-taupe/40"
      >
        {isVisible ? "Hide the fuller guide" : "See the fuller guide"}
        <span className="material-symbols-outlined text-base" aria-hidden="true">
          {isVisible ? "expand_less" : "expand_more"}
        </span>
      </button>

      {isVisible && (
        <div className="today-preview-enter mt-5 rounded-[24px] bg-white/30 border border-warm-taupe/10 px-5 md:px-7">
          {activities.map((activity) => (
            <ActivityDetail
              key={activity.name}
              activity={activity}
              isOpen={openName === activity.name}
              onToggle={() => setOpenName((current) => (current === activity.name ? null : activity.name))}
            />
          ))}

        </div>
      )}
    </section>
  );
}

function ReflectionChoice({ activity, checked, onToggle }) {
  return (
    <label className="flex cursor-pointer items-center gap-4 border-t border-warm-taupe/15 py-4 first:border-t-0">
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="h-5 w-5 flex-shrink-0 cursor-pointer rounded border-warm-taupe/30 text-warm-taupe focus:ring-warm-taupe/40"
      />
      <span className="flex min-w-0 items-center gap-3">
        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[10px] bg-warm-taupe/10">
          <ActivityIcon activity={activity} className="text-base" />
        </span>
        <span className={`text-[15px] ${checked ? "text-charcoal" : "text-on-surface-variant"}`}>{activity.name}</span>
      </span>
    </label>
  );
}

function reflectionEncouragement(count, childName) {
  if (count === 0) return "A small memory is enough, if one comes to mind.";
  if (count === 1) return `That small moment mattered. ${childName} had you with them.`;
  if (count === 2) return "Two small moments of connection. That is a lovely part of a day.";
  if (count === 3) return "A caring collection of little moments. No gold stars needed.";
  return "What a beautiful collection of ordinary moments together.";
}

function TomorrowPreview({ childName, activities, preview = false, onComplete, onDefer }) {
  const [triedNames, setTriedNames] = useState(() => new Set());
  const [signal, setSignal] = useState("");

  const toggleActivity = (activityName) => {
    setTriedNames((current) => {
      const next = new Set(current);
      if (next.has(activityName)) next.delete(activityName);
      else next.add(activityName);
      return next;
    });
  };

  return (
    <section className="today-preview-enter max-w-3xl rounded-[24px] bg-white/35 border border-warm-taupe/15 p-6 md:p-7 mb-7">
      <p className="v3-eyebrow text-warm-taupe mb-3">{preview ? "Preview: next visit" : "Yesterday's little moments"}</p>
      <h2 className="v3-h3 text-charcoal mb-3">Which of these found their way into the day?</h2>
      <p className="text-on-surface-variant leading-relaxed mb-5">Tick anything that happened, even briefly. You can choose more than one, or none.</p>
      <div className="mb-5" aria-label="Activities from yesterday">
        {activities.map((activity) => (
          <ReflectionChoice
            key={activity.name}
            activity={activity}
            checked={triedNames.has(activity.name)}
            onToggle={() => toggleActivity(activity.name)}
          />
        ))}
      </div>
      <p className="min-h-12 v3-serif italic text-lg text-charcoal leading-relaxed mb-7" aria-live="polite">
        {reflectionEncouragement(triedNames.size, childName)}
      </p>

      {triedNames.size > 0 && (
        <div className="border-t border-warm-taupe/15 pt-5 mb-7">
          <p className="v3-eyebrow text-warm-taupe mb-3">A small detail to carry forward <span className="normal-case tracking-normal">Optional</span></p>
          <div className="flex flex-wrap gap-3" role="group" aria-label="What you noticed">
            {["A look", "A sound", "A smile", "Nothing clear yet"].map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={signal === option}
                onClick={() => setSignal(option)}
                className={`rounded-full border px-4 py-2.5 text-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-warm-taupe/40 ${
                  signal === option
                    ? "border-warm-taupe bg-warm-taupe/10 text-charcoal"
                    : "border-warm-taupe/20 text-on-surface-variant hover:bg-warm-taupe/5"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <PrimaryButton onClick={() => onComplete([...triedNames], signal)}>
          Continue to today
        </PrimaryButton>
        {!preview && <GhostButton onClick={onDefer}>Do this later</GhostButton>}
      </div>
    </section>
  );
}

function QuietThread({ children }) {
  return (
    <section className="max-w-3xl border-l-2 border-warm-taupe/25 pl-4 mb-7">
      <p className="v3-eyebrow text-warm-taupe mb-2">A quiet thread</p>
      <p className="v3-serif italic text-lg text-charcoal leading-relaxed max-w-2xl">{children}</p>
    </section>
  );
}

function StaleCommitmentNotice({ onDismiss }) {
  return (
    <section className="max-w-3xl border-l-2 border-warm-taupe/25 pl-4 mb-7">
      <div className="flex items-start justify-between gap-5">
        <p className="v3-serif italic text-lg text-charcoal leading-relaxed">The last few days sound full. We've set that thought down.</p>
        <button type="button" onClick={onDismiss} aria-label="Dismiss" className="text-warm-taupe hover:text-charcoal">
          <span className="material-symbols-outlined text-base" aria-hidden="true">close</span>
        </button>
      </div>
    </section>
  );
}

function PreviewShell({ children, onClose }) {
  return (
    <div className="today-preview-enter max-w-xl rounded-[28px] bg-surface-container-low/65 border border-warm-taupe/10 p-8 md:p-10 shadow-[0_24px_80px_rgba(139,115,85,0.10)]">
      <div className="flex justify-end mb-2">
        <button
          onClick={onClose}
          aria-label="Close"
          className="text-warm-taupe hover:text-charcoal transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
      {children}
    </div>
  );
}

export default function TodayPage() {
  const { profile, saveProfile } = useChildProfile();
  const {
    todaysCommitments,
    followUpRecord,
    staleCommitment,
    recentObservations,
    ensureToday,
    commitActivity,
    clearCommitment,
    submitReflection,
    dismissStaleCommitment,
  } = useDailyMoments();
  const { dayNumber, markCreated, noteStageSeen, markReflected } = useCompanionMeta();
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [panel, setPanel] = useState(null);
  const [followUpVisible, setFollowUpVisible] = useState(true);
  const [tomorrowPreview, setTomorrowPreview] = useState(() =>
    new URLSearchParams(window.location.search).get("preview") === "tomorrow"
  );

  const stageId = profile ? stageIdForDob(profile.dob) : 0;
  const stage = useMemo(() => journeyStages.find((item) => item.id === stageId), [stageId]);
  const dailyPlan = useMemo(() => getDailyPlan(stage, dayNumber), [stage, dayNumber]);
  const [activeActivityName, setActiveActivityName] = useState(dailyPlan.primary?.name);
  const activeActivity =
    dailyPlan.activities.find((activity) => activity.name === activeActivityName) || dailyPlan.primary;
  const committedNames = useMemo(() => new Set(todaysCommitments), [todaysCommitments]);
  const reflectionActivities = useMemo(
    () => (followUpRecord?.plannedActivityNames || []).map(findActivityByName).filter(Boolean),
    [followUpRecord]
  );
  const reasonForToday = useMemo(
    () => recommendationReason(activeActivity, recentObservations, profile?.name || "your child"),
    [activeActivity, profile?.name, recentObservations]
  );
  const currentThread = useMemo(
    () => quietThread(recentObservations, profile?.name || "your child"),
    [profile?.name, recentObservations]
  );

  useEffect(() => {
    ensureToday(dailyPlan.activities.map((activity) => activity.name));
  }, [dailyPlan.activities, ensureToday]);

  useEffect(() => {
    if (dailyPlan.primary?.name && !dailyPlan.activities.some((activity) => activity.name === activeActivityName)) {
      setActiveActivityName(dailyPlan.primary.name);
    }
  }, [activeActivityName, dailyPlan.activities, dailyPlan.primary]);

  useEffect(() => {
    setFollowUpVisible(true);
  }, [followUpRecord?.date]);

  const handleOnboardingSave = (childName, dob, parentName) => {
    saveProfile(childName, dob, parentName);
    markCreated();
    noteStageSeen(stageIdForDob(dob));
  };

  const handleCommitToday = (activityName) => {
    commitActivity(activityName);
    setActiveActivityName(activityName);
    if (navigator.vibrate) navigator.vibrate(8);
  };

  const closeTomorrowPreview = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("preview");
    window.history.replaceState({}, "", url);
    setTomorrowPreview(false);
  };

  const openTomorrowPreview = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("preview", "tomorrow");
    window.history.replaceState({}, "", url);
    setTomorrowPreview(true);
  };

  const handleSelectActivity = (activity) => {
    setActiveActivityName(activity.name);
  };

  const handleFollowUpComplete = (triedNames, signal) => {
    submitReflection(triedNames, signal);
    markReflected();
    setFollowUpVisible(false);
  };

  if (!profile) {
    return <Onboarding onSave={handleOnboardingSave} />;
  }

  return (
    <div className="overflow-x-clip bg-surface-cream min-h-screen">
      {/* Logo now genuinely navigates to "/" (the marketing homepage),
          a different route from "/today" — no custom handler needed. */}
      <NavbarV3 onJoin={() => setWaitlistOpen(true)} showJoin={false} />

      <main className="pt-32 md:pt-40 pb-24 px-margin-mobile md:px-gutter">
        <div className="max-w-container-max mx-auto">
          <div className="flex items-start justify-between gap-6 mb-10">
            <div>
              <OpeningGesture />
              <p className="today-fade in v3-eyebrow text-warm-taupe mb-4">
                {timeGreeting(profile.parentName)} <span aria-hidden="true">☀️</span>
              </p>
              <h1 className="today-fade in v3-display text-charcoal max-w-2xl">
                Today, with {profile.name}
              </h1>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  if (tomorrowPreview) closeTomorrowPreview();
                  else openTomorrowPreview();
                }}
                className="inline-flex items-center gap-2 rounded-full border border-warm-taupe/20 bg-white/25 px-4 py-3 text-sm font-medium text-charcoal hover:bg-white/50 active:scale-[0.98] transition-all duration-200"
              >
                {tomorrowPreview ? "Back to today" : "Preview next visit"}
                <span className="material-symbols-outlined text-base" aria-hidden="true">
                  {tomorrowPreview ? "arrow_back" : "visibility"}
                </span>
              </button>
              <button
                onClick={() => setPanel("profile")}
                className="inline-flex items-center gap-2 rounded-full border border-warm-taupe/20 bg-white/25 px-4 py-3 text-sm font-medium text-charcoal hover:bg-white/50 active:scale-[0.98] transition-all duration-200"
              >
                Child details
              </button>
            </div>
          </div>

          <div className="sm:hidden mb-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                if (tomorrowPreview) closeTomorrowPreview();
                else openTomorrowPreview();
              }}
              className="inline-flex items-center gap-2 rounded-full border border-warm-taupe/20 bg-white/25 px-4 py-3 text-sm font-medium text-charcoal active:scale-[0.98] transition-all duration-200"
            >
              {tomorrowPreview ? "Back to today" : "Preview next visit"}
              <span className="material-symbols-outlined text-base" aria-hidden="true">
                {tomorrowPreview ? "arrow_back" : "visibility"}
              </span>
            </button>
            <button
              onClick={() => setPanel("profile")}
              className="inline-flex items-center gap-2 rounded-full border border-warm-taupe/20 bg-white/25 px-4 py-3 text-sm font-medium text-charcoal active:scale-[0.98] transition-all duration-200"
            >
              Child details
            </button>
          </div>

          {panel === "profile" ? (
            <ProfileSettings
              profile={profile}
              onSave={(childName, dob, parentName) => {
                saveProfile(childName, dob, parentName);
                noteStageSeen(stageIdForDob(dob));
              }}
              onClose={() => setPanel(null)}
            />
          ) : tomorrowPreview ? (
            <TomorrowPreview
              preview
              childName={profile.name}
              activities={dailyPlan.activities}
              onComplete={closeTomorrowPreview}
              onDefer={closeTomorrowPreview}
            />
          ) : followUpVisible && reflectionActivities.length > 0 ? (
            <TomorrowPreview
              childName={profile.name}
              activities={reflectionActivities}
              onComplete={handleFollowUpComplete}
              onDefer={() => setFollowUpVisible(false)}
            />
          ) : (
            <>
              {staleCommitment && <StaleCommitmentNotice onDismiss={dismissStaleCommitment} />}

              {currentThread && <QuietThread>{currentThread}</QuietThread>}

              <PrimaryMomentCard
                activity={activeActivity}
                reason={reasonForToday}
                isCommitted={committedNames.has(activeActivity.name)}
                onCommit={handleCommitToday}
                onClearCommitment={clearCommitment}
              />

              <SeasonSummary stage={stage} />

              <ActivityLibrary
                activities={dailyPlan.activities}
                activeActivityName={activeActivity.name}
                committedNames={committedNames}
                onSelect={handleSelectActivity}
                onCommit={handleCommitToday}
                onClearCommitment={clearCommitment}
              />
            </>
          )}
        </div>
      </main>

      <FooterV3 minimal />
      <WaitlistDialogV3 open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </div>
  );
}
