import type { FormHTMLAttributes, ReactNode } from "react";

type FormDensity = "standard" | "compact";
type FormColumns = 1 | 2 | 3 | 4;
type FormActionAlign = "start" | "end" | "between";
type FormStateTone = "neutral" | "product" | "success" | "warning" | "danger";

export type FormProps = FormHTMLAttributes<HTMLFormElement> & {
  density?: FormDensity;
};

export type FormSectionProps = {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export type FormGridProps = {
  columns?: FormColumns;
  children: ReactNode;
  className?: string;
};

export type FormActionsProps = {
  align?: FormActionAlign;
  children: ReactNode;
  className?: string;
};

export type FormStateBannerProps = {
  tone?: FormStateTone;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
};

const densityClasses: Record<FormDensity, string> = {
  standard: "space-y-6",
  compact: "space-y-4",
};

const gridClasses: Record<FormColumns, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-4",
};

const actionAlignClasses: Record<FormActionAlign, string> = {
  start: "justify-start",
  end: "justify-end",
  between: "justify-between",
};

const stateToneClasses: Record<FormStateTone, string> = {
  neutral: "border-[var(--neutral-200)] bg-[var(--neutral-50)]",
  product: "border-[var(--product-blue-200)] bg-[var(--product-blue-50)]",
  success: "border-[var(--success-border)] bg-[var(--success-bg)]",
  warning: "border-[var(--warning-border)] bg-[var(--warning-bg)]",
  danger: "border-[var(--error-border)] bg-[var(--error-bg)]",
};

const stateTitleClasses: Record<FormStateTone, string> = {
  neutral: "text-[var(--text-primary)]",
  product: "text-[var(--product-blue-700)]",
  success: "text-[var(--success-text)]",
  warning: "text-[var(--warning-text)]",
  danger: "text-[var(--error-text)]",
};

/**
 * 仅负责表单语义与布局密度。字段依赖、校验时机、脏数据判断、
 * 请求提交和服务端错误映射由业务表单逻辑管理。
 */
export function Form({ density = "standard", className = "", children, ...props }: FormProps) {
  return (
    <form className={[densityClasses[density], className].join(" ")} {...props}>
      {children}
    </form>
  );
}

export function FormSection({ title, description, children, className = "" }: FormSectionProps) {
  return (
    <section className={["rounded-[var(--radius-sm)] bg-white", className].join(" ")}>
      {title || description ? (
        <div className="mb-5">
          {title ? <h3 className="text-base font-semibold text-[var(--text-primary)]">{title}</h3> : null}
          {description ? <p className="mt-2 text-sm leading-6 text-[var(--text-tertiary)]">{description}</p> : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}

export function FormGrid({ columns = 2, className = "", children }: FormGridProps) {
  return <div className={["grid gap-4", gridClasses[columns], className].join(" ")}>{children}</div>;
}

export function FormActions({ align = "end", className = "", children }: FormActionsProps) {
  return (
    <div className={["flex flex-wrap items-center gap-3 pt-2", actionAlignClasses[align], className].join(" ")}>
      {children}
    </div>
  );
}

export function FormStateBanner({
  tone = "neutral",
  title,
  description,
  children,
  className = "",
}: FormStateBannerProps) {
  return (
    <div className={["rounded-[var(--radius-sm)] border px-4 py-3", stateToneClasses[tone], className].join(" ")}>
      <div className={["text-sm font-semibold", stateTitleClasses[tone]].join(" ")}>{title}</div>
      {description ? <div className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">{description}</div> : null}
      {children ? <div className="mt-3">{children}</div> : null}
    </div>
  );
}
