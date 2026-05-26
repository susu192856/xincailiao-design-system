type PageHeaderProps = {
  title: string;
  description?: string;
};

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-semibold text-[var(--neutral-900)]">{title}</h1>
      {description ? (
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--neutral-600)]">
          {description}
        </p>
      ) : null}
    </header>
  );
}
