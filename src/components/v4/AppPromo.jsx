import { useEffect, useState } from "react";

const APP_URL = "https://the-neighbourhood-mobile-orcin.vercel.app/welcome";
const SHOW_DELAY_MS = 4000;

/**
 * "Try the app" pop-up. Homepage-only, both editions.
 *
 * Same rounded floating-card treatment at every breakpoint: on mobile it
 * spans edge-to-edge minus a small side/bottom margin (so all four
 * corners round, rather than a flush bottom-sheet), offset from the
 * bottom by whichever is larger — the usual spacing-lg gap, or the
 * device's home-indicator/gesture-bar safe area, so it never sits under
 * the browser chrome. At sm: and up it narrows to its natural width,
 * bottom-right.
 *
 * Mounted from the first render so the .reveal/.in-view transition (see
 * MOTION in index.css) actually animates in once `shown` flips true,
 * rather than popping in unstyled — same pattern useScrollReveal uses,
 * just timer-driven instead of IntersectionObserver-driven.
 *
 * Dismissal is plain component state, not persisted: closing it hides it
 * for the rest of this page view, but a fresh visit (or reload) starts
 * over and shows it again after the same delay.
 */
export default function AppPromo() {
  const [shown, setShown] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShown(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  if (dismissed) return null;

  return (
    <div
      className={`reveal ${shown ? "in-view" : ""} fixed inset-x-lg bottom-[max(1.5rem,env(safe-area-inset-bottom))] z-40 flex flex-col gap-sm rounded-rounded border border-lavender-mist bg-white p-md shadow-card sm:inset-x-auto sm:bottom-lg sm:right-lg sm:w-auto sm:flex-row sm:items-center sm:gap-md sm:py-sm sm:pl-lg sm:pr-sm`}
    >
      {/* Text + close share a row on mobile (where the CTA drops to its own
          full-width row below); sm:contents dissolves this wrapper back
          into the parent row so all three sit inline together on larger
          screens. */}
      <div className="flex items-center justify-between gap-md sm:contents">
        <p className="type-body-regular text-deep-purple">
          Take The Neighbourhood with you.
        </p>

        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          className="flex h-lg w-lg shrink-0 items-center justify-center text-warm-orange transition-colors hover:text-deep-purple sm:order-last"
        >
          <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
            close
          </span>
        </button>
      </div>

      <a
        href={APP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="type-body-small-bold whitespace-nowrap rounded-pill bg-primary px-lg py-xs text-center text-white transition-colors duration-200 hover:bg-primary-hover"
      >
        Explore the app &rarr;
      </a>
    </div>
  );
}
