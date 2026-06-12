import { Outlet } from "react-router-dom";
import DocsSidebar from "./DocsSidebar";

export default function DocsLayout() {
  return (
    <div className="min-h-screen flex bg-white text-[var(--neutral-900)]">
      <DocsSidebar />
      <main className="min-w-0 flex-1 overflow-hidden bg-white">
        <div className="mx-auto max-w-[1024px] px-8 py-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
