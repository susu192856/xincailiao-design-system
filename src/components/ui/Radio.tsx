import { useId, type InputHTMLAttributes } from "react";

export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> & {
  label?: string;
  description?: string;
  helperText?: string;
  error?: string;
  size?: "sm" | "md";
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
  const generatedId = useId();
  const radioId = id ?? `radio-${generatedId.replace(/:/g, "")}`;
  const messageId = error || helperText ? `${radioId}-message` : undefined;
  const controlSize = size === "sm" ? "14px" : "var(--selection-control-size)";
  const dotSize = size === "sm" ? "6px" : "8px";

  return (
    <div className={className}>
      <label className={["inline-flex items-start gap-[var(--selection-control-gap)]", disabled ? "cursor-not-allowed" : "cursor-pointer"].join(" ")}>
        <span className="relative mt-0.5 flex shrink-0 items-center justify-center" style={{ width: controlSize, height: controlSize }}>
          <input
            type="radio"
            id={radioId}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-describedby={messageId}
            className="peer sr-only"
            {...props}
          />
          <span className={[
            "radio-control flex items-center justify-center rounded-full border border-[var(--neutral-400)] bg-white transition-colors",
            "peer-hover:border-[var(--product-blue-500)]",
            "peer-checked:border-[var(--product-blue-500)] peer-checked:bg-[var(--product-blue-500)] peer-checked:[&_.radio-dot]:opacity-100",
            "peer-checked:peer-active:border-[var(--product-blue-600)] peer-checked:peer-active:bg-[var(--product-blue-600)]",
            "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--neutral-900)]",
            "peer-disabled:cursor-not-allowed peer-disabled:border-[var(--neutral-400)] peer-disabled:bg-[var(--neutral-200)]",
            "peer-checked:peer-disabled:border-[var(--neutral-400)] peer-checked:peer-disabled:bg-[var(--neutral-400)]",
            error ? "!border-[var(--error-text)]" : "",
          ].join(" ")}
            style={{
              width: controlSize,
              height: controlSize,
            }}
          >
            <span className="radio-dot rounded-full bg-white opacity-0 transition-opacity" style={{ width: dotSize, height: dotSize }} />
          </span>
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
