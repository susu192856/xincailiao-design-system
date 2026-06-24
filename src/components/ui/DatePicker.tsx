import { useId, useRef, useState } from "react";
import type { InputHTMLAttributes } from "react";
import { Calendar, X } from "@phosphor-icons/react";

type DatePickerSize = "sm" | "md" | "lg";

export type DatePickerProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size" | "value" | "onChange"> & {
  label?: string;
  helperText?: string;
  error?: string;
  size?: DatePickerSize;
  value?: string;
  onChange?: (value: string) => void;
  clearable?: boolean;
  min?: string;
  max?: string;
};

const sizeClasses: Record<DatePickerSize, string> = {
  sm: "h-[var(--control-height-sm)] pl-[var(--field-padding-x-sm)] pr-8 text-xs",
  md: "h-[var(--control-height-md)] pl-[var(--field-padding-x-md)] pr-9 text-sm",
  lg: "h-[var(--control-height-lg)] pl-[var(--field-padding-x-lg)] pr-9 text-sm",
};

export function DatePicker({
  label,
  helperText,
  error,
  size = "md",
  value,
  onChange,
  clearable = true,
  disabled,
  className = "",
  id,
  min,
  max,
  placeholder,
  ...props
}: DatePickerProps) {
  const generatedId = useId();
  const inputId = id ?? `datepicker-${generatedId}`;
  const messageId = error || helperText ? `${inputId}-message` : undefined;
  const inputRef = useRef<HTMLInputElement>(null);

  const [internalValue, setInternalValue] = useState(value ?? "");
  const currentValue = value !== undefined ? value : internalValue;

  const handleChange = (next: string) => {
    if (value === undefined) setInternalValue(next);
    onChange?.(next);
  };

  return (
    <div className={className}>
      {label ? (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium leading-[var(--type-body-m-line-height)] text-[var(--text-primary)]">
          {label}
        </label>
      ) : null}
      <span className="relative block">
        <input
          ref={inputRef}
          id={inputId}
          type="date"
          value={currentValue}
          min={min}
          max={max}
          disabled={disabled}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={messageId}
          onChange={(e) => handleChange(e.target.value)}
          className={[
            "w-full appearance-none rounded-[var(--radius-sm)] border bg-white font-normal text-[var(--text-body)] outline-none transition-colors duration-[var(--motion-duration-fast)]",
            "disabled:cursor-not-allowed disabled:bg-[var(--field-bg-disabled)] disabled:text-[var(--text-disabled)]",
            "focus-visible:outline focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-offset-[var(--focus-ring-offset)] focus-visible:outline-[var(--focus-ring-color)]",
            "[&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer",
            error
              ? "border-[var(--field-border-error)]"
              : "border-[var(--field-border-default)] hover:border-[var(--field-border-hover)] focus:border-[var(--field-border-focus)]",
            sizeClasses[size],
          ].join(" ")}
          {...props}
        />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {clearable && currentValue && !disabled ? (
            <button
              type="button"
              tabIndex={-1}
              aria-label="清除日期"
              onClick={(e) => {
                e.stopPropagation();
                handleChange("");
                inputRef.current?.focus();
              }}
              className="pointer-events-auto flex h-4 w-4 items-center justify-center rounded-sm text-[var(--text-tertiary)] hover:text-[var(--text-body)]"
            >
              <X size={12} weight="bold" />
            </button>
          ) : null}
          <Calendar className="h-4 w-4 text-[var(--text-tertiary)]" />
        </span>
      </span>
      {error || helperText ? (
        <span id={messageId} className={`mt-1.5 block text-xs leading-[var(--type-caption-line-height)] ${error ? "text-[var(--error-text)]" : "text-[var(--text-tertiary)]"}`}>
          {error ?? helperText}
        </span>
      ) : null}
    </div>
  );
}
