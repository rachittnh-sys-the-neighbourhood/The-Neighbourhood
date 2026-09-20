import { useEffect } from "react";

/**
 * GA4, loaded only when VITE_GA_MEASUREMENT_ID is actually set — same
 * config-gated pattern as isSupabaseConfigured in lib/supabaseClient.js.
 * No ID is invented here; until founders add one (as an environment
 * variable in Vercel's project settings, not committed to the repo),
 * this renders nothing and loads nothing.
 *
 * Referrals from ChatGPT, Perplexity, Gemini and Copilot need no special
 * code beyond this: GA4 already buckets them under Traffic acquisition
 * -> Session source/medium (they arrive as referral traffic from
 * chatgpt.com, perplexity.ai, gemini.google.com, copilot.microsoft.com).
 * There's nothing to "add" for that until there's a GA4 property to
 * check it in.
 */
export default function Analytics() {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  useEffect(() => {
    if (!measurementId) return;
    if (document.querySelector(`script[data-ga-id="${measurementId}"]`)) return;

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.dataset.gaId = measurementId;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", measurementId);
  }, [measurementId]);

  return null;
}
