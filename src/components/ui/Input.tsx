import type { InputHTMLAttributes, ReactNode } from "react";

type InputSize = "sm" | "md" | "lg";
type LabelPosition = "top" | "left";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label?: string;
  helperText?: string;
  error?: string;
  size?: InputSize;
  labelPosition?: LabelPosition;
  labelWidth?: number | string;
  icon?: ReactNode;
  suffix?: ReactNode;
};

const sizeClasses: Record<InputSize, string> = {
  sm: "h-7 px-2.5 text-sm",
  md: "h-8 px-3 text-sm",
  lg: "h-9 px-3 text-sm",
};

export function Input({
  label,
  helperText,
  error,
  size = "md",
  labelPosition = "top",
  labelWidth = 96,
  icon,
  suffix,
  disabled,
  className = "",
  id,
  ...props
}: InputProps) {
  const inputId = id ?? props.name;
  const isHorizontal = labelPosition === "left";
  const labelStyle = isHorizontal ? { width: typeof labelWidth === "number" ? `${labelWidth}px` : labelWidth } : undefined;

  return (
    <label className={isHorizontal ? "flex items-start gap-3" : "block"}>
      {label ? (
        <span
          className={[
            "block text-sm font-medium text-[var(--neutral-900)]",
            isHorizontal ? "shrink-0 pt-1.5 text-right" : "mb-1.5",
          ].join(" ")}
          style={labelStyle}
        >
          {label}
          {props.required ? <span className="ml-1 text-[var(--brand-600)]">*</span> : null}
        </span>
      ) : null}
      <span className={isHorizontal ? "min-w-0 flex-1" : "block"}>
        <span className="relative block">
          {icon ? (
            <span className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 text-[var(--neutral-500)]">
              {icon}
            </span>
          ) : null}
          <input
            id={inputId}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            className={[
              "w-full rounded-[var(--radius-sm)] border bg-white font-normal text-[var(--neutral-900)] outline-none transition-colors",
              "placeholder:text-[var(--neutral-400)] read-only:bg-[var(--neutral-50)] read-only:text-[var(--neutral-600)] disabled:cursor-not-allowed disabled:bg-[var(--neutral-100)] disabled:text-[var(--neutral-400)]",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--neutral-900)]",
              error
                ? "border-[var(--error-text)] focus:border-[var(--error-text)]"
                : "border-[var(--neutral-300)] hover:border-[var(--neutral-400)] focus:border-[var(--neutral-900)]",
              icon ? "pl-9" : "",
              suffix ? "pr-10" : "",
              sizeClasses[size],
              className,
            ].join(" ")}
            {...props}
          />
          {suffix ? (
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--neutral-500)]">
              {suffix}
            </span>
          ) : null}
        </span>
        {error || helperText ? (
          <span className={`mt-1.5 block text-xs ${error ? "text-[var(--error-text)]" : "text-[var(--neutral-500)]"}`}>
            {error ?? helperText}
          </span>
        ) : null}
      </span>
    </label>
  );
}
