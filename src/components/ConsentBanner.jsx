import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "./ui/Button.jsx";
import { getAnalyticsConsent, isAnalyticsConfigured, setAnalyticsConsent } from "../lib/analytics.js";

/**
 * Asks before any analytics loads — see lib/analytics.js and the Cookie
 * Policy's "we'll ask first" commitment. Renders nothing when analytics
 * isn't configured at all, or once the visitor has already answered.
 */
export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(isAnalyticsConfigured && getAnalyticsConsent() === null);
  }, []);

  if (!visible) return null;

  const decide = (value) => {
    setAnalyticsConsent(value);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie and analytics consent"
      className="fixed inset-x-0 bottom-0 z-[90] border-t border-border bg-card p-lg shadow-subtle-lift"
    >
      <div className="mx-auto flex max-w-measure-xl flex-col items-start gap-md sm:flex-row sm:items-center sm:justify-between">
        <p className="type-caption text-body">
          We'd like to use privacy-conscious analytics to understand how
          people use this site, so we can improve it. No ads, no selling
          your data. See our{" "}
          <Link to="/cookie-policy" className="underline underline-offset-2">
            Cookie Policy
          </Link>{" "}
          for details.
        </p>
        <div className="flex shrink-0 gap-sm">
          <Button variant="quiet" size="sm" onClick={() => decide("denied")}>
            Decline
          </Button>
          <Button variant="primary" size="sm" onClick={() => decide("granted")}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
