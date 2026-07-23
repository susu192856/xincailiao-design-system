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
  compact?: boolean;
};

function getContrastText(hex: string) {
  const [r, g, b] = [hex.slice(1, 3), hex.slice(3, 5), hex.slice(5, 7)]
    .map((channel) => Number.parseInt(channel, 16) / 255)
    .map((channel) => channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 0.179 ? "#1A1A1A" : "#FFFFFF";
}

export default function ColorScaleGrid({
  colors,
  className = "",
  compact = false,
}: ColorScaleGridProps) {
  const hasAlias = colors.some((c) => c.alias);
  const gridCols = hasAlias
    ? "grid-cols-[40px_minmax(96px,0.8fr)_minmax(84px,0.7fr)_minmax(120px,1.15fr)_minmax(120px,1fr)]"
    : "grid-cols-[40px_minmax(96px,0.8fr)_minmax(84px,0.7fr)_minmax(120px,1.4fr)]";

  const featuredRowClass = (name: string) => {
    if (name === "brand-600") return "bg-[var(--brand-50)]";
    if (name === "product-blue-500") return "bg-[var(--product-blue-50)]";
    return "bg-white";
  };

  if (compact) {
    return (
      <div className={className}>
        <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-5">
          {colors.map((color) => (
            <div key={color.name} className="min-w-0">
              <div
                className="flex h-8 w-full items-center justify-center rounded-[var(--radius-sm)] border border-black/5 px-2"
                style={{ backgroundColor: color.hex }}
              >
                <CopyableColorValue
                  value={color.hex}
                  className="justify-center font-data text-[10px] font-semibold"
                  style={{ color: getContrastText(color.hex) }}
                />
              </div>
              <p className="mt-2 truncate font-token text-xs font-medium text-[var(--text-primary)]" title={color.name}>
                {color.name}
              </p>
              <p className="mt-1 text-xs leading-4 text-[var(--text-tertiary)]">{color.label}</p>
              {color.alias ? (
                <span className="mt-1.5 block max-w-full truncate font-token text-[10px] leading-4 text-[var(--text-tertiary)]" title={color.alias}>
                  {color.alias}
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={["space-y-4", className].join(" ")}>
      <div
        className="h-8 w-full overflow-hidden rounded-[var(--radius-sm)]"
        style={{
          background: `linear-gradient(to right, ${colors.map((c) => c.hex).join(", ")})`,
        }}
      />
      <div className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--neutral-200)] bg-white">
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
