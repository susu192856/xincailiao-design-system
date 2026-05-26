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
    <div className={["grid grid-cols-10 gap-0", className].join(" ")}>
      {colors.map((color) => (
        <div key={color.name} className="flex h-full flex-col">
          <div className="h-24 flex-shrink-0" style={{ backgroundColor: color.hex }} />
          <div className="flex h-[84px] flex-col justify-start border border-t-0 border-zinc-200 bg-white p-2.5">
            <div className="mb-1 truncate text-sm font-medium text-zinc-900">{color.name}</div>
            <CopyableColorValue value={color.hex} className="mb-1" />
            <div className="truncate text-xs text-zinc-500">{color.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
