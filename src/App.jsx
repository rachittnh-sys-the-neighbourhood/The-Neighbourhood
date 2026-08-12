import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// "/" now serves the redesign directly — the refined brand palette, set
// in sama-latin — that used to preview at /type. The old src/legacy
// design that lived at "/" before it has been retired.
const Edition = lazy(() => import("./pages/Edition.jsx"));

const TodayPage = lazy(() => import("./pages/TodayPage.jsx"));
const OneDayPage = lazy(() => import("./pages/OneDayPage.jsx"));

// Legal pages. Top-level routes (not per-edition), so every surface of
// the site — the main site, /today, /day — can link to one canonical copy.
const PrivacyPolicy = lazy(() => import("./pages/legal/PrivacyPolicy.jsx"));
const TermsAndConditions = lazy(() => import("./pages/legal/TermsAndConditions.jsx"));
const CookiePolicy = lazy(() => import("./pages/legal/CookiePolicy.jsx"));
const Disclaimer = lazy(() => import("./pages/legal/Disclaimer.jsx"));

const page = (element) => <Suspense fallback={null}>{element}</Suspense>;

export default function App() {
  return (
    <Routes>
      {/* The live site. */}
      <Route path="/" element={page(<Edition edition="typekit" page="home" />)} />
      <Route path="/story" element={page(<Edition edition="typekit" page="story" />)} />
      <Route path="/values" element={page(<Edition edition="typekit" page="values" />)} />
      <Route path="/faq" element={page(<Edition edition="typekit" page="faq" />)} />

      {/* Product surfaces. */}
      <Route path="/today" element={page(<TodayPage />)} />
      <Route path="/day" element={page(<OneDayPage />)} />

      {/* Legal. */}
      <Route path="/privacy-policy" element={page(<PrivacyPolicy />)} />
      <Route path="/terms-and-conditions" element={page(<TermsAndConditions />)} />
      <Route path="/cookie-policy" element={page(<CookiePolicy />)} />
      <Route path="/disclaimer" element={page(<Disclaimer />)} />

      {/* Retired routes. /type, /v2 and /reference were briefly live —
          /type is what "/" now serves, so all of them point at the
          equivalent root path rather than 404ing. */}
      <Route path="/type" element={<Navigate to="/" replace />} />
      <Route path="/type/story" element={<Navigate to="/story" replace />} />
      <Route path="/type/values" element={<Navigate to="/values" replace />} />
      <Route path="/type/faq" element={<Navigate to="/faq" replace />} />
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
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
