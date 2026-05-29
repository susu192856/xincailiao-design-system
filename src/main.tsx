import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App";
import "./styles/globals.css";

const redirectedPath = sessionStorage.getItem("xincailiao-design-system-redirect");

if (redirectedPath) {
  sessionStorage.removeItem("xincailiao-design-system-redirect");

  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
  const nextPath = redirectedPath.startsWith(basePath)
    ? redirectedPath.slice(basePath.length) || "/"
    : redirectedPath;

  window.history.replaceState(null, "", `${basePath}${nextPath}`);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
