import type { InputHTMLAttributes } from "react";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: string;
  indeterminate?: boolean;
};

export function Checkbox({ label, indeterminate, disabled, className = "", id, ...props }: CheckboxProps) {
  const checkId = id ?? props.name;

  return (
    <label className={["inline-flex items-center gap-2", disabled ? "cursor-not-allowed" : "cursor-pointer", className].join(" ")}>
      <span className="relative flex h-4 w-4 items-center justify-center">
        <input
          type="checkbox"
          id={checkId}
          disabled={disabled}
          className="peer sr-only"
          {...props}
        />
        <span className={[
          "block h-4 w-4 rounded-sm border transition-colors",
          "peer-checked:bg-[var(--neutral-900)] peer-checked:border-[var(--neutral-900)]",
          "peer-focus-visible:outline-2 peer-focus-visible:outline-[var(--neutral-400)]",
          "peer-disabled:opacity-40 peer-disabled:cursor-not-allowed",
          "border-[var(--neutral-300)] bg-white",
        ].join(" ")} />
        {/* Check icon */}
        <svg
          className="pointer-events-none absolute hidden peer-checked:block"
          width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"
        >
          <path d="M2 5L4.5 7.5L8.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {label ? <span className="text-sm text-[var(--neutral-700)]">{label}</span> : null}
    </label>
  );
}
