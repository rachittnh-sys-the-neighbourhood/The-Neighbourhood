import { Link } from "react-router-dom";
import Section from "../ui/Section.jsx";
import SectionHeading from "../ui/SectionHeading.jsx";
import AccentLabel from "../ui/AccentLabel.jsx";
import BlobImage from "../ui/BlobImage.jsx";
import useScrollReveal from "../useScrollReveal.js";
import PILLARS from "../../data/pillars.js";

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

        <Link
          to={`/${pillar.slug}`}
          className="type-body-small-bold mt-md inline-block text-warm-orange transition-colors duration-200 hover:text-deep-purple"
        >
          More about {pillar.eyebrow} &rarr;
        </Link>
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
