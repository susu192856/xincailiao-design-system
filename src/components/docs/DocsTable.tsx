import type { ReactNode } from "react";

type DocsTableProps = {
  children?: ReactNode;
  caption?: string;
  className?: string;
};

export default function DocsTable({ children, caption, className = "" }: DocsTableProps) {
  return (
    <div className={`docs-table overflow-hidden rounded-[var(--radius-sm)] border border-[var(--docs-border)] bg-white ${className}`}>
      <table data-docs-table="true">{children}</table>
      {caption ? (
        <p className="border-t border-[var(--neutral-100)] px-4 py-2 text-xs leading-[var(--type-caption-line-height)] text-[var(--text-tertiary)]">
          {caption}
        </p>
      ) : null}
    </div>
  );
}
