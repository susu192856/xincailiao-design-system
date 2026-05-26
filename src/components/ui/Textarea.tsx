import type { TextareaHTMLAttributes } from "react";

type TextareaSize = "sm" | "md" | "lg";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  helperText?: string;
  error?: string;
  inputSize?: TextareaSize;
};

const sizeClasses: Record<TextareaSize, string> = {
  sm: "min-h-[60px] text-sm",
  md: "min-h-[80px] text-sm",
  lg: "min-h-[100px] text-base",
};

export function Textarea({
  label,
  helperText,
  error,
  inputSize = "md",
  disabled,
  className = "",
  id,
  ...props
}: TextareaProps) {
  const textareaId = id ?? props.name;

  return (
    <label className="block">
      {label ? (
        <span className="mb-1.5 block text-sm font-medium text-[var(--neutral-900)]">{label}</span>
      ) : null}
      <textarea
        id={textareaId}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        className={[
          "w-full rounded-sm border bg-white text-[var(--neutral-900)] outline-none transition-colors",
          "placeholder:text-[var(--neutral-400)] disabled:cursor-not-allowed disabled:bg-[var(--neutral-100)] disabled:text-[var(--neutral-400)]",
          "resize-y",
          error
            ? "border-[var(--error-text)] focus:border-[var(--error-text)]"
            : "border-[var(--neutral-300)] hover:border-[var(--neutral-400)] focus:border-[var(--neutral-900)]",
          sizeClasses[inputSize],
          className,
        ].join(" ")}
        {...props}
      />
      {error || helperText ? (
        <span className={`mt-1.5 block text-xs ${error ? "text-[var(--error-text)]" : "text-[var(--neutral-500)]"}`}>
          {error ?? helperText}
        </span>
      ) : null}
    </label>
  );
}
