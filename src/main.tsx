/**
 * Entry point for the React app
 * Nothing fancy here - just renders the App into the DOM
 */

import { createRoot } from "react-dom/client";
import { App } from "./App";
import { LanguageProvider } from "./i18n";
import "./index.css";

// Find the root element and render our app
const container = document.getElementById("root");
if (container) {
  createRoot(container).render(
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
}
