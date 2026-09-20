import { Link } from "react-router-dom";
import LegalLayout, { LegalSection } from "../../components/legal/LegalLayout.jsx";
import { LEGAL_META } from "../../data/legalMeta.js";

const SECTIONS = [
  { id: "acceptance", heading: "1. Acceptance of these terms" },
  { id: "about", heading: "2. About The Neighbourhood" },
  { id: "eligibility", heading: "3. Eligibility" },
  { id: "waitlist", heading: "4. The waitlist and referrals" },
  { id: "previews", heading: "5. Product previews" },
  { id: "communications", heading: "6. Communications" },
  { id: "acceptable-use", heading: "7. Acceptable use" },
  { id: "intellectual-property", heading: "8. Intellectual property" },
  { id: "third-party", heading: "9. Third-party services and links" },
  { id: "disclaimers", heading: "10. Disclaimers" },
  { id: "liability", heading: "11. Limitation of liability" },
  { id: "termination", heading: "12. Suspension and termination" },
  { id: "governing-law", heading: "13. Governing law and disputes" },
  { id: "changes", heading: "14. Changes to these terms" },
  { id: "contact", heading: "15. Contact us" },
];

export default function TermsAndConditions() {
  return (
    <LegalLayout
      title="Terms & Conditions"
      description="These terms govern your use of The Neighbourhood's website, waitlist, and product previews. Please read them before you join."
      path="/terms-and-conditions"
      sections={SECTIONS}
    >
      <LegalSection id="acceptance" heading="1. Acceptance of these terms">
        <p>
          These Terms &amp; Conditions ("<strong>Terms</strong>") form an
          agreement between you and {LEGAL_META.entityName} ("
          <strong>The Neighbourhood</strong>", "<strong>we</strong>", "
          <strong>us</strong>"). By visiting this website, joining our
          waitlist, or using our product previews (together, the "
          <strong>Services</strong>"), you agree to be bound by these
          Terms, our{" "}
          <Link to="/privacy-policy">Privacy Policy</Link>, our{" "}
          <Link to="/cookie-policy">Cookie Policy</Link>, and our{" "}
          <Link to="/disclaimer">Disclaimer</Link>. If you do not agree,
          please do not use the Services.
        </p>
      </LegalSection>

      <LegalSection id="about" heading="2. About The Neighbourhood">
        <p>
          The Neighbourhood is an early-stage parenting initiative, based
          in {LEGAL_META.location}, working to rebuild the support a
          village once gave families — shared physical spaces, a community
          of nearby parents, and day-to-day guidance shaped to your
          child's age and stage, from expecting through around six years
          old.
        </p>
        <p>
          At this stage, the Services consist of this website, a waitlist
          you can join to reserve a place among our founding families, and
          two interactive previews (<code>/today</code> and{" "}
          <code>/day</code>) that show, in a simplified and illustrative
          way, what parts of the product may eventually feel like. The
          Services do not currently include physical spaces, a live parent
          community, or a downloadable app; if and when we launch those, we
          will update these Terms or publish separate terms for them.
        </p>
      </LegalSection>

      <LegalSection id="eligibility" heading="3. Eligibility">
        <p>
          You must be at least 18 years old, and a parent, expecting
          parent, or legal guardian (or otherwise acting on behalf of one
          with authority to do so), to join the waitlist or submit
          information through the Services. The Services are not directed
          at, and should not be used by, children.
        </p>
      </LegalSection>

      <LegalSection id="waitlist" heading="4. The waitlist and referrals">
        <p>
          Joining the waitlist reserves a place in line for early access;
          it is not a purchase, a subscription, or a guarantee of access,
          pricing, features, or a specific launch date. We may change how
          the waitlist works, including queue position, referral credit,
          or the "founding families" framing, at any time.
        </p>
        <p>
          When you refer another parent using your personal invite link,
          we credit your account by moving your queue position up, as
          described on the waitlist screen at the time. We may adjust or
          remove a referral credit we reasonably believe was obtained
          through misuse (for example, fake or duplicate sign-ups).
        </p>
        <p>
          You can look up your waitlist position at any time using the
          phone number you signed up with, through the "Already joined?
          Find your spot" option.
        </p>
      </LegalSection>

      <LegalSection id="previews" heading="5. Product previews">
        <p>
          The <code>/today</code> and <code>/day</code> pages are
          illustrative previews, not a finished product and not medical,
          developmental, or professional advice. Any activity suggestions,
          milestone information, or "daily companion" content they show is
          general and drawn from a fixed set of age-and-stage content — it
          is not personalized by a professional, and it does not diagnose,
          treat, or assess your child. See our{" "}
          <Link to="/disclaimer">Disclaimer</Link> for more detail, and
          always use your own judgment and consult a qualified
          professional for decisions about your child's health or
          development.
        </p>
        <p>
          Anything you enter into these previews (such as a child's name or
          date of birth) is stored only in your own browser, as described
          in our <Link to="/privacy-policy">Privacy Policy</Link>. We may
          change, remove, or reset these previews at any time without
          notice.
        </p>
      </LegalSection>

      <LegalSection id="communications" heading="6. Communications">
        <p>
          The Services do not currently offer user accounts, passwords, or
          a sign-in flow. Instead, your phone number and (if given) email
          address are used to identify your waitlist entry, let you look up
          your position, and send you updates about the waitlist and our
          launch. You can ask us to stop contacting you at any time — see
          our <Link to="/privacy-policy">Privacy Policy</Link>.
        </p>
      </LegalSection>

      <LegalSection id="acceptable-use" heading="7. Acceptable use">
        <p>When using the Services, you agree not to:</p>
        <ul>
          <li>provide false information, or impersonate another person, when joining the waitlist;</li>
          <li>attempt to manipulate queue position or referral credit through automated sign-ups, fake accounts, or similar means;</li>
          <li>attempt to gain unauthorized access to our systems, other users' waitlist entries, or non-public parts of the Services;</li>
          <li>use the Services to transmit anything unlawful, harmful, or infringing; or</li>
          <li>interfere with the normal operation of the Services, including through scraping, denial-of-service, or reverse engineering, other than as permitted by law.</li>
        </ul>
      </LegalSection>

      <LegalSection id="intellectual-property" heading="8. Intellectual property">
        <p>
          The Services, including our name, logo, brand, copy, design, and
          the underlying content (such as the age-and-stage activity and
          milestone content shown on the site and in the previews), are
          owned by or licensed to The Neighbourhood and are protected by
          applicable intellectual property laws. Nothing in these Terms
          grants you any right to use our name, logo, or content, other
          than to view the Services in your browser for your own personal,
          non-commercial use.
        </p>
      </LegalSection>

      <LegalSection id="third-party" heading="9. Third-party services and links">
        <p>
          The Services rely on third-party infrastructure, including
          Supabase (our database provider), Vercel (our hosting provider),
          and Google Fonts for typefaces. We are not responsible for the
          availability, content, or practices of these or any other
          third-party service, or of any external site we may link to.
        </p>
      </LegalSection>

      <LegalSection id="disclaimers" heading="10. Disclaimers">
        <p>
          The Services are provided "as is" and "as available," without
          warranties of any kind, whether express, implied, or statutory,
          including any implied warranty of merchantability, fitness for a
          particular purpose, or non-infringement. We do not warrant that
          the Services will be uninterrupted, error-free, or secure, or
          that our launch will occur on any particular timeline or with any
          particular features. Please also read our full{" "}
          <Link to="/disclaimer">Disclaimer</Link>, which is incorporated
          into these Terms by reference.
        </p>
      </LegalSection>

      <LegalSection id="liability" heading="11. Limitation of liability">
        <p>
          To the fullest extent permitted by applicable law, The
          Neighbourhood and its founders will not be liable for any
          indirect, incidental, special, consequential, or punitive
          damages, or any loss of data, goodwill, or opportunity, arising
          from your use of, or inability to use, the Services — even if we
          have been advised of the possibility of such damages.
        </p>
        <p>
          Because joining the waitlist and using the previews is free of
          charge, our total liability to you for any claim arising out of
          or relating to the Services will not exceed ₹5,000 (five thousand
          Indian rupees), except where applicable law does not permit such
          a limitation.
        </p>
      </LegalSection>

      <LegalSection id="termination" heading="12. Suspension and termination">
        <p>
          We may suspend or remove a waitlist entry, or restrict access to
          the Services, if we reasonably believe these Terms have been
          violated, or if we discontinue the waitlist or a preview
          entirely. You may ask us to remove your waitlist entry at any
          time by contacting us — see Section 15.
        </p>
      </LegalSection>

      <LegalSection id="governing-law" heading="13. Governing law and disputes">
        <p>
          These Terms are governed by the laws of India, without regard to
          its conflict-of-laws principles. Subject to applicable law, the
          courts located in Gurugram, Haryana, India will have exclusive
          jurisdiction over any dispute arising out of or relating to these
          Terms or the Services.
        </p>
      </LegalSection>

      <LegalSection id="changes" heading="14. Changes to these terms">
        <p>
          We may update these Terms as the Services evolve, including when
          we move from a waitlist to a launched product. We will update the
          "Last updated" date and version number at the top of this page
          whenever we do. Continuing to use the Services after an update
          means you accept the revised Terms; for material changes, we will
          make reasonable efforts to notify waitlist members directly.
        </p>
      </LegalSection>

      <LegalSection id="contact" heading="15. Contact us">
        <p>
          Questions about these Terms can be sent to{" "}
          <a href={`mailto:${LEGAL_META.contactEmail}`}>{LEGAL_META.contactEmail}</a>
          . We're based in {LEGAL_META.location}.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
