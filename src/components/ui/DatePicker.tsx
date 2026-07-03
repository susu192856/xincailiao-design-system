import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { CSSProperties, InputHTMLAttributes } from "react";
import { CalendarBlank, CaretLeft, CaretRight } from "@phosphor-icons/react";

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
  range?: boolean;
  rangeValue?: [string, string];
  defaultRangeValue?: [string, string];
  onRangeChange?: (value: [string, string]) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  min?: string;
  max?: string;
};

const sizeClasses: Record<DatePickerSize, string> = {
  sm: "h-[var(--control-height-sm)] pl-[var(--field-padding-x-sm)] pr-8 text-sm",
  md: "h-[var(--control-height-md)] pl-[var(--field-padding-x-md)] pr-9 text-sm",
  lg: "h-[var(--control-height-lg)] pl-[var(--field-padding-x-lg)] pr-9 text-sm",
};

function parseDate(value?: string) {
  const match = value?.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return new Date(2026, 6, 1);
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getCalendarDays(month: Date) {
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
  const mondayOffset = (firstDay.getDay() + 6) % 7;
  return Array.from({ length: 42 }, (_, index) => new Date(month.getFullYear(), month.getMonth(), index - mondayOffset + 1));
}

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
  range = false,
  rangeValue,
  defaultRangeValue,
  onRangeChange,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
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
  const containerRef = useRef<HTMLSpanElement>(null);

  // Single date state
  const [internalValue, setInternalValue] = useState(value ?? defaultValue ?? "");
  const currentValue = value !== undefined ? value : internalValue;

  // Range date state
  const [internalRange, setInternalRange] = useState<[string, string]>(defaultRangeValue ?? ["", ""]);
  const currentRange = rangeValue ?? internalRange;
  const [rangeStep, setRangeStep] = useState<"start" | "end">("start");

  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlledOpen ?? internalOpen;
  const setOpen = useCallback((next: boolean | ((previous: boolean) => boolean)) => {
    const resolved = typeof next === "function" ? next(open) : next;
    if (controlledOpen === undefined) setInternalOpen(resolved);
    onOpenChange?.(resolved);
  }, [controlledOpen, onOpenChange, open]);
  const [viewMonth, setViewMonth] = useState(() => parseDate(value ?? defaultValue));

  const handleChange = (next: string) => {
    if (value === undefined) setInternalValue(next);
    onChange?.(next);
  };

  const handleRangeChange = (date: string) => {
    if (rangeStep === "start") {
      const next: [string, string] = [date, currentRange[1] && currentRange[1] >= date ? currentRange[1] : ""];
      if (rangeValue === undefined) setInternalRange(next);
      setRangeStep("end");
      // Focus on the end date month
      setViewMonth(parseDate(date));
    } else {
      if (date < currentRange[0]) {
        // If selected end is before start, swap
        const next: [string, string] = [date, currentRange[0]];
        if (rangeValue === undefined) setInternalRange(next);
      } else {
        const next: [string, string] = [currentRange[0], date];
        if (rangeValue === undefined) setInternalRange(next);
        onRangeChange?.(next);
        setOpen(false);
      }
    }
  };

  const displayValue = range
    ? (currentRange[0] || currentRange[1] ? `${currentRange[0] || "——"} 至 ${currentRange[1] || "——"}` : "")
    : currentValue;

  useEffect(() => {
    if (!open) return;
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, [open]);

  const calendarDays = getCalendarDays(viewMonth);
  const monthLabel = `${viewMonth.getFullYear()} 年 ${viewMonth.getMonth() + 1} 月`;

  return (
    <div className={`${isHorizontal ? "block sm:flex sm:items-start sm:gap-3" : "block"} ${className}`}>
      {label ? (
        <label htmlFor={inputId} style={labelStyle} className={`block text-sm font-normal leading-[var(--type-body-m-line-height)] text-[var(--text-secondary)] ${isHorizontal ? "mb-1.5 w-full shrink-0 sm:mb-0 sm:w-[var(--date-label-width)] sm:pt-1.5 sm:text-right" : "mb-1.5"}`}>
          {props.required && isHorizontal ? <span className="mr-1 text-[var(--brand-600)]">*</span> : null}{label}{props.required && !isHorizontal ? <span className="ml-1 text-[var(--brand-600)]">*</span> : null}
        </label>
      ) : null}
      <span className={isHorizontal ? "min-w-0 flex-1" : "block"}>
      <span ref={containerRef} className="relative block">
        {range ? (
          /* Range trigger */
          <button
            type="button"
            id={inputId}
            disabled={disabled}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-invalid={Boolean(error)}
            aria-describedby={messageId}
            onFocus={() => { if (!disabled) { setViewMonth(parseDate(currentRange[rangeStep === "end" ? 1 : 0] || currentRange[0])); setOpen(true); } }}
            onClick={() => { if (!disabled) { setViewMonth(parseDate(currentRange[rangeStep === "end" ? 1 : 0] || currentRange[0])); setOpen(true); } }}
            onKeyDown={(e) => { if (e.key === "Escape") setOpen(false); }}
            className={[
              "flex w-full items-center rounded-[var(--radius-sm)] border bg-white font-normal text-[var(--text-body)] outline-none transition-colors duration-[var(--motion-duration-fast)]",
              "disabled:cursor-not-allowed disabled:bg-[var(--field-bg-disabled)] disabled:text-[var(--text-disabled)]",
              error
                ? "border-[var(--field-border-error)]"
                : disabled
                  ? "border-[var(--field-border-default)]"
                  : "border-[var(--field-border-default)] hover:border-[var(--field-border-hover)] focus:border-[var(--field-border-focus)]",
              sizeClasses[size],
              "px-3 gap-2",
            ].join(" ")}
            style={{ outline: "none" }}
          >
            <span className={["min-w-0 flex-1 text-center", !currentRange[0] ? "text-[var(--neutral-400)]" : ""].join(" ")}>
              {currentRange[0] || placeholder?.split("至")[0]?.trim() || "YYYY-MM-DD"}
            </span>
            <span className="h-px w-4 shrink-0 bg-[var(--neutral-400)]" aria-hidden="true" />
            <span className={["min-w-0 flex-1 text-center", !currentRange[1] ? "text-[var(--neutral-400)]" : ""].join(" ")}>
              {currentRange[1] || placeholder?.split("至")[1]?.trim() || "YYYY-MM-DD"}
            </span>
            <CalendarBlank aria-hidden="true" className="h-4 w-4 shrink-0 text-[var(--text-tertiary)]" />
          </button>
        ) : (
          /* Single date trigger */
          <>
            <input
              ref={inputRef}
              id={inputId}
              type="text"
              value={displayValue}
              disabled={disabled}
              placeholder={placeholder ?? "YYYY-MM-DD"}
              inputMode="numeric"
              maxLength={10}
              aria-invalid={Boolean(error)}
              aria-describedby={messageId}
              onChange={(e) => handleChange(e.target.value)}
              onFocus={() => { if (!disabled) { setViewMonth(parseDate(currentValue)); setOpen(true); } }}
              onClick={() => { if (!disabled) { setViewMonth(parseDate(currentValue)); setOpen(true); } }}
              onKeyDown={(e) => { if (e.key === "Escape") setOpen(false); }}
              className={[
                "w-full appearance-none rounded-[var(--radius-sm)] border bg-white font-normal text-[var(--text-body)] outline-none transition-colors duration-[var(--motion-duration-fast)]",
                "disabled:cursor-not-allowed disabled:bg-[var(--field-bg-disabled)] disabled:text-[var(--text-disabled)]",
                error
                  ? "border-[var(--field-border-error)]"
                  : disabled
                    ? "border-[var(--field-border-default)]"
                    : "border-[var(--field-border-default)] hover:border-[var(--field-border-hover)] focus:border-[var(--field-border-focus)]",
                sizeClasses[size],
              ].join(" ")}
              style={{ outline: "none", boxShadow: "none" }}
              {...props}
            />
            <button type="button" disabled={disabled} aria-label={label ? `打开${label}日期面板` : "打开日期面板"} aria-expanded={open} onMouseDown={(e) => e.preventDefault()} onClick={() => { setViewMonth(parseDate(currentValue)); setOpen((previous) => !previous); }} className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-[var(--radius-sm)] text-[var(--text-tertiary)] hover:bg-[var(--neutral-100)] hover:text-[var(--text-primary)] disabled:cursor-not-allowed">
              <CalendarBlank aria-hidden="true" className="h-4 w-4" />
            </button>
          </>
        )}
        {open ? (
          <div className="absolute left-0 right-0 z-[var(--z-dropdown)] mt-1 w-full rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-3 shadow-[var(--shadow-lg)]">
            {range ? (
              <div className="mb-3 text-center text-xs font-medium text-[var(--text-secondary)]">
                选择{rangeStep === "start" ? "起始" : "结束"}日期
              </div>
            ) : null}
            <div className="mb-3 flex items-center justify-between">
              <button type="button" aria-label="上个月" onClick={() => setViewMonth((previous) => new Date(previous.getFullYear(), previous.getMonth() - 1, 1))} className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)] text-[var(--text-secondary)] hover:bg-[var(--neutral-100)]"><CaretLeft size={14} /></button>
              <span className="text-sm font-medium text-[var(--text-primary)]">{monthLabel}</span>
              <button type="button" aria-label="下个月" onClick={() => setViewMonth((previous) => new Date(previous.getFullYear(), previous.getMonth() + 1, 1))} className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)] text-[var(--text-secondary)] hover:bg-[var(--neutral-100)]"><CaretRight size={14} /></button>
            </div>
            <div className="grid grid-cols-7 text-center text-xs text-[var(--text-tertiary)]">{["一", "二", "三", "四", "五", "六", "日"].map((day) => <span key={day} className="py-1">{day}</span>)}</div>
            <div className="grid grid-cols-7 gap-y-1 text-center text-xs">
              {calendarDays.map((date) => {
                const dateValue = formatDate(date);
                const inCurrentMonth = date.getMonth() === viewMonth.getMonth();
                const selected = range
                  ? dateValue === currentRange[0] || dateValue === currentRange[1]
                  : dateValue === currentValue;
                const inRange = range && currentRange[0] && currentRange[1]
                  && dateValue >= currentRange[0] && dateValue <= currentRange[1];
                const unavailable = (min ? dateValue < min : false) || (max ? dateValue > max : false);
                return <button key={dateValue} type="button" disabled={unavailable} aria-label={dateValue} aria-pressed={selected} onClick={() => { range ? handleRangeChange(dateValue) : (handleChange(dateValue), setOpen(false)); }} className={["h-7 w-7 justify-self-center rounded-[var(--radius-xs)]", selected ? "bg-[var(--neutral-900)] text-white" : inRange ? "bg-[var(--neutral-100)] text-[var(--neutral-900)]" : inCurrentMonth ? "text-[var(--text-secondary)] hover:bg-[var(--neutral-100)] hover:text-[var(--neutral-900)]" : "text-[var(--text-disabled)] hover:bg-[var(--neutral-50)]", unavailable ? "cursor-not-allowed opacity-[var(--disabled-opacity)]" : ""].join(" ")}>{date.getDate()}</button>;
              })}
            </div>
          </div>
        ) : null}
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
