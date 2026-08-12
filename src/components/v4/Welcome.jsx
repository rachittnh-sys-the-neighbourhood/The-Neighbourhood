import Section from "../ui/Section.jsx";
import AccentLabel from "../ui/AccentLabel.jsx";
import BlobImage from "../ui/BlobImage.jsx";
import useScrollReveal from "../useScrollReveal.js";
import motherAndBaby from "../../assets/mother-and-baby.svg";

/**
 * Section 2 — Welcome.
 *
 * The reference's founder-intro beat: a centred welcome line over the
 * warm wash, flanked by soft palette shapes, with an organic blob-framed
 * portrait alongside. Uses the BlobImage component rather than a bespoke
 * frame, so the silhouette matches every other photo on the site.
 */
export default function Welcome() {
  const { ref, inView } = useScrollReveal(0.2);

  return (
    <Section id="welcome" surface="off-white" className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute bottom-2xl left-0 hidden h-3xl w-3xl rounded-circle opacity-70 md:block"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--color-warm-taupe) 1.6px, transparent 1.6px)",
            backgroundSize: "11px 11px",
          }}
        />
        <div className="blob-float absolute right-2xl top-xl hidden h-3xl w-3xl rounded-circle bg-sage/20 md:block" />
      </div>

      <div ref={ref} className="relative grid items-center gap-2xl md:grid-cols-2 md:gap-3xl">
        <div className={`reveal ${inView ? "in-view" : ""}`}>
          <AccentLabel className="mb-md">Welcome</AccentLabel>

          <h2 className="type-section-heading text-deep-purple">
            Welcome to The Neighbourhood.
          </h2>

          <p className="type-body-large mt-lg max-w-measure text-slate-blue">
            We&rsquo;re Sakshi and Rachit — parents to Mehr and Rudr, building
            in Gurugram the village we couldn&rsquo;t find for our own
            children.
          </p>

        </div>

        <div className={`reveal ${inView ? "in-view" : ""} mx-auto w-full max-w-measure-sm`} data-delay="2">
          <BlobImage
            src={motherAndBaby}
            alt="An illustration of a parent holding their baby close"
            variant="a"
            imgClassName="object-contain p-2xl"
          />
        </div>
      </div>
    </Section>
  );
}
