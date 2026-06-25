import { useId, useState } from "react";
import type { ChangeEvent, TextareaHTMLAttributes } from "react";

type TextareaSize = "sm" | "md" | "lg";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  helperText?: string;
  error?: string;
  size?: TextareaSize;
  inputSize?: TextareaSize;
  showCount?: boolean;
};

const sizeClasses: Record<TextareaSize, string> = {
  sm: "min-h-[var(--textarea-min-height-sm)] px-[var(--field-padding-x-sm)] py-2 text-[length:var(--type-body-m-size)] leading-[var(--type-body-m-line-height)]",
  md: "min-h-[var(--textarea-min-height-md)] px-[var(--field-padding-x-md)] py-2 text-[length:var(--type-body-m-size)] leading-[var(--type-body-m-line-height)]",
  lg: "min-h-[var(--textarea-min-height-lg)] px-[var(--field-padding-x-lg)] py-3 text-[length:var(--type-body-l-size)] leading-[var(--type-body-l-line-height)]",
};

export function Textarea({
  label,
  helperText,
  error,
  size,
  inputSize = "md",
  showCount = false,
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
  const resolvedSize = size ?? inputSize;
  const [uncontrolledValue, setUncontrolledValue] = useState(String(defaultValue ?? ""));
  const currentValue = value === undefined ? uncontrolledValue : String(value);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (value === undefined) setUncontrolledValue(event.target.value);
    onChange?.(event);
  };

  return (
    <label className="block">
      {label ? (
        <span className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
          {label}
          {props.required ? <span className="ml-1 text-[var(--brand-600)]">*</span> : null}
        </span>
      ) : null}
      <textarea
        id={textareaId}
        disabled={disabled}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        aria-invalid={Boolean(error)}
        aria-describedby={messageId}
        className={[
          "w-full rounded-[var(--radius-sm)] border bg-white text-[var(--text-body)] outline-none transition-colors duration-[var(--motion-duration-fast)]",
          "placeholder:text-[var(--text-disabled)] read-only:bg-[var(--field-bg-readonly)] read-only:text-[var(--text-secondary)] disabled:cursor-not-allowed disabled:bg-[var(--field-bg-disabled)] disabled:text-[var(--text-disabled)]",
          "focus-visible:outline focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-offset-[var(--focus-ring-offset)] focus-visible:outline-[var(--focus-ring-color)]",
          "resize-y",
          error
            ? "border-[var(--field-border-error)] focus:border-[var(--field-border-error)]"
            : "border-[var(--field-border-default)] hover:border-[var(--field-border-hover)] focus:border-[var(--field-border-focus)]",
          sizeClasses[resolvedSize],
          className,
        ].join(" ")}
        {...props}
      />
      {error || helperText || showCount ? (
        <span className="mt-1.5 flex items-start justify-between gap-3 text-xs leading-[var(--type-caption-line-height)]">
          <span id={messageId} className={error ? "text-[var(--error-text)]" : "text-[var(--text-tertiary)]"}>
            {error ?? helperText}
          </span>
          {showCount ? (
            <span className="shrink-0 font-data text-[var(--text-tertiary)]">
              {currentValue.length}{props.maxLength ? ` / ${props.maxLength}` : ""}
            </span>
          ) : null}
        </span>
      ) : null}
    </label>
  );
}
