import type { InputHTMLAttributes } from "react";

type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: string;
};

export function Radio({ label, disabled, className = "", id, ...props }: RadioProps) {
  const radioId = id ?? props.name;

  return (
    <label className={["inline-flex items-center gap-2", disabled ? "cursor-not-allowed" : "cursor-pointer", className].join(" ")}>
      <span className="relative flex h-4 w-4 items-center justify-center">
        <input
          type="radio"
          id={radioId}
          disabled={disabled}
          className="peer sr-only"
          {...props}
        />
        <span className={[
          "block h-4 w-4 rounded-full border transition-colors",
          "peer-checked:border-[var(--neutral-900)] peer-checked:border-[5px]",
          "peer-focus-visible:outline-2 peer-focus-visible:outline-[var(--neutral-400)]",
          "peer-disabled:opacity-40 peer-disabled:cursor-not-allowed",
          "border-[var(--neutral-300)] bg-white",
        ].join(" ")} />
      </span>
      {label ? <span className="text-sm text-[var(--neutral-700)]">{label}</span> : null}
    </label>
  );
}
