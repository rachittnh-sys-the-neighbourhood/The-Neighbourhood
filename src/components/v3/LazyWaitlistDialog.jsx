import { Suspense, lazy } from "react";

const WaitlistDialogV3 = lazy(() => import("./WaitlistDialogV3.jsx"));

/**
 * Drop-in replacement for WaitlistDialogV3 with the same `open`/`onClose`
 * props — every page renders one of these unconditionally (it just
 * returns null while closed), which meant its code was always part of
 * the initial bundle for every route, dragging in the full Supabase SDK
 * along with it (WaitlistDialogV3 imports it directly for the waitlist
 * insert/lookup calls). Not rendering the lazy component at all until
 * `open` is true means that download only starts when someone actually
 * clicks "Join the Village", not on every page load.
 */
export default function LazyWaitlistDialog({ open, onClose }) {
  if (!open) return null;
  return (
    <Suspense fallback={null}>
      <WaitlistDialogV3 open={open} onClose={onClose} />
    </Suspense>
  );
}
