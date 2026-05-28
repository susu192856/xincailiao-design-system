import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8">
      <div className="mb-4">
        <p className="ml-3.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--neutral-400)]">
          {eyebrow}
        </p>
        <div className="mt-0.5 flex items-center gap-3">
          <span className="h-5 w-0.5 shrink-0 bg-[var(--docs-accent)]" aria-hidden="true" />
          <h2 className="text-lg font-semibold leading-6 text-[var(--neutral-900)]">{title}</h2>
          <div className="hidden h-px flex-1 bg-[var(--neutral-200)] md:block" />
        </div>
      </div>
      {description ? (
        <p className="max-w-4xl text-sm leading-7 text-[var(--neutral-600)]">{description}</p>
      ) : null}
    </div>
  );
}

export function ExampleCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-sm border border-[var(--neutral-200)] bg-white p-6">
      <div className="mb-5">
        <h3 className="text-base font-semibold text-[var(--neutral-900)]">{title}</h3>
        {description ? <p className="mt-2 text-sm leading-6 text-[var(--neutral-600)]">{description}</p> : null}
      </div>
      {children}
    </div>
  );
}

export function SpecList({ items }: { items: string[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {items.map((item, index) => (
        <div key={item} className="rounded-[2px] bg-white p-5">
          <div className="mb-4 font-mono text-3xl font-semibold text-[var(--neutral-100)]">
            {String(index + 1).padStart(2, "0")}
          </div>
          <p className="text-sm leading-6 text-[var(--neutral-700)]">{item}</p>
        </div>
      ))}
    </div>
  );
}
