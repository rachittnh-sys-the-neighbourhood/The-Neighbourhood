import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initAnalyticsIfConsented, trackPageView } from "../../lib/analytics.js";

/**
 * Sends a PostHog pageview on every route change. This is a single-page
 * app, so unlike Analytics.jsx's GA4 script (which only fires once, on
 * initial load), each React Router navigation needs its own explicit
 * call — there's no full page load for PostHog to observe otherwise.
 */
export default function PostHogPageViews() {
  const location = useLocation();

  useEffect(() => {
    initAnalyticsIfConsented();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location.pathname, location.search]);

  return null;
}
