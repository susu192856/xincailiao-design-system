import { Outlet } from "react-router-dom";
import DocsSidebar from "./DocsSidebar";

export default function DocsLayout() {
  return (
    <div className="min-h-screen bg-[var(--docs-bg)] text-[var(--docs-fg)]">
      <div className="mx-auto flex min-h-screen max-w-[1440px]">
        <DocsSidebar />
        <main className="min-w-0 flex-1 px-8 py-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
