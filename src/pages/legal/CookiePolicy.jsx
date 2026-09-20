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
      description="A short, honest account of what this website stores on your device, and why — because we'd rather explain the two things we use than pad this page with cookies we don't."
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
          We do not set any first-party advertising or analytics cookies on
          this website. We do not run Google Analytics, advertising
          pixels, heat-mapping tools, or any other tracking script, and we
          do not build advertising profiles from your visit.
        </p>
        <p>
          The one thing we do store on your device is <strong>browser
          local storage</strong> — a standard web technology, similar to a
          cookie but kept only on your device and never automatically sent
          to our servers with each request the way a cookie is. We use it
          in exactly one place, described below.
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
          This website loads typefaces from Google Fonts
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
            Most browsers let you clear "site data" or "local storage" for
            a specific website from their settings or privacy panel — doing
            this for our domain will remove the preview data described in
            Section 3.
          </li>
          <li>
            Because we do not set tracking cookies, there is no cookie
            consent preference to manage beyond your browser's own cookie
            settings, which you can use to block third-party cookies from
            the font providers in Section 4 if you prefer.
          </li>
        </ul>
        <p>
          Blocking local storage entirely will not affect the waitlist
          form, but will prevent the <code>/today</code> and{" "}
          <code>/day</code> previews from remembering your child between
          visits.
        </p>
      </LegalSection>

      <LegalSection id="changes" heading="6. Changes to this policy">
        <p>
          If we ever add analytics, advertising, or other tracking
          technology, we will update this policy first and describe what we
          added and why, rather than adding it silently. We will update the
          "Last updated" date and version number at the top of this page
          whenever we do.
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
