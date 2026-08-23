import Section from "../ui/Section.jsx";
import SectionHeading from "../ui/SectionHeading.jsx";
import AccentLabel from "../ui/AccentLabel.jsx";
import BlobImage from "../ui/BlobImage.jsx";
import useScrollReveal from "../useScrollReveal.js";
import aanganSpace from "../../assets/aangan-space.jpg";
import neighboursCircle from "../../assets/neighbours-circle.jpg";
import guidancePhone from "../../assets/guidance-phone.jpg";

const PILLARS = [
  {
    number: "01",
    eyebrow: "The Guidance",
    title: "Answers that know your child.",
    body: "One quiet app. Ask anything at 2pm or 2am and get an answer shaped by your child: their age, their temperament, their history. Grounded in real expertise, spoken like a friend, never a script.",
    image: {
      src: guidancePhone,
      alt: "A phone held up at night showing a gentle, reassuring reply to a parent's question, with a sleeping baby softly visible below in warm lamplight",
    },
  },
  {
    number: "02",
    eyebrow: "The Neighbours",
    title: "The same faces, week after week.",
    body: "Small circles of parents who live near you, matched by your child's age and stage. Not another group chat. Real people you'll actually see, until they stop being strangers and start being the aunties and uncles your child grows up around.",
    image: {
      src: neighboursCircle,
      alt: "Parents sitting on floor cushions in easy conversation beneath a tree-shaped bookshelf, while two children read together on a rug nearby",
    },
  },
  {
    number: "03",
    eyebrow: "The Spaces",
    title: "Places where children belong, not just attend.",
    body: "The Aangan and The Verandah are calm, beautiful spaces near you: natural materials, soft light, room to move. Designed around a child's nervous system, not a brochure. A regulated child is a child who can truly play, learn, and grow.",
    image: {
      src: aanganSpace,
      alt: "Inside The Aangan: a child absorbed in a wooden activity tray on the floor of a calm Montessori room, with low shelves, pale wood, and soft morning light",
    },
  },
];

function PillarRow({ pillar, index }) {
  const { ref, inView } = useScrollReveal(0.2);
  const flipped = index % 2 === 1;

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "in-view" : ""} grid items-center gap-2xl md:grid-cols-2 md:gap-3xl`}
    >
      <div className={flipped ? "md:order-2" : ""}>
        <div className="flex items-baseline gap-md">
          <AccentLabel tone="golden-amber" aria-hidden="true">
            {pillar.number}
          </AccentLabel>
          <AccentLabel>{pillar.eyebrow}</AccentLabel>
        </div>

        <h3 className="type-section-heading mt-md max-w-measure text-deep-purple">
          {pillar.title}
        </h3>

        <p className="type-body-regular mt-md max-w-measure text-slate-blue">
          {pillar.body}
        </p>
      </div>

      <div className={`${flipped ? "md:order-1" : ""} mx-auto w-full max-w-measure-sm`}>
        <BlobImage
          src={pillar.image.src}
          alt={pillar.image.alt}
          variant={flipped ? "b" : "a"}
        />
      </div>
    </div>
  );
}

/**
 * Section 4 — What We're Building.
 *
 * Alternating photo/copy rows, each photo in the system's organic blob
 * frame with the dashed Warm Orange outline offset behind it. The blob
 * variant alternates with the row direction so no two silhouettes on the
 * page repeat.
 */
export default function Today({ legacy = false }) {
  return (
    <Section id="today" surface="off-white-top-safe" gradient={!legacy} waveTop>
      {/* The break is pinned to the sentence boundary rather than left to
          the container width. At the widths where this title fits on two
          lines, Inter breaks after "Neighbourhood." but Poppins (the
          /type edition) is narrow enough to pull "All" up onto the first
          line — so the wrap point would differ per edition. On mobile the
          span stays inline and wraps naturally. */}
      <SectionHeading
        label="What we're building"
        title={
          <>
            We&rsquo;re rebuilding the Neighbourhood.{" "}
            <span className="md:block">All three parts of it.</span>
          </>
        }
        align="center"
        measure="xl"
      />

      <div className="mt-3xl flex flex-col gap-3xl">
        {PILLARS.map((pillar, index) => (
          <PillarRow key={pillar.number} pillar={pillar} index={index} />
        ))}
      </div>
    </Section>
  );
}
