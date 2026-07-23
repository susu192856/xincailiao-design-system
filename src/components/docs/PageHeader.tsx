import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  version?: string;
  status?: "stable" | "review" | "draft";
  note?: ReactNode;
};

export default function PageHeader({
  title,
  description,
  action,
  note,
}: PageHeaderProps) {
  return (
    <header className="docs-surface relative mb-12 overflow-hidden rounded-[var(--radius-md)] px-6 py-7 md:px-8 md:py-8">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-2/5 bg-gradient-to-l from-[var(--brand-50)] to-transparent" aria-hidden="true" />
      <div className="relative flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="mr-1 text-[2.125rem] font-semibold leading-[1.16] tracking-[-0.035em] text-[var(--text-primary)] md:text-[2.5rem]">{title}</h1>
          </div>
          {description ? (
            <p className="mt-4 max-w-[var(--content-reading-width)] text-base leading-6 text-[var(--text-primary)]">
              {description}
            </p>
          ) : null}
          {note ? (
            <aside className="mt-4 max-w-[var(--content-reading-width)] border-l-2 border-[var(--brand-500)] bg-[var(--neutral-50)] px-3 py-2 text-sm leading-6 text-[var(--text-secondary)]">
              {note}
            </aside>
          ) : null}
        </div>
        {action ? <div className="relative z-10 shrink-0">{action}</div> : null}
      </div>
    </header>
  );
}
