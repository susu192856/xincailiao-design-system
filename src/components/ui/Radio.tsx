import type { InputHTMLAttributes } from "react";

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
  const radioId = id ?? props.name;
  const messageId = error || helperText ? `${radioId}-message` : undefined;
  const controlSize = size === "sm" ? "14px" : "var(--selection-control-size)";
  const checkedRingWidth = size === "sm" ? "4px" : "5px";

  return (
    <div className={className}>
      <label className={["inline-flex items-start gap-[var(--selection-control-gap)]", disabled ? "cursor-not-allowed" : "cursor-pointer"].join(" ")}>
        <span className="relative mt-0.5 flex shrink-0 items-center justify-center" style={{ width: controlSize, height: controlSize }}>
          <input
            type="radio"
            id={radioId}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-checked={props.checked}
            aria-describedby={messageId}
            className="peer sr-only"
            {...props}
          />
          <span className={[
            "block rounded-full border transition-colors",
            "peer-checked:border-[var(--neutral-900)]",
            "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--neutral-900)]",
            "peer-disabled:cursor-not-allowed peer-disabled:opacity-[var(--disabled-opacity)]",
            error ? "border-[var(--error-text)]" : "border-[var(--neutral-300)]",
            "bg-white",
          ].join(" ")}
            style={{
              width: controlSize,
              height: controlSize,
              borderWidth: checkedRingWidth,
            }}
          />
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
