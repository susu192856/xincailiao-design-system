import type { InputHTMLAttributes } from "react";

export type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> & {
  label?: string;
  description?: string;
  helperText?: string;
  error?: string;
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

export function Switch({
  label,
  description,
  helperText,
  error,
  size = "md",
  disabled,
  className = "",
  id,
  ...props
}: SwitchProps) {
  const switchId = id ?? props.name;
  const messageId = error || helperText ? `${switchId}-message` : undefined;

  return (
    <div className={className}>
      <label className={["inline-flex items-start gap-[var(--selection-control-gap)]", disabled ? "cursor-not-allowed" : "cursor-pointer"].join(" ")}>
        <span className="relative mt-0.5 shrink-0">
          <input
            type="checkbox"
            id={switchId}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-checked={props.checked}
            aria-describedby={messageId}
            className="peer sr-only"
            role="switch"
            {...props}
          />
          <span className={[
            "block rounded-full transition-colors peer-checked:bg-[var(--product-blue-500)]",
            error ? "bg-[var(--neutral-200)] ring-1 ring-[var(--error-text)]" : "bg-[var(--neutral-300)]",
            "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--neutral-900)]",
            "peer-disabled:cursor-not-allowed peer-disabled:opacity-[var(--disabled-opacity)]",
            trackSizes[size],
          ].join(" ")} />
          <span className={[
            "absolute left-0.5 top-0.5 rounded-full bg-white transition-transform",
            thumbSizes[size],
            translateX[size],
          ].join(" ")} />
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
