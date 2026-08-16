import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// "/" keeps serving the site as it's live today (the "legacy" edition —
// see .edition-legacy in index.css). This session's redesign — Poppins +
// Playfair Display, rounder geometry, soft shadows, gradient washes, all
// on the brand's own terracotta palette — previews at /type instead of
// replacing it outright.
const Edition = lazy(() => import("./pages/Edition.jsx"));

const TodayPage = lazy(() => import("./pages/TodayPage.jsx"));
const OneDayPage = lazy(() => import("./pages/OneDayPage.jsx"));

// Legal pages. Top-level routes (not per-edition), so every surface of
// the site — the main site, /type, /today, /day — can link to one
// canonical copy.
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

      {/* The redesign preview. */}
      <Route path="/type" element={page(<Edition page="home" />)} />
      <Route path="/type/story" element={page(<Edition page="story" />)} />
      <Route path="/type/values" element={page(<Edition page="values" />)} />
      <Route path="/type/faq" element={page(<Edition page="faq" />)} />

      {/* Product surfaces. */}
      <Route path="/today" element={page(<TodayPage />)} />
      <Route path="/day" element={page(<OneDayPage />)} />

      {/* Legal. */}
      <Route path="/privacy-policy" element={page(<PrivacyPolicy />)} />
      <Route path="/terms-and-conditions" element={page(<TermsAndConditions />)} />
      <Route path="/cookie-policy" element={page(<CookiePolicy />)} />
      <Route path="/disclaimer" element={page(<Disclaimer />)} />

      {/* Retired routes. /v2 and /reference were briefly live, so they
          point somewhere useful rather than 404ing. */}
      <Route path="/v2" element={<Navigate to="/type" replace />} />
      <Route path="/v2/story" element={<Navigate to="/type/story" replace />} />
      <Route path="/v2/values" element={<Navigate to="/type/values" replace />} />
      <Route path="/v2/faq" element={<Navigate to="/type/faq" replace />} />
      <Route path="/reference/*" element={<Navigate to="/type" replace />} />

      {/* Legacy redirects. */}
      <Route path="/next" element={<Navigate to="/" replace />} />
      <Route path="/next/story" element={<Navigate to="/story" replace />} />
      <Route path="/next/values" element={<Navigate to="/values" replace />} />
      <Route path="/next/faq" element={<Navigate to="/faq" replace />} />
      <Route path="/v1" element={<Navigate to="/" replace />} />
      <Route path="/v3" element={<Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
