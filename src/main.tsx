import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { LOADING } from "./constants/autocomplete";
import ErrorBoundary from "./components/ErrorBoundary/index";
import "./index.css";

const App = lazy(() => import("./App.tsx"));

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement!).render(
  <StrictMode>
    {/* Suspense provides a fallback UI while the App component is being lazy-loaded */}
    <Suspense fallback={<div className="loading">{LOADING}</div>}>
      {/* ErrorBoundary ensures graceful error handling */}
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Suspense>
  </StrictMode>
);
