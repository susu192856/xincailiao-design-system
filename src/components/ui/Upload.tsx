import { useId, useRef, useState } from "react";
import type { DragEvent, HTMLAttributes } from "react";
import { CloudArrowUp, File, Trash, XCircle } from "@phosphor-icons/react";

export type UploadFile = {
  id: string;
  name: string;
  size: number;
  status: "pending" | "uploading" | "done" | "error";
  progress?: number;
  errorMessage?: string;
  url?: string;
};

export type UploadProps = Omit<HTMLAttributes<HTMLDivElement>, "onChange"> & {
  label?: string;
  helperText?: string;
  error?: string;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number;
  disabled?: boolean;
  files?: UploadFile[];
  onChange?: (files: UploadFile[]) => void;
  onRemove?: (file: UploadFile) => void;
  listType?: "text" | "card";
};

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

let fileIdCounter = 0;

function makeFileId(): string {
  return `upload-${Date.now()}-${++fileIdCounter}`;
}

export function Upload({
  label,
  helperText,
  error,
  accept,
  multiple = false,
  maxFiles,
  maxSize,
  disabled = false,
  files: controlledFiles,
  onChange,
  onRemove,
  listType = "text",
  className = "",
  id,
  ...props
}: UploadProps) {
  const generatedId = useId();
  const uploadId = id ?? `upload-${generatedId}`;
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const [internalFiles, setInternalFiles] = useState<UploadFile[]>([]);
  const currentFiles = controlledFiles ?? internalFiles;

  const setFiles = (next: UploadFile[]) => {
    if (!controlledFiles) setInternalFiles(next);
    onChange?.(next);
  };

  const addFiles = (fileList: FileList) => {
    const newFiles: UploadFile[] = Array.from(fileList).map((f) => ({
      id: makeFileId(),
      name: f.name,
      size: f.size,
      status: "done" as const,
    }));

    if (maxSize) {
      for (const f of fileList) {
        if (f.size > maxSize) {
          newFiles.find((nf) => nf.name === f.name)!.status = "error";
          newFiles.find((nf) => nf.name === f.name)!.errorMessage = `文件大小超过 ${formatSize(maxSize)} 限制`;
        }
      }
    }

    let combined = multiple ? [...currentFiles, ...newFiles] : newFiles;
    if (maxFiles && combined.length > maxFiles) {
      combined = combined.slice(0, maxFiles);
    }
    setFiles(combined);
  };

  const removeFile = (file: UploadFile) => {
    setFiles(currentFiles.filter((f) => f.id !== file.id));
    onRemove?.(file);
  };

  const handleDragOver = (e: DragEvent) => { e.preventDefault(); setDragOver(true); };
  const handleDragLeave = (e: DragEvent) => { e.preventDefault(); setDragOver(false); };
  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (disabled) return;
    addFiles(e.dataTransfer.files);
  };

  return (
    <div className={className} {...props}>
      {label ? (
        <p className="mb-1.5 text-sm font-medium leading-[var(--type-body-m-line-height)] text-[var(--text-primary)]">{label}</p>
      ) : null}
      <div
        id={uploadId}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        className={[
          "flex flex-col items-center justify-center rounded-[var(--radius-sm)] border-2 border-dashed p-6 transition-colors",
          disabled
            ? "cursor-not-allowed border-[var(--neutral-200)] bg-[var(--neutral-50)]"
            : dragOver
              ? "cursor-pointer border-[var(--product-blue-500)] bg-[var(--product-blue-50)]"
              : error
                ? "cursor-pointer border-[var(--error-text)] bg-[var(--error-bg)]"
                : "cursor-pointer border-[var(--neutral-300)] bg-[var(--neutral-50)] hover:border-[var(--product-blue-400)] hover:bg-[var(--product-blue-50)]",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring-color)]",
        ].join(" ")}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => { if (!disabled) inputRef.current?.click(); }}
        onKeyDown={(e) => { if (!disabled && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); inputRef.current?.click(); } }}
      >
        <CloudArrowUp className={["mb-2 h-8 w-8", error ? "text-[var(--error-text)]" : "text-[var(--text-tertiary)]"].join(" ")} />
        <p className="text-sm text-[var(--text-secondary)]">
          拖拽文件到此处，或<span className="text-[var(--product-blue-500)]">点击上传</span>
        </p>
        {helperText ? <p className="mt-1 text-xs text-[var(--text-tertiary)]">{helperText}</p> : null}
        {accept ? <p className="mt-1 text-xs text-[var(--text-tertiary)]">支持格式：{accept}</p> : null}
        {maxSize ? <p className="mt-1 text-xs text-[var(--text-tertiary)]">单文件不超过 {formatSize(maxSize)}</p> : null}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={(e) => { if (e.target.files?.length) addFiles(e.target.files); e.target.value = ""; }}
          className="hidden"
        />
      </div>
      {error ? <p className="mt-1.5 text-xs leading-[var(--type-caption-line-height)] text-[var(--error-text)]">{error}</p> : null}

      {currentFiles.length > 0 && (
        <ul className={["mt-3 space-y-2", listType === "card" ? "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 space-y-0" : ""].join(" ")}>
          {currentFiles.map((file) => (
            <li
              key={file.id}
              className={[
                "flex items-center gap-3 rounded-[var(--radius-sm)] border bg-white p-3",
                file.status === "error" ? "border-[var(--error-text)]" : "border-[var(--neutral-200)]",
                listType === "card" ? "flex-col items-center text-center" : "",
              ].join(" ")}>
              {listType === "card" ? (
                <>
                  {file.status === "error" ? (
                    <XCircle className="h-8 w-8 text-[var(--error-text)]" />
                  ) : (
                    <File className="h-8 w-8 text-[var(--text-tertiary)]" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-[var(--text-body)]" title={file.name}>{file.name}</p>
                    <p className="mt-0.5 text-xs text-[var(--text-tertiary)]">{formatSize(file.size)}</p>
                    {file.status === "error" && file.errorMessage ? (
                      <p className="mt-0.5 text-xs text-[var(--error-text)]">{file.errorMessage}</p>
                    ) : null}
                  </div>
                </>
              ) : (
                <>
                  {file.status === "error" ? (
                    <XCircle className="h-5 w-5 shrink-0 text-[var(--error-text)]" />
                  ) : file.status === "uploading" ? (
                    <svg className="h-5 w-5 shrink-0 animate-spin text-[var(--product-blue-500)]" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
                      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <File className="h-5 w-5 shrink-0 text-[var(--text-tertiary)]" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-[var(--text-body)]" title={file.name}>{file.name}</p>
                    <p className="text-xs text-[var(--text-tertiary)]">{formatSize(file.size)}</p>
                    {file.status === "error" && file.errorMessage ? (
                      <p className="text-xs text-[var(--error-text)]">{file.errorMessage}</p>
                    ) : null}
                  </div>
                </>
              )}
              {!disabled ? (
                <button
                  type="button"
                  aria-label={`删除 ${file.name}`}
                  onClick={(e) => { e.stopPropagation(); removeFile(file); }}
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[var(--radius-sm)] text-[var(--text-tertiary)] hover:bg-[var(--neutral-100)] hover:text-[var(--error-text)]"
                >
                  <Trash size={14} />
                </button>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
