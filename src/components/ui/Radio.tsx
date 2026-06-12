import type { InputHTMLAttributes } from "react";

export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> & {
  label?: string;
  description?: string;
  helperText?: string;
  error?: string;
  size?: "sm" | "md";
};

const controlSizes = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
};

export function Radio({
  label,
  description,
  helperText,
  error,
  size = "md",
  disabled,
  className = "",
  id,
  ...props
}: RadioProps) {
  const radioId = id ?? props.name;

  return (
    <div className={className}>
      <label className={["inline-flex items-start gap-2.5", disabled ? "cursor-not-allowed" : "cursor-pointer"].join(" ")}>
        <span className={["relative mt-0.5 flex shrink-0 items-center justify-center", controlSizes[size]].join(" ")}>
          <input
            type="radio"
            id={radioId}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            className="peer sr-only"
            {...props}
          />
          <span className={[
            "block rounded-full border transition-colors",
            controlSizes[size],
            "peer-checked:border-[var(--neutral-900)] peer-checked:border-[5px]",
            "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--neutral-400)]",
            "peer-disabled:cursor-not-allowed peer-disabled:opacity-40",
            error ? "border-[var(--error-text)]" : "border-[var(--neutral-300)]",
            "bg-white",
          ].join(" ")} />
        </span>
        <span className="min-w-0">
          {label ? <span className="block text-sm text-[var(--neutral-800)]">{label}</span> : null}
          {description ? <span className="mt-1 block text-xs leading-5 text-[var(--neutral-500)]">{description}</span> : null}
        </span>
      </label>
      {error ? (
        <p className="mt-1.5 text-xs leading-5 text-[var(--error-text)]">{error}</p>
      ) : helperText ? (
        <p className="mt-1.5 text-xs leading-5 text-[var(--neutral-500)]">{helperText}</p>
      ) : null}
    </div>
  );
}
