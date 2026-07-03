import { useId, useState } from "react";
import type { ChangeEvent, CSSProperties, TextareaHTMLAttributes } from "react";

type TextareaSize = "sm" | "md" | "lg";
type LabelPosition = "top" | "left";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  helperText?: string;
  error?: string;
  size?: TextareaSize;
  showCount?: boolean;
  labelPosition?: LabelPosition;
  labelWidth?: number | string;
};

const sizeClasses: Record<TextareaSize, string> = {
  sm: "min-h-[var(--textarea-min-height-sm)] px-[var(--field-padding-x-sm)] py-2 text-sm",
  md: "min-h-[var(--textarea-min-height-md)] px-[var(--field-padding-x-md)] py-2 text-sm",
  lg: "min-h-[var(--textarea-min-height-lg)] px-[var(--field-padding-x-lg)] py-3 text-sm",
};

export function Textarea({
  label,
  helperText,
  error,
  size,
  showCount = false,
  labelPosition = "top",
  labelWidth = 96,
  disabled,
  className = "",
  id,
  value,
  defaultValue,
  onChange,
  ...props
}: TextareaProps) {
  const generatedId = useId();
  const textareaId = id ?? props.name ?? `textarea-${generatedId}`;
  const messageId = error || helperText ? `${textareaId}-message` : undefined;
  const countId = showCount ? `${textareaId}-count` : undefined;
  const describedBy = [messageId, countId].filter(Boolean).join(" ") || undefined;
  const resolvedSize = size;
  const isHorizontal = labelPosition === "left";
  const labelStyle = isHorizontal
    ? ({ "--textarea-label-width": typeof labelWidth === "number" ? `${labelWidth}px` : labelWidth } as CSSProperties)
    : undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(String(defaultValue ?? ""));
  const currentValue = value === undefined ? uncontrolledValue : String(value);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (value === undefined) setUncontrolledValue(event.target.value);
    onChange?.(event);
  };

  return (
    <label className={isHorizontal ? "block md:flex md:items-start md:gap-3" : "block"}>
      {label ? (
        <span
          className={[
            "block text-sm font-normal text-[var(--text-secondary)]",
            isHorizontal
              ? "mb-1.5 w-auto md:mb-0 md:w-[var(--textarea-label-width)] md:shrink-0 md:pt-2 md:text-right"
              : "mb-1.5",
          ].join(" ")}
          style={labelStyle}
        >
          {props.required && isHorizontal ? <span className="mr-1 text-[var(--brand-600)]">*</span> : null}
          {label}
          {props.required && !isHorizontal ? <span className="ml-1 text-[var(--brand-600)]">*</span> : null}
        </span>
      ) : null}
      <span className={isHorizontal ? "min-w-0 flex-1" : "block"}>
        <span className="relative block">
          <textarea
          id={textareaId}
          disabled={disabled}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={[
            "field-single-border-focus w-full rounded-[var(--radius-sm)] border bg-white text-[var(--text-primary)] outline-none transition-colors duration-[var(--motion-duration-fast)]",
            "placeholder:text-[var(--neutral-400)] read-only:bg-[var(--field-bg-readonly)] read-only:text-[var(--text-secondary)] disabled:cursor-not-allowed disabled:bg-[var(--field-bg-disabled)] disabled:text-[var(--text-disabled)]",
            "resize-y",
            showCount ? "pb-7" : "",
            error
              ? "border-[var(--field-border-error)] focus:border-[var(--field-border-error)]"
              : disabled
                ? "border-[var(--field-border-default)]"
                : props.readOnly
                  ? "border-[var(--field-border-default)] focus:border-[var(--field-border-focus)]"
                  : "border-[var(--field-border-default)] hover:border-[var(--field-border-hover)] focus:border-[var(--field-border-focus)]",
            sizeClasses[resolvedSize ?? "md"],
            className,
          ].join(" ")}
          {...props}
          />
          {showCount ? (
            <span id={countId} className="pointer-events-none absolute bottom-2 right-3 rounded-sm bg-white/90 px-1 text-xs font-normal text-[var(--text-tertiary)]">
              {currentValue.length}{props.maxLength ? ` / ${props.maxLength}` : ""}
            </span>
          ) : null}
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
