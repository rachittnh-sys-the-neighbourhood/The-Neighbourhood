import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// "/" keeps serving the site as it's live today (the "legacy" edition —
// see .edition-legacy in index.css). /type previewed this session's
// redesign alongside it for a while; that route is retired now (see the
// retired-routes block below), but Edition itself still takes a `legacy`
// prop internally — every route below just always passes it.
const Edition = lazy(() => import("./pages/Edition.jsx"));

const TodayPage = lazy(() => import("./pages/TodayPage.jsx"));
const OneDayPage = lazy(() => import("./pages/OneDayPage.jsx"));

// Legal pages. Top-level routes (not per-edition), so every surface of
// the site — the main site, /today, /day — can link to one canonical
// copy.
const PrivacyPolicy = lazy(() => import("./pages/legal/PrivacyPolicy.jsx"));
const TermsAndConditions = lazy(() => import("./pages/legal/TermsAndConditions.jsx"));
const CookiePolicy = lazy(() => import("./pages/legal/CookiePolicy.jsx"));
const Disclaimer = lazy(() => import("./pages/legal/Disclaimer.jsx"));

const page = (element) => <Suspense fallback={null}>{element}</Suspense>;

export default function App() {
  return (
    <Routes>
      {/* The live site. */}
      <Route path="/" element={page(<Edition legacy page="home" />)} />
      <Route path="/story" element={page(<Edition legacy page="story" />)} />
      <Route path="/values" element={page(<Edition legacy page="values" />)} />
      <Route path="/faq" element={page(<Edition legacy page="faq" />)} />

      {/* Product surfaces. */}
      <Route path="/today" element={page(<TodayPage />)} />
      <Route path="/day" element={page(<OneDayPage />)} />

      {/* Legal. */}
      <Route path="/privacy-policy" element={page(<PrivacyPolicy />)} />
      <Route path="/terms-and-conditions" element={page(<TermsAndConditions />)} />
      <Route path="/cookie-policy" element={page(<CookiePolicy />)} />
      <Route path="/disclaimer" element={page(<Disclaimer />)} />

      {/* Retired routes. /v2 and /reference were briefly live, so they
          point somewhere useful rather than 404ing. Both used to land on
          /type; that route is gone too now, so they go straight to the
          live site instead of bouncing through it. */}
      <Route path="/v2" element={<Navigate to="/" replace />} />
      <Route path="/v2/story" element={<Navigate to="/story" replace />} />
      <Route path="/v2/values" element={<Navigate to="/values" replace />} />
      <Route path="/v2/faq" element={<Navigate to="/faq" replace />} />
      <Route path="/reference/*" element={<Navigate to="/" replace />} />

      {/* Legacy redirects. */}
      <Route path="/next" element={<Navigate to="/" replace />} />
      <Route path="/next/story" element={<Navigate to="/story" replace />} />
      <Route path="/next/values" element={<Navigate to="/values" replace />} />
      <Route path="/next/faq" element={<Navigate to="/faq" replace />} />
      <Route path="/v1" element={<Navigate to="/" replace />} />
      <Route path="/v3" element={<Navigate to="/" replace />} />
      <Route path="/type" element={<Navigate to="/" replace />} />
      <Route path="/type/story" element={<Navigate to="/story" replace />} />
      <Route path="/type/values" element={<Navigate to="/values" replace />} />
      <Route path="/type/faq" element={<Navigate to="/faq" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
