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

// 清理浏览器缓存的已删除路由
try {
  const known = ["/", "/layout", "/design-system/colors", "/typography", "/spacing", "/shadow", "/radius",
    "/components/select", "/components/button", "/components/icon", "/components/input", "/components/form",
    "/components/radio", "/components/checkbox", "/components/switch", "/components/table", "/components/pagination",
    "/components/description-list", "/components/card", "/components/tag", "/components/avatar", "/components/badge",
    "/components/image", "/components/chart", "/components/empty", "/components/upload", "/components/menu",
    "/components/tabs", "/components/breadcrumb", "/components/collapse", "/components/tree", "/components/transfer",
    "/components/modal", "/components/drawer", "/components/tooltip", "/components/popover", "/components/toast",
    "/delivery",
  ];
  const currentPath = window.location.pathname;
  if (currentPath !== "/" && !known.includes(currentPath)) {
    window.history.replaceState(null, "", "/");
  }
} catch (_) { /* ignore */ }

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
