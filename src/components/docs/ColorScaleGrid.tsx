import CopyableColorValue from "./CopyableColorValue";

type ColorScale = {
  name: string;
  hex: string;
  label: string;
  alias?: string;
};

type ColorScaleGridProps = {
  colors: ColorScale[];
  className?: string;
};

export default function ColorScaleGrid({ colors, className = "" }: ColorScaleGridProps) {
  const hasAlias = colors.some((c) => c.alias);
  const gridCols = hasAlias
    ? "grid-cols-[48px_minmax(120px,0.8fr)_minmax(120px,0.8fr)_minmax(180px,1fr)_minmax(180px,1fr)]"
    : "grid-cols-[48px_minmax(120px,0.8fr)_minmax(120px,0.8fr)_minmax(220px,1.6fr)]";

  const featuredRowClass = (name: string) => {
    if (name === "brand-600") return "bg-[var(--brand-50)]";
    if (name === "product-blue-500") return "bg-[var(--product-blue-50)]";
    return "bg-white";
  };

  return (
    <div className={["space-y-4", className].join(" ")}>
      <div
        className="h-8 w-full overflow-hidden rounded-[var(--radius-sm)]"
        style={{
          background: `linear-gradient(to right, ${colors.map((c) => c.hex).join(", ")})`,
        }}
      />
      <div className="overflow-hidden rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white">
        <div className={["grid border-b border-[var(--neutral-200)] bg-[var(--neutral-50)] px-4 py-2.5 text-sm font-semibold text-[var(--text-secondary)]", gridCols].join(" ")}>
          <span>颜色</span>
          <span>变量</span>
          <span>色值</span>
          <span>推荐用途</span>
          {hasAlias ? <span>语义别名</span> : null}
        </div>
        {colors.map((color) => (
          <div key={color.name} className={["grid items-center border-b border-[var(--neutral-100)] px-4 py-2.5 text-sm last:border-b-0", gridCols, featuredRowClass(color.name)].join(" ")}>
            <span className="h-6 w-6 rounded-sm border border-black/5" style={{ backgroundColor: color.hex }} />
            <span className="font-token text-sm text-[var(--text-primary)]">{color.name}</span>
            <CopyableColorValue value={color.hex} />
            <span className="text-sm text-[var(--text-primary)]">{color.label}</span>
            {hasAlias ? <span className="font-token text-sm text-[var(--text-primary)]">{color.alias}</span> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
