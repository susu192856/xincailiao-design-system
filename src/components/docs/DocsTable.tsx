import type { ReactNode } from "react";

type DocsTableProps = {
  children?: ReactNode;
};

export default function DocsTable({ children }: DocsTableProps) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--docs-border)] bg-white">
      <table className="w-full border-collapse text-left text-sm">{children}</table>
    </div>
  );
}
