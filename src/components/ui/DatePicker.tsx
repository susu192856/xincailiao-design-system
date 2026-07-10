import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { CSSProperties, InputHTMLAttributes } from "react";
import { CalendarBlank, CaretLeft, CaretRight, Clock, X } from "@phosphor-icons/react";
import { Button } from "./Button";

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
  /** 启用时间选择；日历面板下方显示时间选择条，值格式变为 "YYYY-MM-DD HH:mm" */
  showTime?: boolean;
};

const sizeClasses: Record<DatePickerSize, string> = {
  sm: "h-[var(--control-height-sm)] pl-[var(--field-padding-x-sm)] text-sm",
  md: "h-[var(--control-height-md)] pl-[var(--field-padding-x-md)] text-sm",
  lg: "h-[var(--control-height-lg)] pl-[var(--field-padding-x-lg)] text-sm",
};

function parseDate(value?: string) {
  // 支持 YYYY-MM-DD 和 YYYY-MM-DD HH:mm 两种格式
  const match = value?.match(/^(\d{4})-(\d{2})-(\d{2})(?: (\d{2}):(\d{2}))?$/);
  if (!match) return new Date();
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

function parseTimeFromValue(value?: string): string {
  const match = value?.match(/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/);
  return match ? `${match[4]}:${match[5]}` : "00:00";
}

function combineDateTime(date: string, time: string): string {
  return date && time ? `${date} ${time}` : date || time;
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
  showTime = false,
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

  // Time state (when showTime is enabled)
  const [singleTime, setSingleTime] = useState(() => parseTimeFromValue(value ?? defaultValue));
  const [pendingStartTime, setPendingStartTime] = useState("00:00");
  const [pendingEndTime, setPendingEndTime] = useState("00:00");

  // Single date state
  const [internalValue, setInternalValue] = useState(value ?? defaultValue ?? "");
  const currentValue = value !== undefined ? value : internalValue;

  // Range date state
  const [internalRange, setInternalRange] = useState<[string, string]>(defaultRangeValue ?? ["", ""]);
  const currentRange = rangeValue ?? internalRange;
  const [rangeStep, setRangeStep] = useState<"start" | "end">("start");
  const [pendingRangeDate, setPendingRangeDate] = useState(currentRange[0] ?? "");
  const [draftRangeStart, setDraftRangeStart] = useState(currentRange[0] ?? "");

  // Helper to extract date-only portion from a datetime string
  const dateOnly = (dt: string) => dt?.match(/^\d{4}-\d{2}-\d{2}/)?.[0] ?? dt;

  // Time options for the time strip
  const hourOptions = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
  const minuteOptions = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));

  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlledOpen ?? internalOpen;
  const setOpen = useCallback((next: boolean | ((previous: boolean) => boolean)) => {
    const resolved = typeof next === "function" ? next(open) : next;
    if (controlledOpen === undefined) setInternalOpen(resolved);
    onOpenChange?.(resolved);
  }, [controlledOpen, onOpenChange, open]);
  const [viewMonth, setViewMonth] = useState(() => parseDate(value ?? defaultValue));

  const handleChange = (next: string) => {
    const final = showTime ? combineDateTime(next, singleTime) : next;
    if (value === undefined) setInternalValue(final);
    onChange?.(final);
  };

  const confirmRangeDate = () => {
    if (!pendingRangeDate) return;
    if (rangeStep === "start") {
      const startDate = showTime ? combineDateTime(pendingRangeDate, pendingStartTime) : pendingRangeDate;
      const endVal = currentRange[1] && dateOnly(currentRange[1]) >= pendingRangeDate ? currentRange[1] : "";
      const next: [string, string] = [startDate, endVal];
      if (rangeValue === undefined) setInternalRange(next);
      setDraftRangeStart(pendingRangeDate);
      setRangeStep("end");
      setPendingRangeDate(endVal ? dateOnly(endVal) : "");
      if (showTime) { setPendingEndTime(endVal ? parseTimeFromValue(endVal) : "00:00"); }
      setViewMonth(parseDate(endVal || pendingRangeDate));
    } else {
      const endDate = showTime ? combineDateTime(pendingRangeDate, pendingEndTime) : pendingRangeDate;
      const startDate = showTime ? combineDateTime(draftRangeStart, pendingStartTime) : draftRangeStart;
      const next: [string, string] = pendingRangeDate < draftRangeStart
        ? [endDate, startDate]
        : [startDate, endDate];
      if (rangeValue === undefined) setInternalRange(next);
      onRangeChange?.(next);
      setRangeStep("start");
      setPendingRangeDate(dateOnly(next[0]));
      setOpen(false);
    }
  };

  const displayValue = range
    ? (currentRange[0] || currentRange[1] ? `${currentRange[0] || currentRange[1]} 至 ${currentRange[1] || currentRange[0]}` : "")
    : currentValue;

  const closePanel = useCallback(() => {
    setOpen(false);
    // 重置范围选择中间态，避免下次打开时残留旧的 step
    setRangeStep("start");
    setDraftRangeStart(currentRange[0]);
    setPendingRangeDate(currentRange[0]);
  }, [currentRange, setOpen]);

  useEffect(() => {
    if (!open) return;
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) closePanel();
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, [open, closePanel]);

  const calendarDays = getCalendarDays(viewMonth);
  const monthLabel = `${viewMonth.getFullYear()} 年 ${viewMonth.getMonth() + 1} 月`;

  const openRangePanel = () => {
    if (disabled) return;
    const activeValue = currentRange[rangeStep === "end" ? 1 : 0] || currentRange[0];
    if (rangeStep === "start") setDraftRangeStart(currentRange[0]);
    setPendingRangeDate(activeValue);
    setViewMonth(parseDate(activeValue));
    setOpen(true);
  };

  const cancelRange = () => {
    setRangeStep("start");
    setDraftRangeStart(currentRange[0]);
    setPendingRangeDate(currentRange[0]);
    setOpen(false);
  };

  const panelOpenedRef = useRef(false);

  // Hover state for icon swap: calendar/clock → X only while hovering the wrapper
  const [isHovering, setIsHovering] = useState(false);

  const handleRangeFocusOrClick = (via: "focus" | "click") => {
    if (disabled) return;
    if (via === "focus" && panelOpenedRef.current) return;
    const activeValue = currentRange[rangeStep === "end" ? 1 : 0] || currentRange[0];
    if (rangeStep === "start") setDraftRangeStart(currentRange[0]);
    setPendingRangeDate(activeValue);
    setViewMonth(parseDate(activeValue));
    setOpen(true);
    panelOpenedRef.current = true;
  };

  useEffect(() => {
    if (!open) panelOpenedRef.current = false;
  }, [open]);

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
          <div className="relative flex w-full items-center">
          <button
            type="button"
            id={inputId}
            disabled={disabled}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-invalid={Boolean(error)}
            aria-describedby={messageId}
            onFocus={() => handleRangeFocusOrClick("focus")}
            onClick={() => handleRangeFocusOrClick("click")}
            onKeyDown={(e) => { if (e.key === "Escape") closePanel(); }}
            className={[
              "flex w-full items-center rounded-[var(--radius-sm)] border bg-white font-normal outline-none transition-colors duration-[var(--motion-duration-fast)]",
              "disabled:cursor-not-allowed disabled:bg-[var(--field-bg-disabled)] disabled:text-[var(--text-disabled)]",
              error
                ? "border-[var(--field-border-error)]"
                : disabled
                  ? "border-[var(--field-border-default)]"
                  : open
                    ? "border-[var(--field-border-focus)]"
                    : "border-[var(--field-border-default)] hover:border-[var(--field-border-hover)] focus:border-[var(--field-border-focus)]",
              sizeClasses[size],
              "pr-10",
            ].join(" ")}
            style={{ outline: "none" }}
          >
            <span className={["min-w-0 flex-1 truncate px-1 text-center", currentRange[0] ? "text-[var(--text-body)]" : "text-[var(--neutral-400)]"].join(" ")}>
              {currentRange[0] || placeholder?.split("至")[0]?.trim() || "起始日期"}
            </span>
            <span className="h-px w-4 shrink-0 bg-[var(--neutral-400)]" aria-hidden="true" />
            <span className={["min-w-0 flex-1 truncate px-1 text-center", currentRange[1] ? "text-[var(--text-body)]" : "text-[var(--neutral-400)]"].join(" ")}>
              {currentRange[1] || placeholder?.split("至")[1]?.trim() || "结束日期"}
            </span>
          </button>
          {/* Keep the auxiliary action outside the trigger button to avoid nested interactive controls. */}
              <span
                className="absolute right-1.5 top-1/2 flex -translate-y-1/2 items-center"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
              {(currentRange[0] || currentRange[1]) && !disabled && isHovering ? (
                <button
                  type="button"
                  onClick={(e) => {
                    if (rangeValue === undefined) setInternalRange(["", ""]);
                    onRangeChange?.(["", ""]);
                    setRangeStep("start");
                    setPendingRangeDate("");
                    setDraftRangeStart("");
                  }}
                  aria-label={`清除${label ?? "日期范围"}`}
                  className="flex h-6 w-6 items-center justify-center rounded-[var(--radius-sm)] text-[var(--text-tertiary)] transition-colors hover:bg-[var(--neutral-100)] hover:text-[var(--text-primary)]"
                >
                  <X size={14} weight="regular" aria-hidden="true" />
                </button>
              ) : (
                <span className="flex h-6 w-6 items-center justify-center rounded-[var(--radius-sm)] text-[var(--text-tertiary)]">
                  <CalendarBlank aria-hidden="true" className="h-4 w-4" />
                </span>
              )}
              </span>
          </div>
        ) : (
          /* Single date trigger */
            <div className="relative flex w-full items-center">
            <input
              ref={inputRef}
              id={inputId}
              type="text"
              value={displayValue}
              disabled={disabled}
              placeholder={placeholder ?? "请选择日期"}
              inputMode="numeric"
              maxLength={showTime ? 16 : 10}
              aria-invalid={Boolean(error)}
              aria-describedby={messageId}
              onChange={(e) => handleChange(e.target.value)}
              onFocus={() => { if (!disabled) { setViewMonth(parseDate(currentValue)); setOpen(true); } }}
              onClick={() => { if (!disabled) { setViewMonth(parseDate(currentValue)); setOpen(true); } }}
              onKeyDown={(e) => { if (e.key === "Escape") closePanel(); }}
              className={[
                "w-full appearance-none rounded-[var(--radius-sm)] border bg-white font-normal text-[var(--text-body)] outline-none transition-colors duration-[var(--motion-duration-fast)]",
                "disabled:cursor-not-allowed disabled:bg-[var(--field-bg-disabled)] disabled:text-[var(--text-disabled)]",
                error
                  ? "border-[var(--field-border-error)]"
                  : disabled
                    ? "border-[var(--field-border-default)]"
                    : open
                      ? "border-[var(--field-border-focus)]"
                      : "border-[var(--field-border-default)] hover:border-[var(--field-border-hover)] focus:border-[var(--field-border-focus)] peer-hover:border-[var(--field-border-hover)]",
                sizeClasses[size],
                "pr-10",
              ].join(" ")}
              style={{ outline: "none", boxShadow: "none" }}
              {...props}
            />
            {/* Single icon: calendar normally, X on hover when has value */}
            <span
              className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {currentValue && !disabled && isHovering ? (
                <button
                  type="button"
                  onClick={() => { handleChange(""); }}
                  aria-label={`清除${label ?? "日期"}`}
                  className="flex h-6 w-6 items-center justify-center rounded-[var(--radius-sm)] text-[var(--text-tertiary)] transition-colors hover:bg-[var(--neutral-100)] hover:text-[var(--text-primary)]"
                >
                  <X size={14} weight="regular" aria-hidden="true" />
                </button>
              ) : (
                <button type="button" disabled={disabled} aria-label={label ? `打开${label}日期面板` : "打开日期面板"} aria-expanded={open} onMouseDown={(e) => e.preventDefault()} onClick={() => { setViewMonth(parseDate(currentValue)); setOpen((previous) => !previous); }} className="flex h-6 w-6 items-center justify-center rounded-[var(--radius-sm)] text-[var(--text-tertiary)] hover:bg-[var(--neutral-100)] hover:text-[var(--text-primary)] disabled:cursor-not-allowed">
                  <CalendarBlank aria-hidden="true" className="h-4 w-4" />
                </button>
              )}
            </span>
          </div>
        )}
        {open ? (
          <div className={`absolute z-[var(--z-dropdown)] mt-1 rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white shadow-[var(--shadow-lg)] left-0 ${showTime ? "w-[340px]" : "w-full"} p-3`}>
            {range ? (
              <div className="mb-2 text-center text-xs font-medium text-[var(--text-secondary)]">
                选择{rangeStep === "start" ? "起始" : "结束"}日期
              </div>
            ) : null}
            <div className={showTime ? "flex gap-3" : ""}>
              {/* Calendar area */}
              <div className={showTime ? "shrink-0" : ""}>
                <div className="mb-2 flex items-center justify-between">
                  <button type="button" aria-label="上个月" onClick={() => setViewMonth((previous) => new Date(previous.getFullYear(), previous.getMonth() - 1, 1))} className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)] text-[var(--text-secondary)] hover:bg-[var(--neutral-100)]"><CaretLeft size={14} /></button>
                  <span className="text-sm font-medium text-[var(--text-primary)]">{monthLabel}</span>
                  <button type="button" aria-label="下个月" onClick={() => setViewMonth((previous) => new Date(previous.getFullYear(), previous.getMonth() + 1, 1))} className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)] text-[var(--text-secondary)] hover:bg-[var(--neutral-100)]"><CaretRight size={14} /></button>
                </div>
                <div className="grid grid-cols-7 text-center text-[11px] text-[var(--text-tertiary)]">{["一", "二", "三", "四", "五", "六", "日"].map((day) => <span key={day} className="py-0.5">{day}</span>)}</div>
                <div className="grid grid-cols-7 gap-y-0.5 text-center text-[11px]">
                  {calendarDays.map((date) => {
                    const dateValue = formatDate(date);
                    const inCurrentMonth = date.getMonth() === viewMonth.getMonth();
                    const previewStart = rangeStep === "start" ? pendingRangeDate : draftRangeStart;
                    const previewEnd = rangeStep === "end" ? pendingRangeDate : currentRange[1];
                    const selected = range
                      ? dateValue === previewStart || dateValue === previewEnd
                      : dateValue === currentValue;
                    const inRange = range && previewStart && previewEnd
                      && dateValue >= previewStart && dateValue <= previewEnd;
                    const unavailable = (min ? dateValue < min : false) || (max ? dateValue > max : false);
                    const cannotSelect = unavailable || !inCurrentMonth;
                    return <button key={dateValue} type="button" disabled={unavailable} aria-label={dateValue} aria-pressed={selected} onClick={() => { if (cannotSelect) return; range ? setPendingRangeDate(dateValue) : (handleChange(dateValue), showTime ? (() => {}) : setOpen(false)); }} className={`h-[26px] w-[26px] justify-self-center rounded-[var(--radius-xs)] ${selected ? "bg-[var(--neutral-900)] text-white" : inRange ? "bg-[var(--neutral-100)] text-[var(--neutral-900)]" : inCurrentMonth ? "text-[var(--text-secondary)] hover:bg-[var(--neutral-100)] hover:text-[var(--neutral-900)]" : "text-[var(--text-disabled)] hover:bg-[var(--neutral-50)]"} ${unavailable ? "cursor-not-allowed opacity-[var(--disabled-opacity)]" : ""}`}>{date.getDate()}</button>;
                  })}
                </div>
                {/* Bottom buttons for standalone calendar */}
                {!showTime && range ? (
                  <div className="mt-2 flex items-center justify-between border-t border-[var(--neutral-200)] pt-2">
                    <Button variant="ghost" tone="neutral" size="sm" onClick={rangeStep === "end" ? () => { setRangeStep("start"); setPendingRangeDate(draftRangeStart); setViewMonth(parseDate(draftRangeStart)); } : cancelRange}>{rangeStep === "end" ? "上一步" : "取消"}</Button>
                    <Button variant="solid" tone="task" size="sm" disabled={!pendingRangeDate} onClick={confirmRangeDate}>确认{rangeStep === "start" ? "起始" : "范围"}</Button>
                  </div>
                ) : null}
              </div>
              {/* Time columns (showTime only) */}
              {showTime ? (
                <div className="flex min-w-0 flex-1 flex-col border-l border-[var(--neutral-200)] pl-3">
                  <div className="mb-1.5 flex items-center gap-1 text-[11px] font-medium text-[var(--text-secondary)]">
                    <Clock size={12} aria-hidden="true" />
                    <span>时间</span>
                  </div>
                  <div className="flex flex-1 gap-1.5">
                    {/* Hour column */}
                    <div className="flex flex-1 flex-col">
                      <div className="mb-0.5 text-center text-[10px] text-[var(--text-tertiary)]">时</div>
                      <div className="flex-1 overflow-y-auto rounded-[var(--radius-sm)] border border-[var(--neutral-200)]" style={{ maxHeight: "210px" }}>
                        {hourOptions.map((h) => {
                          const activeTime = range
                            ? (rangeStep === "start" ? pendingStartTime : pendingEndTime)
                            : singleTime;
                          const isSelected = h === activeTime.split(":")[0];
                          return (
                            <button
                              key={`h-${h}`}
                              type="button"
                              onClick={() => {
                                const newTime = `${h}:${activeTime.split(":")[1] || "00"}`;
                                if (range) {
                                  if (rangeStep === "start") setPendingStartTime(newTime); else setPendingEndTime(newTime);
                                } else {
                                  setSingleTime(newTime);
                                  handleChange(combineDateTime(dateOnly(currentValue), newTime));
                                }
                              }}
                              className={`block w-full py-1 text-center text-xs transition-colors ${
                                isSelected
                                  ? "bg-[var(--neutral-100)] text-[var(--neutral-900)]"
                                  : "text-[var(--text-secondary)] hover:bg-[var(--neutral-100)]"
                              }`}
                            >
                              {h}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    {/* Minute column */}
                    <div className="flex flex-1 flex-col">
                      <div className="mb-0.5 text-center text-[10px] text-[var(--text-tertiary)]">分</div>
                      <div className="flex-1 overflow-y-auto rounded-[var(--radius-sm)] border border-[var(--neutral-200)]" style={{ maxHeight: "210px" }}>
                        {minuteOptions.map((m) => {
                          const activeTime = range
                            ? (rangeStep === "start" ? pendingStartTime : pendingEndTime)
                            : singleTime;
                          const isSelected = m === activeTime.split(":")[1];
                          return (
                            <button
                              key={`m-${m}`}
                              type="button"
                              onClick={() => {
                                const newTime = `${activeTime.split(":")[0] || "00"}:${m}`;
                                if (range) {
                                  if (rangeStep === "start") setPendingStartTime(newTime); else setPendingEndTime(newTime);
                                } else {
                                  setSingleTime(newTime);
                                  handleChange(combineDateTime(dateOnly(currentValue), newTime));
                                }
                              }}
                              className={`block w-full py-1 text-center text-xs transition-colors ${
                                isSelected
                                  ? "bg-[var(--neutral-100)] text-[var(--neutral-900)]"
                                  : "text-[var(--text-secondary)] hover:bg-[var(--neutral-100)]"
                              }`}
                            >
                              {m}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            {/* Shared bottom bar for showTime mode */}
            {showTime ? (
              <div className={`mt-2 flex items-center border-t border-[var(--neutral-200)] pt-2 ${range ? "justify-between" : "justify-end"}`}>
                {range ? (
                  <button type="button" onClick={rangeStep === "end" ? () => { setRangeStep("start"); setPendingRangeDate(draftRangeStart); setViewMonth(parseDate(draftRangeStart)); } : cancelRange} className="rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white px-3 py-1.5 text-xs text-[var(--text-secondary)] hover:border-[var(--neutral-400)] hover:text-[var(--text-primary)]">{rangeStep === "end" ? "上一步" : "取消"}</button>
                ) : null}
                <Button variant="solid" tone="task" size="sm" disabled={range ? !pendingRangeDate : false} onClick={range ? confirmRangeDate : () => setOpen(false)}>确认{range && rangeStep === "start" ? "起始" : ""}</Button>
              </div>
            ) : null}
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
