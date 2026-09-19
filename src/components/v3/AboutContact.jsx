import Section from "../ui/Section.jsx";
import SectionHeading from "../ui/SectionHeading.jsx";
import Button from "../ui/Button.jsx";
import useScrollReveal from "../useScrollReveal.js";

export const FOUNDERS_EMAIL = "founders@theneighbourhood.co.in";

/**
 * Contact section of the merged /about page — the nav's "About Us"
 * dropdown "Contact" entry lands here (#contact). A mailto rather than a
 * form: there is no contact table behind this yet, and a form that
 * silently drops what a parent writes is worse than an address that
 * plainly works.
 */
export default function AboutContact() {
  const { ref, inView } = useScrollReveal(0.2);

  return (
    <Section id="contact" surface="off-white">
      <SectionHeading
        label="Contact"
        title="Come and say hello."
        lead="Questions about the spaces, the waitlist, or something we haven't thought of. We'd like to hear from you."
        align="center"
      />

      <div
        ref={ref}
        className={`reveal ${inView ? "in-view" : ""} mt-2xl flex flex-col items-center gap-md`}
      >
        <Button as="a" href={`mailto:${FOUNDERS_EMAIL}`} variant="secondary" size="lg">
          {FOUNDERS_EMAIL}
        </Button>

        <p className="type-caption font-normal text-slate-blue">
          Gurugram, India
        </p>
      </div>
    </Section>
  );
}
