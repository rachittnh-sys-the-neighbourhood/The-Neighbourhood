import { useState } from "react";
import Section from "../ui/Section.jsx";
import SectionHeading from "../ui/SectionHeading.jsx";
import Card from "../ui/Card.jsx";
import AccentLabel from "../ui/AccentLabel.jsx";
import useScrollReveal from "../useScrollReveal.js";
import stages from "../../data/timelineSummary.js";

/**
 * Section 6 — The Long Arc.
 *
 * Milestones are real — derived from src/data/journeyStages.json, the
 * same nine stages the product uses. The page reads a generated summary
 * (npm run gen:timeline) rather than the full dataset.
 *
 * The previous copy claimed "fifteen stages" and labelled node indices
 * 12 and 14, which the nine-stage dataset has never contained. Both are
 * corrected to match the data.
 *
 * The track and its nodes are built from palette tokens only: soft sand
 * for the unfilled rail and resting nodes, warm taupe for the drawn line
 * and the selected node.
 */

// Only a few labels are drawn, so the node row never reads as clutter.
const LABELLED = new Set([0, 4, 8]);

export default function LongArc({ legacy = false }) {
  const { ref, inView } = useScrollReveal(0.15);
  const [active, setActive] = useState(4); // 1–2 years: first steps

  const stage = stages[active];
  const highlights = stage.highlights;

  return (
    <Section id="long-arc" surface="off-white" gradient={!legacy}>
      <SectionHeading
        label="The long arc"
        title="Every child on their own clock."
        lead="The Neighbourhood follows nine stages from birth to six years (across motor, communication, social and cognitive growth) and remembers all of it, so you don't have to."
        align="center"
        serif
      />

      <div ref={ref} className={`reveal ${inView ? "in-view" : ""} mt-3xl`} data-delay="1">
        <div className="relative">
          {/* The line draws itself, once. */}
          <div
            className="absolute inset-x-0 top-[7px] h-px bg-soft-sand/40"
            aria-hidden="true"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[7px] h-px origin-left bg-warm-taupe transition-transform duration-[900ms] ease-out"
            style={{ transform: inView ? "scaleX(1)" : "scaleX(0)" }}
          />

          <ul className="relative flex items-start justify-between">
            {stages.map((s, i) => {
              const isActive = i === active;
              return (
                <li key={s.id} className="flex flex-1 flex-col items-center">
                  <button
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    aria-label={`Show milestones for ${s.label}`}
                    aria-pressed={isActive}
                    className="group -m-xs p-xs"
                  >
                    <span
                      className={`block rounded-circle transition-all duration-300 ${
                        isActive
                          ? "h-[15px] w-[15px] bg-warm-taupe"
                          : "h-[9px] w-[9px] bg-soft-sand group-hover:bg-warm-taupe/60"
                      }`}
                    />
                  </button>
                  {LABELLED.has(i) && (
                    <span className="type-caption mt-sm hidden whitespace-nowrap text-slate-blue md:block">
                      {s.label}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Selected stage */}
        <Card surface="white" elevated className="mt-2xl min-h-[220px]">
          <AccentLabel>{stage.label}</AccentLabel>

          <div className="mt-lg grid gap-lg sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((h) => (
              <div key={h.domain}>
                <p className="type-caption text-warm-orange uppercase">{h.domain}</p>
                <p className="type-body-regular mt-xs text-deep-purple">{h.milestone}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* The position, stated plainly. */}
      <p
        className={`reveal ${inView ? "in-view" : ""} type-sub-heading mt-2xl text-center text-deep-purple`}
        data-delay="3"
      >
        No percentiles. No rankings. No other children.
      </p>
    </Section>
  );
}
