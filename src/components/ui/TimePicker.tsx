import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { CSSProperties, InputHTMLAttributes } from "react";
import { Clock, X } from "@phosphor-icons/react";

type TimePickerSize = "sm" | "md" | "lg";
type LabelPosition = "top" | "left";
type TimeFormat = "24h" | "12h";

export type TimePickerProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size" | "value" | "onChange"> & {
  label?: string;
  helperText?: string;
  error?: string;
  size?: TimePickerSize;
  labelPosition?: LabelPosition;
  labelWidth?: number | string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** 显示制式，仅影响触发器和下拉的文案展示；内部始终以 HH:mm 格式存储和回调 */
  format?: TimeFormat;
  /** 分钟步长，默认每分钟可选（1），常用 5/10/15/30 */
  step?: number;
  placeholder?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  min?: string;
  max?: string;
};

const sizeClasses: Record<TimePickerSize, string> = {
  sm: "h-[var(--control-height-sm)] pl-[var(--field-padding-x-sm)] text-sm",
  md: "h-[var(--control-height-md)] pl-[var(--field-padding-x-md)] text-sm",
  lg: "h-[var(--control-height-lg)] pl-[var(--field-padding-x-lg)] text-sm",
};

/** HH:mm → 12h 显示 */
function toDisplay12h(time24: string): string {
  const match = time24.match(/^(\d{2}):(\d{2})$/);
  if (!match) return time24;
  const hours = Number(match[1]);
  const minutes = match[2];
  if (hours === 0) return `12:${minutes} AM`;
  if (hours < 12) return `${String(hours).padStart(2, "0")}:${minutes} AM`;
  if (hours === 12) return `12:${minutes} PM`;
  return `${String(hours - 12).padStart(2, "0")}:${minutes} PM`;
}

/** 12h format hour options */
function getHours12h(): string[] {
  return ["12", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"];
}

/** 24h format hour options */
function getHours24h(): string[] {
  return Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
}

/** 根据当前值推断 AM/PM */
function getAmPm(time24: string): "AM" | "PM" {
  const hour = parseInt(time24?.split(":")[0] ?? "0", 10);
  return hour < 12 ? "AM" : "PM";
}

/** 12h → 24h 小时数 */
function hour12to24(hour12: string, ampm: "AM" | "PM"): number {
  const h = parseInt(hour12, 10);
  if (h === 12 && ampm === "AM") return 0;
  if (h === 12 && ampm === "PM") return 12;
  if (ampm === "PM") return h + 12;
  return h;
}

/** 24h → 12h 小时数（字符串） */
function hour24to12(hour24: number): string {
  if (hour24 === 0) return "12";
  if (hour24 > 12) return String(hour24 - 12).padStart(2, "0");
  return String(hour24).padStart(2, "0");
}

/** 验证 HH:mm 是否在 min/max 之间 */
function isTimeInRange(time: string, min?: string, max?: string): boolean {
  if (min && time < min) return false;
  if (max && time > max) return false;
  return true;
}

export function TimePicker({
  label,
  helperText,
  error,
  size = "md",
  labelPosition = "top",
  labelWidth = 96,
  value: controlledValue,
  defaultValue,
  onChange,
  format = "24h",
  step = 1,
  placeholder,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  disabled,
  className = "",
  id,
  min,
  max,
  ...props
}: TimePickerProps) {
  const generatedId = useId();
  const inputId = id ?? `timepicker-${generatedId}`;
  const messageId = error || helperText ? `${inputId}-message` : undefined;
  const accessibleLabel = props["aria-label"] ?? label ?? "时间";
  const isHorizontal = labelPosition === "left";
  const labelStyle = isHorizontal
    ? ({ "--time-label-width": typeof labelWidth === "number" ? `${labelWidth}px` : labelWidth } as CSSProperties)
    : undefined;
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLSpanElement>(null);
  const hourColRef = useRef<HTMLDivElement>(null);
  const minuteColRef = useRef<HTMLDivElement>(null);
  const safeStep = Math.max(1, Math.min(60, Math.floor(step)));
  const [isHovering, setIsHovering] = useState(false);

  const is12h = format === "12h";
  const hourOptions = is12h ? getHours12h() : getHours24h();
  const minuteOptions = Array.from({ length: Math.ceil(60 / safeStep) }, (_, i) => String(i * safeStep).padStart(2, "0"));
  const displayFn = is12h ? toDisplay12h : (v: string) => v;

  // Controlled / uncontrolled value
  const [internalValue, setInternalValue] = useState(controlledValue ?? defaultValue ?? "");
  const currentValue = controlledValue !== undefined ? controlledValue : internalValue;
  const [ampm, setAmPm] = useState<"AM" | "PM">(() => getAmPm(currentValue || "00:00"));

  const buildTime = (hour: string, minute: string, ap: "AM" | "PM"): string => {
    const h24 = is12h ? hour12to24(hour, ap) : parseInt(hour, 10);
    return `${String(h24).padStart(2, "0")}:${minute}`;
  };

  const currentHour24 = parseInt(currentValue?.split(":")[0] ?? "0", 10);
  const currentMinute = currentValue?.split(":")[1] ?? "00";
  const displayHour = is12h ? hour24to12(currentHour24) : String(currentHour24).padStart(2, "0");

  const handleChange = useCallback((next: string) => {
    if (controlledValue === undefined) setInternalValue(next);
    onChange?.(next);
  }, [controlledValue, onChange]);

  const selectHour = (hour: string) => {
    const time = buildTime(hour, currentMinute, ampm);
    handleChange(time);
  };

  const selectMinute = (minute: string) => {
    const time = buildTime(displayHour, minute, ampm);
    handleChange(time);
    setOpen(false);
  };

  const toggleAmPm = (ap: "AM" | "PM") => {
    setAmPm(ap);
    const time = buildTime(displayHour, currentMinute, ap);
    handleChange(time);
  };

  // Controlled / uncontrolled open
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlledOpen ?? internalOpen;
  const setOpen = useCallback((next: boolean | ((prev: boolean) => boolean)) => {
    const resolved = typeof next === "function" ? next(open) : next;
    if (controlledOpen === undefined) setInternalOpen(resolved);
    onOpenChange?.(resolved);
  }, [controlledOpen, onOpenChange, open]);

  // Click-outside close
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, setOpen]);

  // Scroll selected into view when opening
  useEffect(() => {
    if (!open) return;

    const centerSelectedOption = (column: HTMLDivElement | null) => {
      if (!column) return;
      const selected = column.querySelector("[aria-pressed='true']") as HTMLElement | null;
      if (!selected) return;
      column.scrollTop = Math.max(0, selected.offsetTop - (column.clientHeight - selected.offsetHeight) / 2);
    };

    centerSelectedOption(hourColRef.current);
    centerSelectedOption(minuteColRef.current);
  }, [open]);

  const handleInputBlur = () => {
    const raw = inputRef.current?.value ?? "";
    const cleaned = raw.trim();
    if (/^\d{2}:\d{2}$/.test(cleaned)) {
      const [h, m] = cleaned.split(":").map(Number);
      if (h >= 0 && h <= 23 && m >= 0 && m <= 59) {
        if (isTimeInRange(cleaned, min, max)) {
          handleChange(cleaned);
          return;
        }
      }
    }
    if (inputRef.current) inputRef.current.value = displayFn(currentValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { setOpen(false); return; }
    if (e.key === " " || e.key === "Enter") {
      if (!open) { e.preventDefault(); setOpen(true); }
    }
  };

  const displayValue = currentValue ? displayFn(currentValue) : "";

  return (
    <div className={`${isHorizontal ? "block sm:flex sm:items-start sm:gap-3" : "block"} ${className}`}>
      {label ? (
        <label
          htmlFor={inputId}
          style={labelStyle}
          className={`block text-sm font-normal leading-[var(--type-body-m-line-height)] text-[var(--text-secondary)] ${isHorizontal ? "mb-1.5 w-full shrink-0 sm:mb-0 sm:w-[var(--time-label-width)] sm:pt-1.5 sm:text-right" : "mb-1.5"}`}
        >
          {props.required && isHorizontal ? <span className="mr-1 text-[var(--brand-600)]">*</span> : null}
          {label}
          {props.required && !isHorizontal ? <span className="ml-1 text-[var(--brand-600)]">*</span> : null}
        </label>
      ) : null}
      <span className={isHorizontal ? "min-w-0 flex-1" : "block"}>
        <span ref={containerRef} className="relative block">
          <div className="relative flex w-full items-center">
            <input
              ref={inputRef}
              id={inputId}
              type="text"
              {...props}
              value={displayValue}
              disabled={disabled}
              placeholder={placeholder ?? "请选择时间"}
              aria-label={accessibleLabel}
              readOnly={false}
              aria-invalid={Boolean(error)}
              aria-describedby={messageId}
              onFocus={() => { if (!disabled) { setOpen(true); } }}
              onClick={() => { if (!disabled && !open) setOpen(true); }}
              onBlur={handleInputBlur}
              onKeyDown={handleKeyDown}
              onChange={(e) => {
                if (inputRef.current) inputRef.current.value = e.target.value;
              }}
              className={[
                "w-full appearance-none rounded-[var(--radius-sm)] border bg-white font-normal text-[var(--text-body)] outline-none transition-colors duration-[var(--motion-duration-fast)]",
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
              style={{ outline: "none", boxShadow: "none" }}
            />
            {/* Icon: clock normally, X on hover when has value */}
            <span
              className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {currentValue && !disabled && isHovering ? (
                <button
                  type="button"
                  onClick={() => { handleChange(""); }}
                  aria-label={`清除${label ?? "时间"}`}
                  className="flex h-6 w-6 items-center justify-center rounded-[var(--radius-sm)] text-[var(--text-tertiary)] transition-colors hover:bg-[var(--neutral-100)] hover:text-[var(--text-primary)]"
                >
                  <X size={14} weight="regular" aria-hidden="true" />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={disabled}
                  aria-label={label ? `打开${label}时间面板` : "打开时间面板"}
                  aria-expanded={open}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => { if (!disabled) setOpen((prev) => !prev); }}
                  className="flex h-6 w-6 items-center justify-center rounded-[var(--radius-sm)] text-[var(--text-tertiary)] hover:bg-[var(--neutral-100)] hover:text-[var(--text-primary)] disabled:cursor-not-allowed"
                >
                  <Clock aria-hidden="true" className="h-4 w-4" />
                </button>
              )}
            </span>
          </div>
          {open ? (
            <div className="absolute z-[var(--z-dropdown)] mt-1 w-[180px] overflow-hidden rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-2 shadow-[var(--shadow-lg)] animate-scale-in origin-top left-0">
              <div className="flex gap-2">
                {/* Hour column */}
                <div className="flex-1">
                  <div className="mb-1 text-center text-[11px] font-medium text-[var(--text-tertiary)]">时</div>
                  <div ref={hourColRef} className="max-h-48 overflow-y-auto rounded-[var(--radius-sm)]">
                    {hourOptions.map((h) => {
                      const isSel = h === displayHour;
                      const time = buildTime(h, currentMinute, ampm);
                      const inRange = isTimeInRange(time, min, max);
                      return (
                        <button
                          key={`h-${h}`}
                          type="button"
                          disabled={!inRange}
                          aria-pressed={isSel}
                          onClick={() => { if (inRange) selectHour(h); }}
                          className={`block w-full py-1.5 text-center text-sm transition-colors ${
                            !inRange
                              ? "cursor-not-allowed text-[var(--text-disabled)] opacity-[var(--disabled-opacity)]"
                              : isSel
                                ? "bg-[var(--neutral-100)] text-[var(--neutral-900)] rounded-[var(--radius-sm)]"
                                : "text-[var(--text-body)] hover:bg-[var(--neutral-100)] hover:text-[var(--neutral-900)] rounded-[var(--radius-sm)]"
                          }`}
                        >
                          {h}
                        </button>
                      );
                    })}
                  </div>
                </div>
                {/* Minute column */}
                <div className="flex-1">
                  <div className="mb-1 text-center text-[11px] font-medium text-[var(--text-tertiary)]">分</div>
                  <div ref={minuteColRef} className="max-h-48 overflow-y-auto rounded-[var(--radius-sm)]">
                    {minuteOptions.map((m) => {
                      const isSel = m === currentMinute;
                      const time = buildTime(displayHour, m, ampm);
                      const inRange = isTimeInRange(time, min, max);
                      return (
                        <button
                          key={`m-${m}`}
                          type="button"
                          disabled={!inRange}
                          aria-pressed={isSel}
                          onClick={() => { if (inRange) selectMinute(m); }}
                          className={`block w-full py-1.5 text-center text-sm transition-colors ${
                            !inRange
                              ? "cursor-not-allowed text-[var(--text-disabled)] opacity-[var(--disabled-opacity)]"
                              : isSel
                                ? "bg-[var(--neutral-100)] text-[var(--neutral-900)] rounded-[var(--radius-sm)]"
                                : "text-[var(--text-body)] hover:bg-[var(--neutral-100)] hover:text-[var(--neutral-900)] rounded-[var(--radius-sm)]"
                          }`}
                        >
                          {m}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              {is12h ? (
                <div className="mt-2 flex gap-1 border-t border-[var(--neutral-200)] pt-2">
                  {(["AM", "PM"] as const).map((ap) => (
                    <button
                      key={ap}
                      type="button"
                      onClick={() => toggleAmPm(ap)}
                      className={`flex-1 rounded-[var(--radius-sm)] py-1 text-center text-xs font-medium transition-colors ${
                        ampm === ap
                          ? "bg-[var(--neutral-900)] text-white"
                          : "text-[var(--text-secondary)] hover:bg-[var(--neutral-100)]"
                      }`}
                    >
                      {ap}
                    </button>
                  ))}
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
