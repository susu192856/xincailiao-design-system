import CopyableColorValue from "./CopyableColorValue";

type ColorScale = {
  name: string;
  hex: string;
  label: string;
};

type ColorScaleGridProps = {
  colors: ColorScale[];
  className?: string;
};

export default function ColorScaleGrid({ colors, className = "" }: ColorScaleGridProps) {
  return (
    <div className={["space-y-4", className].join(" ")}>
      <div
        className="h-16 w-full overflow-hidden rounded-[var(--radius-sm)]"
        style={{
          background: `linear-gradient(to right, ${colors.map((c) => c.hex).join(", ")})`,
        }}
      />
      <div className="overflow-hidden rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white">
        <div className="grid grid-cols-[48px_minmax(120px,0.8fr)_minmax(120px,0.8fr)_minmax(220px,1.6fr)] border-b border-[var(--neutral-200)] bg-[var(--neutral-50)] px-4 py-2.5 text-sm font-semibold text-[var(--text-secondary)]">
          <span>颜色</span>
          <span>变量</span>
          <span>色值</span>
          <span>推荐用途</span>
        </div>
        {colors.map((color) => (
          <div key={color.name} className="grid grid-cols-[48px_minmax(120px,0.8fr)_minmax(120px,0.8fr)_minmax(220px,1.6fr)] items-center border-b border-[var(--neutral-100)] px-4 py-2.5 text-sm last:border-b-0">
            <span className="h-6 w-6 rounded-sm border border-black/5" style={{ backgroundColor: color.hex }} />
            <span className="font-token text-sm text-[var(--text-primary)]">{color.name}</span>
            <CopyableColorValue value={color.hex} />
            <span className="text-sm text-[var(--text-secondary)]">{color.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
