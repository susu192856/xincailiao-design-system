import type { InputHTMLAttributes } from "react";

type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> & {
  label?: string;
  size?: "sm" | "md";
};

const trackSizes = {
  sm: "h-5 w-9",
  md: "h-6 w-11",
};

const thumbSizes = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
};

const translateX = {
  sm: "peer-checked:translate-x-4",
  md: "peer-checked:translate-x-5",
};

export function Switch({ label, size = "md", disabled, className = "", id, ...props }: SwitchProps) {
  const switchId = id ?? props.name;

  return (
    <label className={["inline-flex items-center gap-3", disabled ? "cursor-not-allowed" : "cursor-pointer", className].join(" ")}>
      <span className="relative">
        <input type="checkbox" id={switchId} disabled={disabled} className="peer sr-only" role="switch" {...props} />
        <span className={[
          "block rounded-full bg-[var(--neutral-300)] transition-colors peer-checked:bg-[var(--neutral-900)]",
          "peer-disabled:opacity-40 peer-disabled:cursor-not-allowed",
          trackSizes[size],
        ].join(" ")} />
        <span className={[
          "absolute left-0.5 top-0.5 rounded-full bg-white transition-transform",
          thumbSizes[size],
          translateX[size],
        ].join(" ")} />
      </span>
      {label ? <span className="text-sm text-[var(--neutral-700)]">{label}</span> : null}
    </label>
  );
}
