import { Link } from "react-router-dom";
import LegalLayout, { LegalSection } from "../../components/legal/LegalLayout.jsx";
import { LEGAL_META } from "../../data/legalMeta.js";

const SECTIONS = [
  { id: "general", heading: "1. General information only" },
  { id: "not-medical-advice", heading: "2. Not medical or professional advice" },
  { id: "milestones", heading: "3. Developmental milestones and activities" },
  { id: "previews", heading: "4. Product previews" },
  { id: "no-guarantee", heading: "5. No guarantee of results" },
  { id: "waitlist", heading: "6. Waitlist and early-access disclaimer" },
  { id: "third-party", heading: "7. Third-party content and links" },
  { id: "liability", heading: "8. Limitation of liability" },
  { id: "changes", heading: "9. Changes to this disclaimer" },
  { id: "contact", heading: "10. Contact us" },
];

export default function Disclaimer() {
  return (
    <LegalLayout
      title="Disclaimer"
      description="What The Neighbourhood's content is — and, just as importantly, what it isn't. Please read this alongside our Terms & Conditions."
      path="/disclaimer"
      sections={SECTIONS}
    >
      <LegalSection id="general" heading="1. General information only">
        <p>
          Everything on this website, including the "Why we exist" and
          "What we're building" sections, our founder story, our FAQ, and
          the <code>/today</code> and <code>/day</code> previews, is
          provided for general informational and illustrative purposes
          only. It describes what {LEGAL_META.entityName} is building and
          why, and is not a substitute for individual professional advice
          about your own child or family.
        </p>
      </LegalSection>

      <LegalSection id="not-medical-advice" heading="2. Not medical or professional advice">
        <p>
          Nothing on this website or in our previews is medical,
          psychological, developmental, nutritional, educational, or legal
          advice, and it should not be treated as such. We are not a
          healthcare provider, and no parent-child relationship, patient
          relationship, or professional advisory relationship is created
          by using the Services.
        </p>
        <p>
          Always seek the advice of your pediatrician, physician, or other
          qualified professional with any questions you may have regarding
          your child's health, development, or well-being, and before
          making any decisions based on anything you read here. Never
          disregard professional advice, or delay seeking it, because of
          something you saw on this website.
        </p>
      </LegalSection>

      <LegalSection id="milestones" heading="3. Developmental milestones and activities">
        <p>
          Any age ranges, developmental stages, or activity suggestions
          referenced on this website or shown in our previews (for
          example, the age bands used to personalise the <code>/day</code>{" "}
          preview) are general guidelines drawn from a fixed set of curated
          content, not an individual assessment of your child. Every child
          develops at their own pace, and a range that doesn't match your
          child's experience is not, by itself, a cause for concern —
          nor is it a diagnosis either way. If you have concerns about your
          child's development, please speak with a pediatrician or other
          qualified professional.
        </p>
      </LegalSection>

      <LegalSection id="previews" heading="4. Product previews">
        <p>
          The <code>/today</code> and <code>/day</code> pages are early,
          illustrative previews of ideas we are exploring, told through
          fixed sample content rather than a live, personalized service.
          They do not reflect a finished or launched product, may not
          represent the final design, content, or features of anything we
          eventually build, and may change or be removed at any time
          without notice.
        </p>
      </LegalSection>

      <LegalSection id="no-guarantee" heading="5. No guarantee of results">
        <p>
          We make no representation or warranty that anything described on
          this website — including the physical spaces, community, or
          guidance layer referenced in our story and values — will be
          available on any particular timeline, in any particular
          location, or at all, or that it will produce any particular
          outcome for your child or family.
        </p>
      </LegalSection>

      <LegalSection id="waitlist" heading="6. Waitlist and early-access disclaimer">
        <p>
          Your position on the waitlist, and any referral credit you earn,
          are indicative only and may change as the waitlist grows, as
          described in our <Link to="/terms-and-conditions">Terms &amp; Conditions</Link>.
          Joining the waitlist does not guarantee access to a launched
          product, a specific launch date, or specific pricing or
          features.
        </p>
      </LegalSection>

      <LegalSection id="third-party" heading="7. Third-party content and links">
        <p>
          Where the Services rely on or reference third-party
          infrastructure (such as our database, hosting, or font
          providers), we do not control and are not responsible for their
          content, availability, or accuracy.
        </p>
      </LegalSection>

      <LegalSection id="liability" heading="8. Limitation of liability">
        <p>
          To the fullest extent permitted by law, {LEGAL_META.entityName}{" "}
          and its founders disclaim all liability for any loss or damage
          arising from reliance on information provided on this website or
          in our previews. This Disclaimer should be read together with
          the disclaimers and limitation of liability in our{" "}
          <Link to="/terms-and-conditions">Terms &amp; Conditions</Link>.
        </p>
      </LegalSection>

      <LegalSection id="changes" heading="9. Changes to this disclaimer">
        <p>
          We may update this Disclaimer as the Services evolve. We will
          update the "Last updated" date and version number at the top of
          this page whenever we do.
        </p>
      </LegalSection>

      <LegalSection id="contact" heading="10. Contact us">
        <p>
          Questions about this Disclaimer can be sent to{" "}
          <a href={`mailto:${LEGAL_META.contactEmail}`}>{LEGAL_META.contactEmail}</a>
          . We're based in {LEGAL_META.location}.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
