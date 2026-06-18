import type { HTMLAttributes, ReactNode } from "react";
import { CaretRight } from "@phosphor-icons/react";

export type BreadcrumbItem = {
  label: ReactNode;
  href?: string;
  current?: boolean;
  disabled?: boolean;
};

export type BreadcrumbProps = HTMLAttributes<HTMLElement> & {
  items: BreadcrumbItem[];
  maxItems?: number;
};

function getVisibleItems(items: BreadcrumbItem[], maxItems?: number): BreadcrumbItem[] {
  if (!maxItems || items.length <= maxItems || maxItems < 3) {
    return items;
  }

  return [items[0], { label: "...", disabled: true }, ...items.slice(items.length - (maxItems - 2))];
}

export function Breadcrumb({ items, maxItems, className = "", ...props }: BreadcrumbProps) {
  const visibleItems = getVisibleItems(items, maxItems);

  return (
    <nav aria-label="面包屑" className={className} {...props}>
      <ol className="flex flex-wrap items-center gap-1 text-sm text-[var(--neutral-500)]">
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1 || item.current;
          const isDisabled = item.disabled;
          return (
            <li key={index} className="flex items-center gap-1">
              {index > 0 ? <CaretRight size={12} weight="regular" className="text-[var(--neutral-400)]" /> : null}
              {item.href && !isLast && !isDisabled ? (
                <a href={item.href} className="rounded-[var(--radius-sm)] transition-colors hover:text-[var(--neutral-900)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--neutral-900)]">
                  {item.label}
                </a>
              ) : (
                <span
                  className={[
                    isLast ? "text-[var(--neutral-900)]" : "",
                    isDisabled ? "cursor-default text-[var(--neutral-400)]" : "",
                  ].join(" ")}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
