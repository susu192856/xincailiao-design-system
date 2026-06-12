import type { InputHTMLAttributes } from "react";

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> & {
  label?: string;
  description?: string;
  helperText?: string;
  error?: string;
  indeterminate?: boolean;
  size?: "sm" | "md";
};

const controlSizes = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
};

export function Checkbox({
  label,
  description,
  helperText,
  error,
  indeterminate,
  size = "md",
  disabled,
  className = "",
  id,
  ...props
}: CheckboxProps) {
  const checkId = id ?? props.name;

  return (
    <div className={className}>
      <label className={["inline-flex items-start gap-2.5", disabled ? "cursor-not-allowed" : "cursor-pointer"].join(" ")}>
        <span className={["relative mt-0.5 flex shrink-0 items-center justify-center", controlSizes[size]].join(" ")}>
          <input
            type="checkbox"
            id={checkId}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            className="peer sr-only"
            {...props}
          />
          <span className={[
            "block rounded-sm border transition-colors",
            controlSizes[size],
            "peer-checked:bg-[var(--neutral-900)] peer-checked:border-[var(--neutral-900)]",
            "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--neutral-400)]",
            error ? "border-[var(--error-text)]" : "border-[var(--neutral-300)]",
            "bg-white",
            "peer-disabled:cursor-not-allowed peer-disabled:opacity-40",
            indeterminate ? "border-[var(--neutral-900)] bg-[var(--neutral-900)]" : "",
          ].join(" ")} />
          <svg
            className={["pointer-events-none absolute", indeterminate ? "hidden" : "hidden peer-checked:block"].join(" ")}
            width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"
          >
            <path d="M2 5L4.5 7.5L8.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {indeterminate ? <span className="pointer-events-none absolute h-0.5 w-2 bg-white" aria-hidden="true" /> : null}
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
