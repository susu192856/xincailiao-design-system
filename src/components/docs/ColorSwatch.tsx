type ColorSwatchProps = {
  name: string;
  value: string;
};

export default function ColorSwatch({ name, value }: ColorSwatchProps) {
  return (
    <div className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className="size-8 rounded-md border border-[var(--docs-border)]"
        style={{ backgroundColor: value }}
      />
      <div>
        <div className="font-medium">{name}</div>
        <div className="font-mono text-xs text-[var(--docs-muted)]">{value}</div>
      </div>
    </div>
  );
}
