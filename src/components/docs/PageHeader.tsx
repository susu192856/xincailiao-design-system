type PageHeaderProps = {
  title: string;
  description?: string;
};

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="mb-10">
      <h1 className="text-3xl font-semibold text-zinc-900">{title}</h1>
      {description ? (
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-600">
          {description}
        </p>
      ) : null}
    </header>
  );
}
