import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

type TocItem = {
  id: string;
  label: string;
};

export default function DocsToc() {
  const location = useLocation();
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const headings = Array.from(document.querySelectorAll<HTMLElement>(".docs-article h2[data-docs-section]"));
      const nextItems = headings.map((heading, index) => {
        const id = `section-${index + 1}`;
        heading.id = id;
        return { id, label: heading.textContent?.trim() || `章节 ${index + 1}` };
      });
      setItems(nextItems);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.pathname]);

  const startObserving = useCallback(() => {
    if (observer.current) observer.current.disconnect();
    const headingElements = items.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
    if (headingElements.length === 0) return;

    observer.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );

    headingElements.forEach((el) => observer.current?.observe(el));

    return () => observer.current?.disconnect();
  }, [items]);

  useEffect(() => {
    const cleanup = startObserving();
    return () => cleanup?.();
  }, [startObserving]);

  if (items.length < 2) return null;

  return (
    <aside className="sticky top-8 hidden max-h-[calc(100vh-4rem)] w-48 shrink-0 overflow-y-auto p-4 xl:block">
      <nav aria-label="本页目录">
        <ol className="space-y-1 border-l border-[var(--neutral-200)]">
          {items.map((item) => {
            const isActive = item.id === activeId;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`-ml-px block border-l py-1.5 pl-3 text-xs leading-5 transition-colors ${
                    isActive
                      ? "border-[var(--neutral-900)] text-[var(--text-primary)] font-medium"
                      : "border-transparent text-[var(--text-secondary)] hover:border-[var(--neutral-400)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </aside>
  );
}
