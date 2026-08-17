import AccentLabel from "./AccentLabel.jsx";
import useScrollReveal from "../useScrollReveal.js";

// The measure a heading block is set to. `lg` is the default reading
// measure; `xl` is for the occasional long title that would otherwise
// take an extra line. Set as a prop rather than passed through
// `className`, because two competing max-w-* utilities would be resolved
// by stylesheet order rather than by intent.
const MEASURES = {
  lg: "max-w-measure-lg",
  xl: "max-w-measure-xl",
};

/**
 * The reference's section-opening pattern: accent label, Section Heading,
 * then a Body Large lead. Reused by every section so the information
 * hierarchy never drifts between them.
 *
 * `title` accepts a node as well as a string, so a section can pin its
 * own line breaks (see Today.jsx).
 */
export default function SectionHeading({
  label,
  title,
  lead,
  align = "left",
  measure = "lg",
  className = "",
  // Opt-in editorial treatment: the same Playfair Display / weight 500 /
  // tight tracking the hero headline now carries, for the handful of
  // section headings that play the hero's role — a standalone
  // declarative statement, not a functional label. Off by default so
  // this stays a deliberate choice per section rather than a global
  // font swap; see the callers that pass it for which ones qualify.
  serif = false,
}) {
  const { ref, inView } = useScrollReveal(0.25);
  const centered = align === "center";

  return (
    <div
      ref={ref}
      className={`${centered ? "mx-auto text-center" : ""} ${MEASURES[measure]} ${className}`}
    >
      {label && (
        <AccentLabel className={`reveal ${inView ? "in-view" : ""} mb-md`}>
          {label}
        </AccentLabel>
      )}

      <h2
        className={`reveal ${inView ? "in-view" : ""} type-section-heading text-deep-purple`}
        style={
          serif
            ? {
                fontFamily: "var(--font-playfair)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                lineHeight: 1.08,
                color: "#3A2116",
              }
            : undefined
        }
        data-delay="1"
      >
        {title}
      </h2>

      {lead && (
        <p
          className={`reveal ${inView ? "in-view" : ""} type-body-large mt-lg text-slate-blue`}
          data-delay="2"
        >
          {lead}
        </p>
      )}
    </div>
  );
}
