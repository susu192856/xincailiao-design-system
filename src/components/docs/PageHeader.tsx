type PageHeaderProps = {
  title: string;
  description?: string;
  version?: string;
};

export default function PageHeader({ title, description, version }: PageHeaderProps) {
  return (
    <header className="mb-8 rounded-sm border border-[var(--docs-border)] bg-white p-6">
      <div className="flex items-start gap-4">
        <div className="mt-0.5 w-0.5 shrink-0 self-stretch bg-[var(--docs-accent)]" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-[var(--neutral-900)]">{title}</h1>
            {version ? (
              <span className="rounded-sm border border-[var(--docs-border)] bg-[var(--neutral-50)] px-2 py-0.5 text-[10px] font-medium text-[var(--neutral-500)]">
                {version}
              </span>
            ) : null}
          </div>
          {description ? (
            <p className="mt-2 max-w-3xl text-sm leading-7 text-[var(--neutral-600)]">
              {description}
            </p>
          ) : null}
        </div>
      </div>
    </header>
  );
}
