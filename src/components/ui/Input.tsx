import { SpinnerGap } from "@phosphor-icons/react";
import { useId, useState, type ChangeEvent, type CSSProperties, type InputHTMLAttributes, type ReactNode } from "react";
import { Select } from "./Select";

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
  /** 与输入框共享边框的可交互前置控件，例如国家区号选择。 */
  prefixAddon?: ReactNode;
  /** 与输入框共享边框的可交互后置控件，例如数量级单位选择。 */
  suffixAddon?: ReactNode;
  showCount?: boolean;
  loading?: boolean;
};

export type InputAffixSelectProps = {
  options: Array<{ label: string; value: string }>;
  "aria-label": string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  size?: InputSize;
  side?: "start" | "end";
  className?: string;
};

export function InputAffixSelect({ options, className = "", size = "md", side = "start", onChange, ...props }: InputAffixSelectProps) {
  return (
    <span className={`relative flex h-full min-w-[76px] self-stretch bg-[var(--neutral-50)] ${side === "end" ? "border-l" : "border-r"} border-[var(--field-border-default)] ${side === "end" ? "rounded-r-[var(--radius-sm)]" : "rounded-l-[var(--radius-sm)]"}`}>
      <Select
        {...props}
        options={options}
        onChange={(next) => onChange?.(Array.isArray(next) ? next[0] ?? "" : next)}
        size={size}
        dropdownAlign={side === "end" ? "end" : "start"}
        className={`min-w-[76px] !rounded-none !border-0 !bg-[var(--neutral-50)] hover:!bg-[var(--neutral-100)] ${className}`}
      />
    </span>
  );
}

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
  prefixAddon,
  suffixAddon,
  showCount = false,
  loading = false,
  disabled,
  className = "",
  id,
  value,
  defaultValue,
  onChange,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? props.name ?? generatedId;
  const messageId = `${inputId}-message`;
  const countId = `${inputId}-count`;
  const isHorizontal = labelPosition === "left";
  const resolvedPrefix = prefix ?? icon;
  const isDisabled = disabled || loading;
  const resolvedSuffix = loading ? (
    <SpinnerGap size={16} weight="regular" className="animate-spin" aria-hidden="true" />
  ) : suffix;
  const labelStyle = isHorizontal
    ? ({ "--input-label-width": typeof labelWidth === "number" ? `${labelWidth}px` : labelWidth } as CSSProperties)
    : undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(String(defaultValue ?? ""));
  const currentValue = value === undefined ? uncontrolledValue : String(value);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (value === undefined) setUncontrolledValue(event.target.value);
    onChange?.(event);
  };
  const describedBy = [error || helperText ? messageId : null, showCount ? countId : null].filter(Boolean).join(" ") || undefined;

  return (
    <div className={isHorizontal ? "block md:flex md:items-start md:gap-3" : "block"}>
      {label ? (
        <label
          htmlFor={inputId}
          className={[
            "block text-sm font-normal text-[var(--text-secondary)]",
            isHorizontal
              ? "mb-1.5 w-auto md:mb-0 md:w-[var(--input-label-width)] md:shrink-0 md:pt-1.5 md:text-right"
              : "mb-1.5",
          ].join(" ")}
          style={labelStyle}
        >
          {props.required && isHorizontal ? <span className="mr-1 text-[var(--brand-600)]">*</span> : null}
          {label}
          {props.required && !isHorizontal ? <span className="ml-1 text-[var(--brand-600)]">*</span> : null}
        </label>
      ) : null}
      <span className={isHorizontal ? "min-w-0 flex-1" : "block"}>
        <span className={`flex rounded-[var(--radius-sm)] ${prefixAddon || suffixAddon ? `field-single-border-focus overflow-visible border bg-white ${error ? "border-[var(--field-border-error)]" : "border-[var(--field-border-default)] hover:border-[var(--field-border-hover)] focus-within:border-[var(--field-border-focus)]"}` : "overflow-hidden"}`}>
          {prefixAddon ? <span className="flex shrink-0 self-stretch">{prefixAddon}</span> : null}
          <span className="relative min-w-0 flex-1">
          {resolvedPrefix ? (
            <span className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 text-[var(--text-tertiary)]">
              {resolvedPrefix}
            </span>
          ) : null}
          <input
            {...props}
            id={inputId}
            disabled={isDisabled}
            readOnly={loading || props.readOnly}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
            className={[
              "w-full bg-white font-normal text-[var(--text-primary)] outline-none transition-colors",
              prefixAddon || suffixAddon ? "border-0 rounded-none" : "field-single-border-focus rounded-[var(--radius-sm)] border",
              "placeholder:text-[var(--neutral-400)] read-only:bg-[var(--field-bg-readonly)] read-only:text-[var(--text-secondary)] disabled:cursor-not-allowed disabled:bg-[var(--field-bg-disabled)] disabled:text-[var(--text-disabled)]",
              error
                ? "border-[var(--field-border-error)] focus:border-[var(--field-border-error)]"
                : isDisabled
                  ? "border-[var(--field-border-default)]"
                  : props.readOnly
                    ? "border-[var(--field-border-default)] focus:border-[var(--field-border-focus)]"
                    : "border-[var(--field-border-default)] hover:border-[var(--field-border-hover)] focus:border-[var(--field-border-focus)]",
              resolvedPrefix ? "pl-9" : "",
              resolvedSuffix ? "pr-10" : "",
              showCount ? "pr-16" : "",
              sizeClasses[size],
              className,
            ].join(" ")}
          />
          {resolvedSuffix ? (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--text-tertiary)]">
              {resolvedSuffix}
            </span>
          ) : null}
          {showCount ? (
            <span id={countId} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 bg-white pl-2 text-xs font-normal text-[var(--text-tertiary)]">
              {currentValue.length}{props.maxLength ? ` / ${props.maxLength}` : ""}
            </span>
          ) : null}
          </span>
          {suffixAddon ? <span className="flex shrink-0 self-stretch">{suffixAddon}</span> : null}
        </span>
        {error || helperText ? (
          <span id={messageId} className={`mt-1.5 block text-xs ${error ? "text-[var(--error-text)]" : "text-[var(--text-tertiary)]"}`}>
            {error || helperText}
          </span>
        ) : null}
      </span>
    </div>
  );
}
