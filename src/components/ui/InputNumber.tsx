import { Minus, Plus } from "@phosphor-icons/react";
import { useId, useState, type ChangeEvent, type InputHTMLAttributes } from "react";

type InputNumberSize = "sm" | "md" | "lg";

export type InputNumberProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> & {
  label?: string;
  helperText?: string;
  error?: string;
  size?: InputNumberSize;
  suffix?: string;
  onValueChange?: (value: number | "") => void;
};

const sizeClasses: Record<InputNumberSize, string> = {
  sm: "h-11 text-sm md:h-[var(--control-height-sm)]",
  md: "h-11 text-sm md:h-[var(--control-height-md)]",
  lg: "h-11 text-sm md:h-[var(--control-height-lg)]",
};

const decimalPlaces = (value: number) => (String(value).split(".")[1] ?? "").length;

export function InputNumber({
  label,
  helperText,
  error,
  size = "md",
  suffix,
  min,
  max,
  step = 1,
  disabled,
  readOnly,
  id,
  value,
  defaultValue,
  onChange,
  onValueChange,
  className = "",
  ...props
}: InputNumberProps) {
  const generatedId = useId();
  const inputId = id ?? props.name ?? generatedId;
  const messageId = `${inputId}-message`;
  const [internalValue, setInternalValue] = useState<number | "">(defaultValue === undefined || defaultValue === "" ? "" : Number(defaultValue));
  const currentValue = value === undefined ? internalValue : value === "" ? "" : Number(value);
  const numericStep = Number(step) || 1;
  const minValue = min === undefined ? undefined : Number(min);
  const maxValue = max === undefined ? undefined : Number(max);

  const commit = (next: number | "") => {
    if (value === undefined) setInternalValue(next);
    onValueChange?.(next);
  };

  const adjust = (direction: -1 | 1) => {
    const base = currentValue === "" || Number.isNaN(Number(currentValue)) ? (minValue ?? 0) : Number(currentValue);
    const precision = Math.max(decimalPlaces(base), decimalPlaces(numericStep));
    let next = Number((base + direction * numericStep).toFixed(precision));
    if (minValue !== undefined) next = Math.max(minValue, next);
    if (maxValue !== undefined) next = Math.min(maxValue, next);
    commit(next);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    commit(event.target.value === "" ? "" : Number(event.target.value));
    onChange?.(event);
  };

  const atMin = currentValue !== "" && minValue !== undefined && Number(currentValue) <= minValue;
  const atMax = currentValue !== "" && maxValue !== undefined && Number(currentValue) >= maxValue;

  return (
    <div className="block w-full max-w-[220px]">
      {label ? <label htmlFor={inputId} className="mb-1.5 block text-sm font-normal text-[var(--text-secondary)]">{label}</label> : null}
      <div className={`field-single-border-focus flex overflow-hidden rounded-[var(--radius-sm)] border bg-white transition-colors ${error ? "border-[var(--field-border-error)]" : "border-[var(--field-border-default)] hover:border-[var(--field-border-hover)] focus-within:border-[var(--field-border-focus)]"} ${disabled ? "bg-[var(--neutral-100)]" : ""} ${sizeClasses[size]}`}>
        <button type="button" aria-label={`减少${label ?? "数值"}`} disabled={disabled || readOnly || atMin} onClick={() => adjust(-1)} className="flex w-8 shrink-0 items-center justify-center border-r border-[var(--neutral-200)] text-[var(--text-secondary)] hover:bg-[var(--neutral-50)] disabled:cursor-not-allowed disabled:text-[var(--neutral-300)]"><Minus size={16} weight="regular" aria-hidden="true" /></button>
        <input
          {...props}
          id={inputId}
          type="number"
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          readOnly={readOnly}
          value={currentValue}
          onChange={handleChange}
          aria-invalid={Boolean(error)}
          aria-describedby={error || helperText ? messageId : undefined}
          className={`input-number-field min-w-0 flex-1 bg-transparent px-2 text-center font-normal text-[var(--text-primary)] outline-none placeholder:text-[var(--neutral-400)] disabled:cursor-not-allowed disabled:text-[var(--neutral-400)] ${className}`}
        />
        {suffix ? <span className="flex shrink-0 items-center px-1 text-xs text-[var(--text-tertiary)]">{suffix}</span> : null}
        <button type="button" aria-label={`增加${label ?? "数值"}`} disabled={disabled || readOnly || atMax} onClick={() => adjust(1)} className="flex w-8 shrink-0 items-center justify-center border-l border-[var(--neutral-200)] text-[var(--text-secondary)] hover:bg-[var(--neutral-50)] disabled:cursor-not-allowed disabled:text-[var(--neutral-300)]"><Plus size={16} weight="regular" aria-hidden="true" /></button>
      </div>
      {error || helperText ? <span id={messageId} className={`mt-1.5 block text-xs ${error ? "text-[var(--error-text)]" : "text-[var(--text-tertiary)]"}`}>{error ?? helperText}</span> : null}
    </div>
  );
}
