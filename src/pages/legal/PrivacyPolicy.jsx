import { Link } from "react-router-dom";
import LegalLayout, { LegalSection } from "../../components/legal/LegalLayout.jsx";
import { LEGAL_META } from "../../data/legalMeta.js";

const SECTIONS = [
  { id: "who-we-are", heading: "1. Who we are" },
  { id: "information-we-collect", heading: "2. Information we collect" },
  { id: "how-we-use-information", heading: "3. How we use your information" },
  { id: "legal-basis", heading: "4. Our legal basis for processing" },
  { id: "local-storage", heading: "5. Local storage on the preview pages" },
  { id: "sharing", heading: "6. Who we share information with" },
  { id: "retention", heading: "7. How long we keep information" },
  { id: "security", heading: "8. How we protect your information" },
  { id: "children", heading: "9. Children's information" },
  { id: "your-rights", heading: "10. Your rights and choices" },
  { id: "international", heading: "11. Where your information is processed" },
  { id: "changes", heading: "12. Changes to this policy" },
  { id: "contact", heading: "13. Contact us" },
];

export default function PrivacyPolicy() {
  return (
    <LegalLayout
      title="Privacy Policy"
      description="This policy explains what information The Neighbourhood collects when you join our waitlist or try our early product previews, why we collect it, and what choices you have."
      sections={SECTIONS}
    >
      <LegalSection id="who-we-are" heading="1. Who we are">
        <p>
          {LEGAL_META.entityName} ("<strong>The Neighbourhood</strong>",
          "<strong>we</strong>", "<strong>us</strong>", or
          "<strong>our</strong>") operates the website you are currently
          on, including the waitlist sign-up flow and the "Today" and "One
          Day" product previews (together, the "<strong>Services</strong>").
          We are based in {LEGAL_META.location}.
        </p>
        <p>
          This Privacy Policy applies to everyone who visits our website,
          joins our waitlist, or uses our product previews. It does not
          apply to any other product, including a future mobile app, which
          will carry its own privacy policy at the time it launches.
        </p>
        <p>
          By using the Services, you agree to the collection and use of
          information in accordance with this policy. If you do not agree,
          please do not use the Services.
        </p>
      </LegalSection>

      <LegalSection id="information-we-collect" heading="2. Information we collect">
        <p>
          We only collect information you choose to give us. We do not use
          analytics, advertising, or tracking scripts on this website, and
          we do not collect information passively about your browsing
          across other sites.
        </p>
        <p>
          <strong>When you join the waitlist</strong>, we ask for:
        </p>
        <ul>
          <li>your name;</li>
          <li>your phone number (required, so we can identify your waitlist entry and let you look up your spot);</li>
          <li>your email address (optional);</li>
          <li>your child's age or stage (for example, "0–3 months"), and your child's first name or nickname — both optional, and used only to shape how we describe the village around your family's stage; and</li>
          <li>
            a referral identifier, if you arrived through another parent's
            invite link, so we can credit them for the introduction.
          </li>
        </ul>
        <p>
          <strong>When you look up your waitlist position</strong>, we ask
          for the phone number you originally joined with.
        </p>
        <p>
          <strong>When you use the "Today" or "One Day" previews</strong>{" "}
          ( /today and /day ), you may be asked for a child's name and date
          of birth (or age), and optionally a parent's name, so the preview
          can show you age-appropriate activities and a sample of the daily
          companion experience. As explained in Section 5, this information
          stays in your own browser and is not sent to us.
        </p>
        <p>
          <strong>When you email us</strong> at{" "}
          <a href={`mailto:${LEGAL_META.contactEmail}`}>{LEGAL_META.contactEmail}</a>
          , we receive your email address and whatever else you choose to
          include in your message.
        </p>
        <p>
          We do not ask for or knowingly collect payment card details,
          government identification numbers, or health records through the
          Services.
        </p>
      </LegalSection>

      <LegalSection id="how-we-use-information" heading="3. How we use your information">
        <p>We use the information described above to:</p>
        <ul>
          <li>create and maintain your place on the waitlist, and let you look it up;</li>
          <li>calculate referral credit and let you share your personal invite link;</li>
          <li>send you updates about your waitlist status and our launch (for example, by phone or email);</li>
          <li>respond to questions you send us; and</li>
          <li>understand, in aggregate, the stages and needs of the families on our waitlist, so we can build a better product for them.</li>
        </ul>
        <p>
          We do not sell your personal information, and we do not use it to
          show you advertising.
        </p>
      </LegalSection>

      <LegalSection id="legal-basis" heading="4. Our legal basis for processing">
        <p>
          We process your personal data on the basis of the consent you
          give us when you submit the waitlist form or the lookup form. You
          may withdraw that consent at any time by contacting us — see
          Section 10.
        </p>
        <p>
          Where applicable law, including India's Digital Personal Data
          Protection Act, 2023, requires a specific legal basis for a
          particular use, we rely on your consent, or on our legitimate,
          narrowly scoped interest in operating and improving a pre-launch
          waitlist for a service you have asked to join.
        </p>
      </LegalSection>

      <LegalSection id="local-storage" heading="5. Local storage on the preview pages">
        <p>
          The "Today" and "One Day" previews are demonstrations of what the
          product may feel like — they are not connected accounts. Any
          child profile, daily activity choices, or reflections you enter
          on these pages are saved using your browser's local storage
          (specifically, the keys{" "}
          <code>tn_child_profile_v1</code>, <code>tn_companion_meta_v1</code>{" "}
          and <code>tn_daily_moments_v1</code>) directly on your device.
        </p>
        <p>
          That information is never transmitted to our servers, is not
          linked to your waitlist entry, and is only ever visible to you,
          on the device and browser you used. Clearing your browser's site
          data, or using a different device or browser, will remove it.
          See our <Link to="/cookie-policy">Cookie Policy</Link> for more
          detail on how we use local storage.
        </p>
      </LegalSection>

      <LegalSection id="sharing" heading="6. Who we share information with">
        <p>
          We do not sell or rent your personal information. We share it
          only with the service providers that keep the Services running,
          each of whom processes it on our behalf and under contract:
        </p>
        <ul>
          <li>
            <strong>Supabase</strong> — the database and backend
            infrastructure that stores waitlist entries and powers your
            queue position and lookup;
          </li>
          <li>
            <strong>Vercel</strong> — the hosting provider that serves this
            website;
          </li>
          <li>
            <strong>Google Fonts</strong> — used to load the typefaces on
            this page; loading a font requests it from that provider's
            servers, which may log your IP address under their own privacy
            policies.
          </li>
        </ul>
        <p>
          We may also disclose information if required to do so by law, or
          to protect the rights, property, or safety of The Neighbourhood,
          our users, or others.
        </p>
        <p>
          If The Neighbourhood is ever involved in a merger, acquisition,
          or sale of assets, waitlist information may be transferred as
          part of that transaction; we will let you know before your
          information becomes subject to a different privacy policy.
        </p>
      </LegalSection>

      <LegalSection id="retention" heading="7. How long we keep information">
        <p>
          We keep waitlist information for as long as your entry remains
          active — generally until we launch and invite you in, or until
          you ask us to delete it. If we discontinue the waitlist without
          launching, we will delete waitlist data within a reasonable
          period, unless we are required to keep it for a legal purpose.
        </p>
        <p>
          Local storage from the preview pages remains on your device until
          you clear it yourself; we have no way to access or delete it
          remotely, because it never reaches our servers.
        </p>
      </LegalSection>

      <LegalSection id="security" heading="8. How we protect your information">
        <p>
          We rely on our infrastructure providers' security controls
          (including encryption in transit and access-controlled
          databases) to protect the information you give us, and we limit
          access to waitlist data to the people who need it to run the
          waitlist. No method of transmission or storage is completely
          secure, and we cannot guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection id="children" heading="9. Children's information">
        <p>
          The Services are intended for use by parents, expecting parents,
          and other adult caregivers — not by children. Where we hold
          information about a child (such as a first name, nickname, or
          age band), it is provided to us by the parent or guardian who
          submitted the waitlist form, and is used solely to make our
          communication with that parent more relevant.
        </p>
        <p>
          We do not knowingly collect personal information directly from a
          child. If you believe a child has provided us with personal
          information without a parent's or guardian's involvement, please
          contact us and we will delete it.
        </p>
      </LegalSection>

      <LegalSection id="your-rights" heading="10. Your rights and choices">
        <p>You can, at any time, ask us to:</p>
        <ul>
          <li>tell you what information we hold about you;</li>
          <li>correct information that is inaccurate or incomplete;</li>
          <li>delete your waitlist entry and associated information;</li>
          <li>withdraw your consent to further processing; and</li>
          <li>stop contacting you about your waitlist status or our launch.</li>
        </ul>
        <p>
          To exercise any of these choices, email us at{" "}
          <a href={`mailto:${LEGAL_META.contactEmail}`}>{LEGAL_META.contactEmail}</a>{" "}
          from the address or with the phone number you used to sign up, so
          we can verify the request. We will respond within a reasonable
          time, and in any event within the period required by applicable
          law.
        </p>
        <p>
          <strong>Grievance officer.</strong> In accordance with India's
          Information Technology Act, 2000 and rules made under it, you may
          direct any complaint or grievance about how we handle your
          personal information to our Grievance Officer at{" "}
          <a href={`mailto:${LEGAL_META.contactEmail}`}>{LEGAL_META.contactEmail}</a>
          , {LEGAL_META.location}.
        </p>
      </LegalSection>

      <LegalSection id="international" heading="11. Where your information is processed">
        <p>
          We are based in India, and our infrastructure providers may
          process and store information outside India, including in other
          countries where they operate data centres. Where this happens,
          we require our providers to protect your information to a
          standard consistent with this policy.
        </p>
      </LegalSection>

      <LegalSection id="changes" heading="12. Changes to this policy">
        <p>
          We may update this policy as the Services evolve — for example,
          when we launch the full product and introduce a proper mobile
          app with user accounts. We will update the "Last updated" date
          and version number at the top of this page whenever we do, and
          for material changes we will make reasonable efforts to notify
          waitlist members directly (for example, by email or phone).
        </p>
      </LegalSection>

      <LegalSection id="contact" heading="13. Contact us">
        <p>
          Questions about this policy, or about your information, can be
          sent to{" "}
          <a href={`mailto:${LEGAL_META.contactEmail}`}>{LEGAL_META.contactEmail}</a>
          . We're based in {LEGAL_META.location}.
        </p>
        <p>
          This policy should be read together with our{" "}
          <Link to="/terms-and-conditions">Terms &amp; Conditions</Link>,{" "}
          <Link to="/cookie-policy">Cookie Policy</Link>, and{" "}
          <Link to="/disclaimer">Disclaimer</Link>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
