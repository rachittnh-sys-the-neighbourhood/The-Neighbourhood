import { Link } from "react-router-dom";
import LegalLayout, { LegalSection } from "../../components/legal/LegalLayout.jsx";
import { LEGAL_META } from "../../data/legalMeta.js";

const SECTIONS = [
  { id: "scope", heading: "1. What this policy covers" },
  { id: "cookies-vs-storage", heading: "2. Cookies vs. local storage" },
  { id: "local-storage-we-use", heading: "3. Local storage we use" },
  { id: "third-party", heading: "4. Third-party services" },
  { id: "managing", heading: "5. Managing your preferences" },
  { id: "changes", heading: "6. Changes to this policy" },
  { id: "contact", heading: "7. Contact us" },
];

export default function CookiePolicy() {
  return (
    <LegalLayout
      title="Cookie Policy"
      description="A short, honest account of what this website stores on your device, and why — including the one analytics tool we run, and only with your consent."
      metaDescription="A short, honest account of what this website stores on your device, and why — including the one analytics tool we run, and only with your consent."
      path="/cookie-policy"
      sections={SECTIONS}
    >
      <LegalSection id="scope" heading="1. What this policy covers">
        <p>
          This policy explains how {LEGAL_META.entityName} uses cookies and
          similar technologies, including browser local storage, on this
          website. It should be read together with our{" "}
          <Link to="/privacy-policy">Privacy Policy</Link>.
        </p>
      </LegalSection>

      <LegalSection id="cookies-vs-storage" heading="2. Cookies vs. local storage">
        <p>
          We do not set any advertising cookies on this website, run
          advertising pixels, use heat-mapping tools, or build advertising
          profiles from your visit. As of version 1.2 of this policy, we do
          run one analytics tool — PostHog — described in Section 4, and
          only after you accept the consent banner shown on your first
          visit.
        </p>
        <p>
          The other thing we store on your device is <strong>browser
          local storage</strong> — a standard web technology, similar to a
          cookie but kept only on your device and never automatically sent
          to our servers with each request the way a cookie is. We use it
          in exactly one place, described below, plus to remember your
          analytics choice from Section 5.
        </p>
      </LegalSection>

      <LegalSection id="local-storage-we-use" heading="3. Local storage we use">
        <p>
          The <code>/today</code> and <code>/day</code> product previews
          save what you enter — a child's name and date of birth or age, an
          optional parent name, and the daily activities you choose to try
          or reflect on — in your browser's local storage, under the keys{" "}
          <code>tn_child_profile_v1</code>, <code>tn_companion_meta_v1</code>{" "}
          and <code>tn_daily_moments_v1</code>. This lets the preview "remember"
          your child between visits, in that browser, on that device only.
        </p>
        <p>
          This information is never transmitted to us, is not linked to
          your waitlist entry, and is entirely under your control — see
          Section 5 for how to clear it.
        </p>
      </LegalSection>

      <LegalSection id="third-party" heading="4. Third-party services">
        <p>
          <strong>PostHog</strong> — if you accept the consent banner, we
          load PostHog to understand, in aggregate, which pages people
          visit and where they drop off in the waitlist sign-up flow (for
          example, opening the form, filling in a child's stage, and
          submitting). PostHog sets its own analytics cookie/local-storage
          identifier on this domain to do this. We have turned off session
          recording — PostHog is not watching or recording your screen,
          only the page views and the named events described above. We do
          not use it for advertising, and we do not combine it with your
          waitlist entry.
        </p>
        <p>
          This website also loads typefaces from Google Fonts
          (fonts.googleapis.com). Loading a font is a request to that
          provider's servers, and like any web request it may let the
          provider see your IP address and browser details, and may set
          cookies of their own on that provider's domain, governed by their
          own cookie and privacy policies rather than ours.
        </p>
        <p>
          Our waitlist database (Supabase) and hosting provider (Vercel)
          may use their own strictly necessary cookies or local storage to
          operate their infrastructure securely; we do not control these
          directly, and they are not used by us to track you across other
          websites.
        </p>
      </LegalSection>

      <LegalSection id="managing" heading="5. Managing your preferences">
        <p>You can manage or remove what this site stores on your device at any time:</p>
        <ul>
          <li>
            A banner asks for your choice on analytics (PostHog, Section 4)
            the first time you visit. You can change your mind later by
            clearing "site data" or "local storage" for this domain in your
            browser's settings — the banner will ask again on your next
            visit.
          </li>
          <li>
            Most browsers let you clear "site data" or "local storage" for
            a specific website from their settings or privacy panel — doing
            this for our domain will remove the preview data described in
            Section 3, and your analytics choice above.
          </li>
          <li>
            You can also use your browser's own cookie settings to block
            third-party cookies from the font providers in Section 4 if you
            prefer.
          </li>
        </ul>
        <p>
          Blocking local storage entirely will not affect the waitlist
          form, but will prevent the <code>/today</code> and{" "}
          <code>/day</code> previews from remembering your child between
          visits, and will cause the consent banner to reappear on every
          visit.
        </p>
      </LegalSection>

      <LegalSection id="changes" heading="6. Changes to this policy">
        <p>
          We added PostHog analytics in version 1.2 of this policy (see
          Section 4), and updated this page first to describe what we added
          and why, consistent with what we said we'd do below. If we add
          further analytics, advertising, or other tracking technology, we
          will update this policy first and describe what we added and why,
          rather than adding it silently. We will update the "Last updated"
          date and version number at the top of this page whenever we do.
        </p>
      </LegalSection>

      <LegalSection id="contact" heading="7. Contact us">
        <p>
          Questions about this policy can be sent to{" "}
          <a href={`mailto:${LEGAL_META.contactEmail}`}>{LEGAL_META.contactEmail}</a>
          . We're based in {LEGAL_META.location}.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
