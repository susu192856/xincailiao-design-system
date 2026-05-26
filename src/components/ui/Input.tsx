import type { InputHTMLAttributes, ReactNode } from "react";

type InputSize = "sm" | "md" | "lg";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label?: string;
  helperText?: string;
  error?: string;
  size?: InputSize;
  icon?: ReactNode;
};

const sizeClasses: Record<InputSize, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-9 px-3 text-sm",
  lg: "h-10 px-4 text-base",
};

export function Input({
  label,
  helperText,
  error,
  size = "md",
  icon,
  disabled,
  className = "",
  id,
  ...props
}: InputProps) {
  const inputId = id ?? props.name;

  return (
    <label className="block">
      {label ? (
        <span className="mb-1.5 block text-sm font-medium text-[var(--neutral-900)]">{label}</span>
      ) : null}
      <span className="relative block">
        {icon ? (
          <span className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 text-[var(--neutral-500)]">
            {icon}
          </span>
        ) : null}
        <input
          id={inputId}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          className={[
            "w-full rounded-[var(--radius-sm)] border bg-white text-[var(--neutral-900)] outline-none transition-colors",
            "placeholder:text-[var(--neutral-400)] disabled:cursor-not-allowed disabled:bg-[var(--neutral-100)] disabled:text-[var(--neutral-400)]",
            error
              ? "border-[var(--error-text)] focus:border-[var(--error-text)]"
              : "border-[var(--neutral-300)] hover:border-[var(--neutral-400)] focus:border-[var(--neutral-900)]",
            icon ? "pl-9" : "",
            sizeClasses[size],
            className,
          ].join(" ")}
          {...props}
        />
      </span>
      {error || helperText ? (
        <span className={`mt-1.5 block text-xs ${error ? "text-[var(--error-text)]" : "text-[var(--neutral-500)]"}`}>
          {error ?? helperText}
        </span>
      ) : null}
    </label>
  );
}
