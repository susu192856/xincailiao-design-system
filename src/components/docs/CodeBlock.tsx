import { CaretDown, CaretUp, Check, Clipboard } from "@phosphor-icons/react";
import { useState } from "react";

type CodeBlockProps = {
  code: string;
  lang?: string;
  label?: string;
};

export default function CodeBlock({ code, lang = "tsx", label }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group/code relative my-4 overflow-hidden rounded-[var(--radius-md)] border border-[var(--neutral-200)] bg-white">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 bg-[var(--neutral-50)] px-4 py-3 text-left transition-colors hover:bg-[var(--neutral-100)]"
      >
        <span>
          <span className="block text-sm font-medium text-[var(--text-primary)]">{open ? "收起实现代码" : "查看实现代码"}</span>
        </span>
        {open ? <CaretUp size={16} weight="regular" aria-hidden="true" /> : <CaretDown size={16} weight="regular" aria-hidden="true" />}
      </button>
      {open ? (
        <div className="border-t border-[var(--neutral-200)]">
          <div className="flex items-center justify-between bg-[var(--docs-code-bg)] px-4 py-2">
            <span className="text-xs text-[var(--text-tertiary)]">{label ?? lang}</span>
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-[var(--radius-sm)] px-2 py-1 text-xs text-[var(--text-tertiary)] transition-colors hover:bg-[var(--neutral-200)] hover:text-[var(--text-primary)]"
            >
              {copied ? <><Check size={14} weight="regular" aria-hidden="true" />已复制</> : <><Clipboard size={14} weight="regular" aria-hidden="true" />复制</>}
            </button>
          </div>
          <div className="max-h-[480px] overflow-auto">
            <pre className="bg-[var(--docs-code-bg)] px-6 py-4">
              <code className="whitespace-pre font-mono text-sm leading-6 text-[var(--text-primary)]">{code}</code>
            </pre>
          </div>
        </div>
      ) : null}
    </div>
  );
}
