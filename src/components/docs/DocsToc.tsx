import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type TocItem = {
  id: string;
  label: string;
};

export default function DocsToc() {
  const location = useLocation();
  const [items, setItems] = useState<TocItem[]>([]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const headings = Array.from(document.querySelectorAll<HTMLElement>(".docs-article h2"));
      const nextItems = headings.map((heading, index) => {
        const id = `section-${index + 1}`;
        heading.id = id;
        return { id, label: heading.textContent?.trim() || `章节 ${index + 1}` };
      });
      setItems(nextItems);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.pathname]);

  if (items.length < 2) return null;

  return (
    <aside className="sticky top-8 hidden max-h-[calc(100vh-4rem)] w-48 shrink-0 overflow-y-auto rounded-[var(--radius-md)] border border-[var(--neutral-200)] bg-white/86 p-4 backdrop-blur 2xl:block">
      <div className="mb-3 text-xs font-semibold text-[var(--neutral-800)]">本页目录</div>
      <nav aria-label="本页目录">
        <ol className="space-y-1 border-l border-[var(--neutral-200)]">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="-ml-px block border-l border-transparent py-1.5 pl-3 text-xs leading-5 text-[var(--text-secondary)] transition-colors hover:border-[var(--neutral-900)] hover:text-[var(--neutral-900)]"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  );
}
