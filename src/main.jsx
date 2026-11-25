import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Analytics from "./components/seo/Analytics.jsx";
import PostHogPageViews from "./components/seo/PostHogPageViews.jsx";
import ConsentBanner from "./components/ConsentBanner.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Analytics />
      <PostHogPageViews />
      <App />
      <ConsentBanner />
    </BrowserRouter>
  </React.StrictMode>
);
