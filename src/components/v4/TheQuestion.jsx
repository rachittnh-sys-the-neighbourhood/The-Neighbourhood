import Section from "../ui/Section.jsx";
import SectionHeading from "../ui/SectionHeading.jsx";
import Card from "../ui/Card.jsx";
import AccentLabel from "../ui/AccentLabel.jsx";
import useScrollReveal from "../useScrollReveal.js";

const TRUTHS = [
  {
    number: "01",
    title: "The village has scattered.",
    body: "Grandparents might live a flight away. Neighbours stay strangers. The question you would have asked over a cup of chai becomes a 2am search, and a search engine doesn't know your child.",
  },
  {
    number: "02",
    title: "Plenty of advice. Limited context.",
    body: "Books, apps, reels, relatives: every answer is written for an average child who doesn't exist. Advice that ignores your child's temperament, your home, your reality isn't guidance. It's noise.",
  },
  {
    number: "03",
    title: "Childhood moved indoors.",
    body: "The courtyards and streets where children once wandered freely became screens. Play got quieter, more supervised, more alone, and children feel the difference, even if they can't name it.",
  },
];

function TruthCard({ truth, index }) {
  const { ref, inView } = useScrollReveal(0.25);

  return (
    <Card
      ref={ref}
      surface="white"
      elevated
      className={`reveal ${inView ? "in-view" : ""} h-full`}
      data-delay={String(index + 1)}
    >
      <AccentLabel tone="golden-amber" aria-hidden="true">
        {truth.number}
      </AccentLabel>

      <h3 className="type-card-heading mt-md text-deep-purple">{truth.title}</h3>

      <p className="type-body-regular mt-sm text-slate-blue">{truth.body}</p>
    </Card>
  );
}

/**
 * Section 3 — Why We Exist.
 *
 * The reference states a problem as a heading plus a lead, then answers
 * it in an evenly-weighted card row on the Off White wash. Three cards,
 * one radius, one shadow — the system's card corner throughout, no
 * bespoke geometry.
 */
export default function TheQuestion({ legacy = false }) {
  const closing = useScrollReveal(0.3);

  return (
    <Section id="the-question" surface="cream-peach" gradient={!legacy}>
      <SectionHeading
        label="Why we exist"
        title="You love your child more than anything. Some days, raising them is still a lot."
        lead="That's not a contradiction, and it isn't a failing. Parenting today asks one person, sometimes two, to do what an entire neighbourhood once did together."
        align="center"
        serif
      />

      <div className="mt-3xl grid gap-component-gap md:grid-cols-3">
        {TRUTHS.map((truth, i) => (
          <TruthCard key={truth.number} truth={truth} index={i} />
        ))}
      </div>

      <div
        ref={closing.ref}
        className={`reveal ${closing.inView ? "in-view" : ""} mx-auto mt-3xl max-w-measure-lg text-center`}
      >
        <p className="type-sub-heading text-deep-purple">
          None of this is your fault. The support systems were dismantled long
          before you became a parent.
        </p>
      </div>
    </Section>
  );
}
