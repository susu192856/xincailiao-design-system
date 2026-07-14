import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { List, X } from "@phosphor-icons/react";
import DocsSidebar from "./DocsSidebar";
import DocsToc from "./DocsToc";
import { HomeHero } from "../../pages/design-system/HomePage";
import FeedbackFloatingButton from "../feedback/FeedbackFloatingButton";

export default function DocsLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen bg-[var(--docs-bg)] text-[var(--text-primary)] lg:flex">
      <DocsSidebar className="sticky top-0 hidden shrink-0 lg:block" />

      {sidebarOpen ? (
        <div className="fixed inset-0 z-[var(--z-modal)] lg:hidden">
          <button
            type="button"
            aria-label="关闭导航"
            className="absolute inset-0 bg-[var(--overlay-bg)]"
            onClick={() => setSidebarOpen(false)}
          />
          <DocsSidebar
            className="relative z-10 shadow-[var(--shadow-xl)]"
            onNavigate={() => setSidebarOpen(false)}
          />
          <button
            type="button"
            aria-label="关闭导航"
            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] bg-white text-[var(--text-primary)] shadow-[var(--shadow-md)]"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>
      ) : null}

      <main className="min-w-0 flex-1 overflow-x-clip bg-[linear-gradient(180deg,#FFFFFF_0%,var(--neutral-50)_360px,#FFFFFF_100%)]">
        {isHome ? <HomeHero /> : null}
        <div className="sticky top-0 z-[var(--z-sticky)] flex h-14 items-center border-b border-[var(--neutral-200)] bg-white/90 px-4 backdrop-blur lg:hidden">
          <button
            type="button"
            aria-label="打开规范导航"
            className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-sm)] text-[var(--text-secondary)] hover:bg-[var(--neutral-100)]"
            onClick={() => setSidebarOpen(true)}
          >
            <List size={20} />
          </button>
          <span className="ml-3 text-sm font-semibold">新材道设计规范</span>
        </div>
        <div className="docs-content mx-auto flex max-w-[calc(var(--content-docs-width)+10rem)] items-start gap-6 px-5 py-8 md:px-8 md:py-12 xl:px-8">
          <article className="docs-article min-w-0 flex-1">
            <Outlet />
          </article>
          {!isHome ? (
          <DocsToc />
          ) : null}
        </div>
      </main>
      <FeedbackFloatingButton />
    </div>
  );
}
