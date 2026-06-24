import { useId, useRef, useState, useEffect, useCallback } from "react";
import type { CSSProperties, KeyboardEvent, ReactNode, SelectHTMLAttributes } from "react";
import { CaretDown, Check, MagnifyingGlass, X } from "@phosphor-icons/react";

type SelectSize = "sm" | "md" | "lg";
type LabelPosition = "top" | "left";

type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "size" | "value" | "onChange"> & {
  label?: string;
  helperText?: string;
  error?: string;
  size?: SelectSize;
  labelPosition?: LabelPosition;
  labelWidth?: number | string;
  options: SelectOption[];
  placeholder?: string;
  loading?: boolean;
  searchable?: boolean;
  multiple?: boolean;
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;
  renderTag?: (option: SelectOption, onRemove: () => void) => ReactNode;
};

const sizeClasses: Record<SelectSize, string> = {
  sm: "h-[var(--control-height-sm)] min-h-11 sm:min-h-0 text-[length:var(--type-body-m-size)]",
  md: "h-[var(--control-height-md)] min-h-11 sm:min-h-0 text-[length:var(--type-body-m-size)]",
  lg: "h-[var(--control-height-lg)] min-h-11 sm:min-h-0 text-[length:var(--type-body-m-size)]",
};

const sizePadding: Record<SelectSize, string> = {
  sm: "pl-[var(--field-padding-x-sm)] pr-8",
  md: "pl-[var(--field-padding-x-md)] pr-9",
  lg: "pl-[var(--field-padding-x-lg)] pr-9",
};

function getSelectedLabels(options: SelectOption[], values: string[]): string {
  return values
    .map((v) => options.find((o) => o.value === v)?.label ?? v)
    .join(", ");
}

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
  searchable = false,
  multiple = false,
  value: controlledValue,
  defaultValue,
  onChange,
  renderTag,
  disabled,
  className = "",
  id,
  required,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? props.name ?? `select-${generatedId}`;
  const messageId = error || helperText ? `${selectId}-message` : undefined;
  const isHorizontal = labelPosition === "left";
  const labelStyle = isHorizontal
    ? ({ "--select-label-width": typeof labelWidth === "number" ? `${labelWidth}px` : labelWidth } as CSSProperties)
    : undefined;
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [focusIdx, setFocusIdx] = useState(-1);

  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<string | string[]>(
    defaultValue ?? (multiple ? [] : "")
  );
  const currentValue = isControlled ? controlledValue : internalValue;
  const valuesArr = Array.isArray(currentValue) ? currentValue : currentValue ? [currentValue] : [];

  const needsCustom = searchable || multiple;

  const filteredOptions = searchable && search
    ? options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()))
    : options;

  const setValue = useCallback(
    (next: string | string[]) => {
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    },
    [isControlled, onChange]
  );

  const selectOption = useCallback(
    (val: string) => {
      if (multiple) {
        const arr = valuesArr.includes(val)
          ? valuesArr.filter((v) => v !== val)
          : [...valuesArr, val];
        setValue(arr);
        setFocusIdx(filteredOptions.findIndex((o) => o.value === val));
      } else {
        setValue(val);
        setOpen(false);
      }
      setSearch("");
    },
    [multiple, valuesArr, setValue, filteredOptions]
  );

  const removeValue = useCallback(
    (val: string) => {
      if (multiple) {
        setValue(valuesArr.filter((v) => v !== val));
      } else {
        setValue("");
      }
    },
    [multiple, valuesArr, setValue]
  );

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Focus search input when opened
  useEffect(() => {
    if (open && searchable) {
      requestAnimationFrame(() => searchInputRef.current?.focus());
    }
  }, [open, searchable]);

  // Keyboard navigation
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") { setOpen(false); setSearch(""); return; }
    if (!open) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusIdx((prev) => Math.min(prev + 1, filteredOptions.length - 1));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusIdx((prev) => Math.max(prev - 1, 0));
      return;
    }
    if (e.key === "Enter" && focusIdx >= 0 && focusIdx < filteredOptions.length) {
      e.preventDefault();
      const opt = filteredOptions[focusIdx];
      if (!opt.disabled) selectOption(opt.value);
      return;
    }
  };

  const triggerText = multiple
    ? valuesArr.length === 0
      ? placeholder ?? ""
      : `已选 ${valuesArr.length} 项`
    : currentValue
      ? options.find((o) => o.value === currentValue)?.label ?? String(currentValue)
      : placeholder ?? "";

  const triggerEmpty = multiple ? valuesArr.length === 0 : !currentValue;

  // Render the trigger
  const trigger = (
    <button
      type="button"
      id={selectId}
      disabled={disabled || loading}
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-describedby={messageId}
      onClick={() => !disabled && !loading && setOpen((prev) => !prev)}
      onKeyDown={handleKeyDown}
      className={[
        "relative flex w-full items-center rounded-[var(--radius-sm)] border bg-white font-normal outline-none transition-colors duration-[var(--motion-duration-fast)]",
        "disabled:cursor-not-allowed disabled:bg-[var(--field-bg-disabled)] disabled:text-[var(--text-disabled)]",
        "focus-visible:outline focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-offset-[var(--focus-ring-offset)] focus-visible:outline-[var(--focus-ring-color)]",
        error
          ? "border-[var(--field-border-error)]"
          : open
            ? "border-[var(--field-border-focus)]"
            : "border-[var(--field-border-default)] hover:border-[var(--field-border-hover)]",
        sizeClasses[size],
        sizePadding[size],
        needsCustom ? "text-left" : "",
        className,
      ].join(" ")}
    >
      {multiple && valuesArr.length > 0 ? (
        <span className="flex flex-wrap gap-1 mr-2 min-w-0">
          {valuesArr.map((v) => {
            const opt = options.find((o) => o.value === v);
            return renderTag ? (
              renderTag(opt ?? { label: v, value: v }, () => removeValue(v))
            ) : (
              <span
                key={v}
                className="inline-flex items-center gap-1 rounded-sm bg-[var(--neutral-100)] px-1.5 py-0.5 text-xs text-[var(--neutral-700)]"
              >
                {opt?.label ?? v}
                <span
                  role="button"
                  tabIndex={-1}
                  aria-label={`移除 ${opt?.label ?? v}`}
                  onClick={(e) => { e.stopPropagation(); removeValue(v); }}
                  className="inline-flex h-3 w-3 items-center justify-center rounded-sm hover:bg-[var(--neutral-300)]"
                >
                  <X size={10} weight="bold" />
                </span>
              </span>
            );
          })}
        </span>
      ) : (
        <span className={["block truncate", triggerEmpty ? "text-[var(--text-tertiary)]" : "text-[var(--text-body)]"].join(" ")}>
          {triggerText}
        </span>
      )}
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
        {loading ? (
          <svg className="h-4 w-4 animate-spin text-[var(--text-tertiary)]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
            <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        ) : (
          <CaretDown className={["h-4 w-4 text-[var(--text-tertiary)] transition-transform", open ? "rotate-180" : ""].join(" ")} />
        )}
      </span>
    </button>
  );

  // If we don't need custom dropdown, render native select for simpler use cases
  if (!needsCustom) {
    return (
      <label className={isHorizontal ? "flex flex-col gap-1.5 sm:flex-row sm:items-start sm:gap-3" : "block"}>
        {label ? (
          <span
            className={[
              "block text-sm font-medium leading-[var(--type-body-m-line-height)] text-[var(--text-primary)]",
              isHorizontal ? "w-full shrink-0 sm:w-[var(--select-label-width)] sm:pt-1.5 sm:text-right" : "mb-1.5",
            ].join(" ")}
            style={labelStyle}
          >
            {label}
            {required ? <span className="ml-1 text-[var(--brand-600)]">*</span> : null}
          </span>
        ) : null}
        <span className={isHorizontal ? "min-w-0 flex-1" : "block"}>
          <span className="relative block">
            <select
              id={selectId}
              disabled={disabled || loading}
              aria-invalid={Boolean(error)}
              aria-describedby={messageId}
              aria-busy={loading}
              value={(currentValue as string) ?? ""}
              onChange={(e) => setValue(e.target.value)}
              className={[
                "w-full appearance-none rounded-[var(--radius-sm)] border bg-white font-normal text-[var(--text-body)] outline-none transition-colors duration-[var(--motion-duration-fast)]",
                "disabled:cursor-not-allowed disabled:bg-[var(--field-bg-disabled)] disabled:text-[var(--text-disabled)]",
                "focus-visible:outline focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-offset-[var(--focus-ring-offset)] focus-visible:outline-[var(--focus-ring-color)]",
                error
                  ? "border-[var(--field-border-error)] focus:border-[var(--field-border-error)]"
                  : "border-[var(--field-border-default)] hover:border-[var(--field-border-hover)] focus:border-[var(--field-border-focus)]",
                sizeClasses[size],
                sizePadding[size],
                className,
              ].join(" ")}
              {...props}
            >
              {placeholder ? <option value="" disabled={required}>{placeholder}</option> : null}
              {options.map((option) => (
                <option key={option.value} value={option.value} disabled={option.disabled}>
                  {option.label}
                </option>
              ))}
            </select>
            <CaretDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-tertiary)]" />
          </span>
          {error || helperText ? (
            <span id={messageId} className={`mt-1.5 block text-xs leading-[var(--type-caption-line-height)] ${error ? "text-[var(--error-text)]" : "text-[var(--text-tertiary)]"}`}>
              {error ?? helperText}
            </span>
          ) : null}
        </span>
      </label>
    );
  }

  // Custom dropdown render
  return (
    <div ref={containerRef} className={className}>
      <label className={isHorizontal ? "flex flex-col gap-1.5 sm:flex-row sm:items-start sm:gap-3" : "block"}>
        {label ? (
          <span
            className={[
              "block text-sm font-medium leading-[var(--type-body-m-line-height)] text-[var(--text-primary)]",
              isHorizontal ? "w-full shrink-0 sm:w-[var(--select-label-width)] sm:pt-1.5 sm:text-right" : "mb-1.5",
            ].join(" ")}
            style={labelStyle}
          >
            {label}
            {required ? <span className="ml-1 text-[var(--brand-600)]">*</span> : null}
          </span>
        ) : null}
        <span className={isHorizontal ? "min-w-0 flex-1" : "block"}>
          <span className="relative">
            {trigger}
            {open && (
              <div className="absolute z-[var(--z-dropdown)] mt-1 w-full min-w-[180px] rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white shadow-[var(--shadow-lg)] animate-scale-in origin-top">
                {searchable && (
                  <div className="flex items-center gap-2 border-b border-[var(--neutral-100)] px-3 py-2">
                    <MagnifyingGlass className="h-4 w-4 shrink-0 text-[var(--text-tertiary)]" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={search}
                      onChange={(e) => { setSearch(e.target.value); setFocusIdx(0); }}
                      placeholder="搜索..."
                      className="w-full border-none bg-transparent text-sm text-[var(--text-body)] outline-none placeholder:text-[var(--text-tertiary)]"
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                )}
                <ul ref={listRef} role="listbox" aria-multiselectable={multiple} className="max-h-60 overflow-y-auto py-1">
                  {filteredOptions.length === 0 ? (
                    <li className="px-3 py-5 text-center text-sm text-[var(--text-tertiary)]">无匹配选项</li>
                  ) : (
                    filteredOptions.map((option, idx) => {
                      const isSelected = valuesArr.includes(option.value);
                      const isFocused = idx === focusIdx;
                      return (
                        <li
                          key={option.value}
                          role="option"
                          aria-selected={isSelected}
                          aria-disabled={option.disabled}
                          className={[
                            "flex cursor-pointer items-center gap-3 px-3 py-2 text-sm transition-colors",
                            option.disabled
                              ? "cursor-not-allowed text-[var(--text-disabled)]"
                              : isFocused
                                ? "bg-[var(--neutral-100)] text-[var(--text-body)]"
                                : "text-[var(--text-body)] hover:bg-[var(--neutral-50)]",
                          ].join(" ")}
                          onMouseEnter={() => !option.disabled && setFocusIdx(idx)}
                          onClick={() => {
                            if (option.disabled) return;
                            selectOption(option.value);
                          }}
                        >
                          {multiple && (
                            <span className={[
                              "flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border transition-colors",
                              isSelected
                                ? "border-[var(--product-blue-500)] bg-[var(--product-blue-500)] text-white"
                                : "border-[var(--neutral-300)] bg-white",
                              option.disabled ? "opacity-40" : "",
                            ].join(" ")}>
                              {isSelected && <Check size={12} weight="bold" />}
                            </span>
                          )}
                          <span className="truncate">{option.label}</span>
                        </li>
                      );
                    })
                  )}
                </ul>
              </div>
            )}
          </span>
          {error || helperText ? (
            <span id={messageId} className={`mt-1.5 block text-xs leading-[var(--type-caption-line-height)] ${error ? "text-[var(--error-text)]" : "text-[var(--text-tertiary)]"}`}>
              {error ?? helperText}
            </span>
          ) : null}
        </span>
      </label>
    </div>
  );
}
