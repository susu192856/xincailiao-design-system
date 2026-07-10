import { useId, type InputHTMLAttributes } from "react";

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> & {
  label?: string;
  description?: string;
  helperText?: string;
  error?: string;
  indeterminate?: boolean;
  size?: "sm" | "md";
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
  const generatedId = useId();
  const checkId = id ?? `checkbox-${generatedId.replace(/:/g, "")}`;
  const messageId = error || helperText ? `${checkId}-message` : undefined;
  const controlSize = size === "sm" ? "14px" : "var(--selection-control-size)";

  return (
    <div className={className}>
      <label className={["inline-flex items-start gap-[var(--selection-control-gap)]", disabled ? "cursor-not-allowed" : "cursor-pointer"].join(" ")}>
        <span className="relative mt-0.5 flex shrink-0 items-center justify-center" style={{ width: controlSize, height: controlSize }}>
          <input
            type="checkbox"
            id={checkId}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-checked={indeterminate ? "mixed" : props.checked}
            aria-describedby={messageId}
            className="peer sr-only"
            {...props}
          />
          <span className={[
            "block rounded-[var(--radius-sm)] border transition-colors",
            "peer-hover:border-[var(--product-blue-500)]",
            "peer-checked:border-[var(--product-blue-500)] peer-checked:bg-[var(--product-blue-500)]",
            "peer-checked:peer-active:border-[var(--product-blue-600)] peer-checked:peer-active:bg-[var(--product-blue-600)]",
            "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--product-blue-500)]",
            error ? "border-[var(--error-text)]" : "border-[var(--neutral-400)]",
            "bg-white",
            "peer-disabled:cursor-not-allowed peer-disabled:border-[var(--neutral-400)] peer-disabled:bg-[var(--neutral-200)]",
            "peer-checked:peer-disabled:border-[var(--neutral-400)] peer-checked:peer-disabled:bg-[var(--neutral-400)]",
            indeterminate
              ? disabled
                ? "!border-[var(--neutral-400)] !bg-[var(--neutral-400)]"
                : "!border-transparent !bg-[var(--product-blue-500)]"
              : "",
          ].join(" ")}
            style={{ width: controlSize, height: controlSize }}
          />
          <svg
            className={["pointer-events-none absolute", indeterminate ? "hidden" : "hidden peer-checked:block"].join(" ")}
            width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"
          >
            <path d="M2 5L4.5 7.5L8.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {indeterminate ? <span className="pointer-events-none absolute h-0.5 w-2 bg-white" aria-hidden="true" /> : null}
        </span>
        <span className="min-w-0">
          {label ? <span className="block text-sm text-[var(--text-body)]">{label}</span> : null}
          {description ? <span className="mt-1 block text-xs leading-5 text-[var(--text-tertiary)]">{description}</span> : null}
        </span>
      </label>
      {error ? (
        <p id={messageId} className="mt-1.5 text-xs leading-5 text-[var(--error-text)]">{error}</p>
      ) : helperText ? (
        <p id={messageId} className="mt-1.5 text-xs leading-5 text-[var(--text-tertiary)]">{helperText}</p>
      ) : null}
    </div>
  );
}
