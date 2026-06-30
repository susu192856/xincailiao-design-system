import { useId, type CSSProperties, type InputHTMLAttributes, type ReactNode } from "react";

type InputSize = "sm" | "md" | "lg";
type LabelPosition = "top" | "left";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> & {
  label?: string;
  helperText?: string;
  error?: string;
  size?: InputSize;
  labelPosition?: LabelPosition;
  labelWidth?: number | string;
  prefix?: ReactNode;
  /** @deprecated 使用 prefix。 */
  icon?: ReactNode;
  suffix?: ReactNode;
};

const sizeClasses: Record<InputSize, string> = {
  sm: "h-11 px-[var(--field-padding-x-sm)] text-sm md:h-[var(--control-height-sm)]",
  md: "h-11 px-[var(--field-padding-x-md)] text-sm md:h-[var(--control-height-md)]",
  lg: "h-11 px-[var(--field-padding-x-lg)] text-sm md:h-[var(--control-height-lg)]",
};

export function Input({
  label,
  helperText,
  error,
  size = "md",
  labelPosition = "top",
  labelWidth = 96,
  prefix,
  icon,
  suffix,
  disabled,
  className = "",
  id,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? props.name ?? generatedId;
  const messageId = `${inputId}-message`;
  const isHorizontal = labelPosition === "left";
  const resolvedPrefix = prefix ?? icon;
  const labelStyle = isHorizontal
    ? ({ "--input-label-width": typeof labelWidth === "number" ? `${labelWidth}px` : labelWidth } as CSSProperties)
    : undefined;

  return (
    <label className={isHorizontal ? "block md:flex md:items-start md:gap-3" : "block"} htmlFor={inputId}>
      {label ? (
        <span
          className={[
            "block text-sm font-normal text-[var(--text-secondary)]",
            isHorizontal
              ? "mb-1.5 w-auto md:mb-0 md:w-[var(--input-label-width)] md:shrink-0 md:pt-1.5 md:text-left"
              : "mb-1.5",
          ].join(" ")}
          style={labelStyle}
        >
          {label}
          {props.required ? <span className="ml-1 text-[var(--brand-600)]">*</span> : null}
        </span>
      ) : null}
      <span className={isHorizontal ? "min-w-0 flex-1" : "block"}>
        <span className="relative block">
          {resolvedPrefix ? (
            <span className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 text-[var(--text-tertiary)]">
              {resolvedPrefix}
            </span>
          ) : null}
          <input
            {...props}
            id={inputId}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={error || helperText ? messageId : undefined}
            className={[
              "field-single-border-focus w-full rounded-[var(--radius-sm)] border bg-white font-normal text-[var(--text-primary)] outline-none transition-colors",
              "placeholder:text-[var(--neutral-400)] read-only:bg-[var(--neutral-50)] read-only:text-[var(--text-tertiary)] disabled:cursor-not-allowed disabled:bg-[var(--neutral-100)] disabled:text-[var(--neutral-400)]",
              error
                ? "border-[var(--field-border-error)] focus:border-[var(--field-border-error)]"
                : "border-[var(--field-border-default)] hover:border-[var(--field-border-hover)] focus:border-[var(--field-border-focus)]",
              resolvedPrefix ? "pl-9" : "",
              suffix ? "pr-10" : "",
              sizeClasses[size],
              className,
            ].join(" ")}
          />
          {suffix ? (
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--text-tertiary)]">
              {suffix}
            </span>
          ) : null}
        </span>
        {error || helperText ? (
          <span id={messageId} className={`mt-1.5 block text-xs ${error ? "text-[var(--error-text)]" : "text-[var(--text-tertiary)]"}`}>
            {error ?? helperText}
          </span>
        ) : null}
      </span>
    </label>
  );
}
