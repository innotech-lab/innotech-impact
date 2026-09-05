import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "./motion.css";
import App from "./App.jsx";
import LangProvider from "./i18n/LangProvider";

// Le masquage des éléments animés est conditionné à cette classe : on ne cache
// que ce qu'on saura révéler. Posé avant le rendu pour éviter tout clignotement.
if (typeof IntersectionObserver !== "undefined") {
  document.documentElement.classList.add("js-reveal");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LangProvider>
        <App />
      </LangProvider>
    </BrowserRouter>
  </StrictMode>,
);
