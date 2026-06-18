import type { SelectHTMLAttributes } from "react";
import { CaretDown } from "@phosphor-icons/react";

type SelectSize = "sm" | "md" | "lg";
type LabelPosition = "top" | "left";

type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> & {
  label?: string;
  helperText?: string;
  error?: string;
  size?: SelectSize;
  labelPosition?: LabelPosition;
  labelWidth?: number | string;
  options: SelectOption[];
  placeholder?: string;
  loading?: boolean;
};

const sizeClasses: Record<SelectSize, string> = {
  sm: "h-7 pl-2.5 pr-8 text-sm",
  md: "h-8 pl-3 pr-9 text-sm",
  lg: "h-9 pl-3 pr-9 text-sm",
};

export function Select({
  label,
  helperText,
  error,
  size = "md",
  labelPosition = "top",
  labelWidth = 96,
  options,
  placeholder,
  loading = false,
  disabled,
  className = "",
  id,
  ...props
}: SelectProps) {
  const selectId = id ?? props.name;
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
          <select
            id={selectId}
            disabled={disabled || loading}
            aria-invalid={Boolean(error)}
            className={[
              "w-full appearance-none rounded-[var(--radius-sm)] border bg-white font-normal text-[var(--neutral-900)] outline-none transition-colors",
              "disabled:cursor-not-allowed disabled:bg-[var(--neutral-100)] disabled:text-[var(--neutral-400)]",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--neutral-900)]",
              error
                ? "border-[var(--error-text)] focus:border-[var(--error-text)]"
                : "border-[var(--neutral-300)] hover:border-[var(--neutral-400)] focus:border-[var(--neutral-900)]",
              sizeClasses[size],
              className,
            ].join(" ")}
            {...props}
          >
            {placeholder ? <option value="">{placeholder}</option> : null}
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
          {loading ? (
            <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-[var(--neutral-500)]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
              <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          ) : (
            <CaretDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--neutral-500)]" />
          )}
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
