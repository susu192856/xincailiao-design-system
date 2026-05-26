import type { SelectHTMLAttributes } from "react";
import { CaretDown } from "@phosphor-icons/react";

type SelectSize = "sm" | "md" | "lg";

type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> & {
  label?: string;
  helperText?: string;
  error?: string;
  size?: SelectSize;
  options: SelectOption[];
  placeholder?: string;
};

const sizeClasses: Record<SelectSize, string> = {
  sm: "h-8 pl-3 pr-9 text-sm",
  md: "h-9 pl-3 pr-9 text-sm",
  lg: "h-10 pl-4 pr-10 text-base",
};

export function Select({
  label,
  helperText,
  error,
  size = "md",
  options,
  placeholder,
  disabled,
  className = "",
  id,
  ...props
}: SelectProps) {
  const selectId = id ?? props.name;

  return (
    <label className="block">
      {label ? (
        <span className="mb-1.5 block text-sm font-medium text-[var(--neutral-900)]">{label}</span>
      ) : null}
      <span className="relative block">
        <select
          id={selectId}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          className={[
            "w-full appearance-none rounded-[var(--radius-sm)] border bg-white text-[var(--neutral-900)] outline-none transition-colors",
            "disabled:cursor-not-allowed disabled:bg-[var(--neutral-100)] disabled:text-[var(--neutral-400)]",
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
        <CaretDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--neutral-500)]" />
      </span>
      {error || helperText ? (
        <span className={`mt-1.5 block text-xs ${error ? "text-[var(--error-text)]" : "text-[var(--neutral-500)]"}`}>
          {error ?? helperText}
        </span>
      ) : null}
    </label>
  );
}
