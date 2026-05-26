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
      <div className="mb-4 flex items-end justify-between gap-6">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
            {eyebrow}
          </p>
          <h2 className="text-3xl font-semibold text-zinc-950">{title}</h2>
        </div>
        <div className="hidden h-px flex-1 bg-zinc-200 md:block" />
      </div>
      {description ? (
        <p className="max-w-4xl text-sm leading-7 text-zinc-600">{description}</p>
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
    <div className="rounded-[2px] bg-white p-6">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>
        {description ? <p className="mt-2 text-sm leading-6 text-zinc-600">{description}</p> : null}
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
          <div className="mb-4 font-mono text-3xl font-semibold text-zinc-100">
            {String(index + 1).padStart(2, "0")}
          </div>
          <p className="text-sm leading-6 text-zinc-700">{item}</p>
        </div>
      ))}
    </div>
  );
}
