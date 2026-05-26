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
    <div className={["space-y-0", className].join(" ")}>
      {/* Full gradient bar */}
      <div
        className="flex h-20 w-full overflow-hidden rounded-sm"
        style={{
          background: `linear-gradient(to right, ${colors.map((c) => c.hex).join(", ")})`,
        }}
      />
      {/* Individual color chips */}
      <div className="grid gap-0" style={{ gridTemplateColumns: `repeat(${colors.length}, 1fr)` }}>
        {colors.map((color) => (
          <div key={color.name} className="flex flex-col border-r border-[var(--neutral-200)] bg-white p-3 last:border-r-0">
            <div className="mb-1.5 font-mono text-xs font-semibold text-[var(--neutral-900)]">{color.name}</div>
            <div className="mb-1 h-1 w-full rounded-sm" style={{ backgroundColor: color.hex }} />
            <div className="font-mono text-[10px] text-[var(--neutral-500)]">{color.hex}</div>
            <div className="mt-0.5 text-[10px] text-[var(--neutral-400)]">{color.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
