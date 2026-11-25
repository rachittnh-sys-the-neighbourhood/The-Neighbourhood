// PostHog wiring — page views, funnels (waitlist dialog opened -> step
// completed -> signup submitted), and general click autocapture.
//
// Nothing loads until both of these are true:
//  1. VITE_POSTHOG_KEY is set (same config-gated pattern as
//     isSupabaseConfigured in supabaseClient.js and the GA4 hook in
//     components/seo/Analytics.jsx) — no key is invented here.
//  2. The visitor has accepted the consent banner (ConsentBanner.jsx).
// This is what the Cookie Policy's "we'll ask first" promise means in
// code, not just in copy.
const CONSENT_KEY = "tn_analytics_consent_v1";

const posthogKey = import.meta.env.VITE_POSTHOG_KEY;
const posthogHost = import.meta.env.VITE_POSTHOG_HOST || "https://us.i.posthog.com";

export const isAnalyticsConfigured = Boolean(posthogKey);

let posthogPromise = null;

function loadPostHog() {
  if (!isAnalyticsConfigured) return null;
  if (!posthogPromise) {
    posthogPromise = import("posthog-js").then(({ default: posthog }) => {
      posthog.init(posthogKey, {
        api_host: posthogHost,
        // We only asked for usage tracking and funnels, not session
        // replay — keep that off until someone explicitly wants it and
        // updates the Cookie Policy again to say so.
        disable_session_recording: true,
        capture_pageview: false, // we send our own, on route change
        persistence: "localStorage",
      });
      return posthog;
    });
  }
  return posthogPromise;
}

/** "granted" | "denied" | null (not yet decided). */
export function getAnalyticsConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

export function setAnalyticsConsent(value) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Storage blocked (private mode, etc.) — fall through; the banner
    // will just keep reappearing, which is the safe failure mode.
  }
  if (value === "granted") {
    loadPostHog();
  } else if (value === "denied") {
    posthogPromise?.then((posthog) => posthog.opt_out_capturing());
  }
}

/** Call once at startup — resumes tracking if consent was already given. */
export function initAnalyticsIfConsented() {
  if (getAnalyticsConsent() === "granted") loadPostHog();
}

export function trackPageView(path) {
  if (getAnalyticsConsent() !== "granted") return;
  loadPostHog()?.then((posthog) => posthog.capture("$pageview", { $current_url: path }));
}

export function trackEvent(name, props) {
  if (getAnalyticsConsent() !== "granted") return;
  loadPostHog()?.then((posthog) => posthog.capture(name, props));
}
