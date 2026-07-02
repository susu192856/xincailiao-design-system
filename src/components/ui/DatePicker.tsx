import { useId, useRef, useState } from "react";
import type { CSSProperties, InputHTMLAttributes } from "react";
import { CalendarBlank, X } from "@phosphor-icons/react";

type DatePickerSize = "sm" | "md" | "lg";
type LabelPosition = "top" | "left";

export type DatePickerProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size" | "value" | "onChange"> & {
  label?: string;
  helperText?: string;
  error?: string;
  size?: DatePickerSize;
  labelPosition?: LabelPosition;
  labelWidth?: number | string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  clearable?: boolean;
  min?: string;
  max?: string;
};

const sizeClasses: Record<DatePickerSize, string> = {
  sm: "h-[var(--control-height-sm)] pl-[var(--field-padding-x-sm)] pr-8 text-sm",
  md: "h-[var(--control-height-md)] pl-[var(--field-padding-x-md)] pr-9 text-sm",
  lg: "h-[var(--control-height-lg)] pl-[var(--field-padding-x-lg)] pr-9 text-sm",
};

export function DatePicker({
  label,
  helperText,
  error,
  size = "md",
  labelPosition = "top",
  labelWidth = 96,
  value,
  defaultValue,
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
  const isHorizontal = labelPosition === "left";
  const labelStyle = isHorizontal ? ({ "--date-label-width": typeof labelWidth === "number" ? `${labelWidth}px` : labelWidth } as CSSProperties) : undefined;
  const inputRef = useRef<HTMLInputElement>(null);

  const [internalValue, setInternalValue] = useState(value ?? defaultValue ?? "");
  const currentValue = value !== undefined ? value : internalValue;

  const handleChange = (next: string) => {
    if (value === undefined) setInternalValue(next);
    onChange?.(next);
  };

  return (
    <div className={`${isHorizontal ? "block sm:flex sm:items-start sm:gap-3" : "block"} ${className}`}>
      {label ? (
        <label htmlFor={inputId} style={labelStyle} className={`block text-sm font-normal leading-[var(--type-body-m-line-height)] text-[var(--text-secondary)] ${isHorizontal ? "mb-1.5 w-full shrink-0 sm:mb-0 sm:w-[var(--date-label-width)] sm:pt-1.5 sm:text-right" : "mb-1.5"}`}>
          {props.required && isHorizontal ? <span className="mr-1 text-[var(--brand-600)]">*</span> : null}{label}{props.required && !isHorizontal ? <span className="ml-1 text-[var(--brand-600)]">*</span> : null}
        </label>
      ) : null}
      <span className={isHorizontal ? "min-w-0 flex-1" : "block"}>
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
              : disabled
                ? "border-[var(--field-border-default)]"
                : "border-[var(--field-border-default)] hover:border-[var(--field-border-hover)] focus:border-[var(--field-border-focus)]",
            sizeClasses[size],
          ].join(" ")}
          {...props}
        />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {clearable && currentValue && !disabled ? (
            <button
              type="button"
              aria-label="清除日期"
              onClick={(e) => {
                e.stopPropagation();
                handleChange("");
                inputRef.current?.focus();
              }}
              className="pointer-events-auto flex h-4 w-4 items-center justify-center rounded-sm text-[var(--text-tertiary)] hover:text-[var(--text-body)]"
            >
              <X size={16} weight="regular" aria-hidden="true" />
            </button>
          ) : null}
          <CalendarBlank aria-hidden="true" className="h-4 w-4 text-[var(--text-tertiary)]" />
        </span>
      </span>
      {error || helperText ? (
        <span id={messageId} className={`mt-1.5 block text-xs leading-[var(--type-caption-line-height)] ${error ? "text-[var(--error-text)]" : "text-[var(--text-tertiary)]"}`}>
          {error ?? helperText}
        </span>
      ) : null}
      </span>
    </div>
  );
}
