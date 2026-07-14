<template>
  <div class="xc-upload">
    <p v-if="label" class="xc-upload__label">{{ label }}</p>
    <div
      class="xc-upload__area"
      :class="areaClass"
      role="button"
      :tabindex="disabled ? -1 : 0"
      :aria-disabled="disabled"
      @click="openFileDialog"
      @keydown.enter.prevent="openFileDialog"
      @keydown.space.prevent="openFileDialog"
      @dragover.prevent="dragOver = true"
      @dragleave.prevent="dragOver = false"
      @drop.prevent="handleDrop"
    >
      <svg width="40" height="40" viewBox="0 0 256 256" fill="none" class="xc-upload__icon" aria-hidden="true">
        <path d="M128 152V40M80 88l48-48 48 48M216 152v56a8 8 0 0 1-8 8H48a8 8 0 0 1-8-8v-56" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <p class="xc-upload__text">拖拽文件到此处，或<span class="xc-upload__link">点击上传</span></p>
      <p v-if="constraintText" class="xc-upload__hint">{{ constraintText }}</p>
      <input ref="fileInput" type="file" :accept="accept" :multiple="multiple" :disabled="disabled" class="xc-upload__hidden" @change="handleFileChange" />
    </div>
    <p v-if="error" class="xc-upload__error">{{ error }}</p>

    <ul v-if="files.length > 0" class="xc-upload__list">
      <li v-for="file in files" :key="file.id" class="xc-upload__file" :class="{ 'xc-upload__file--error': file.status === 'error' }">
        <svg v-if="file.status === 'error'" width="20" height="20" viewBox="0 0 20 20" fill="none" class="xc-upload__file-icon-error">
          <circle cx="10" cy="10" r="8" stroke="var(--error-text)" stroke-width="1.5"/>
          <path d="M7 7l6 6M13 7l-6 6" stroke="var(--error-text)" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <img v-else :src="getFileTypeIcon(file.name)" alt="" aria-hidden="true" class="xc-upload__file-icon" />
        <div class="xc-upload__file-info">
          <p class="xc-upload__file-name">{{ file.name }}</p>
          <p class="xc-upload__file-size">{{ formatSize(file.size) }}<template v-if="file.status === 'uploading'"> · 上传中 {{ file.progress ?? 0 }}%</template></p>
          <div v-if="file.status === 'uploading'" class="xc-upload__progress" :aria-label="`上传进度 ${file.progress ?? 0}%`"><span :style="{ width: `${file.progress ?? 0}%` }" /></div>
          <p v-if="file.status === 'error' && file.errorMessage" class="xc-upload__file-error-text">{{ file.errorMessage }}</p>
        </div>
        <button v-if="!disabled" type="button" class="xc-upload__file-remove" :aria-label="`删除 ${file.name}`" @click="removeFile(file)">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import apiFileIcon from "../../../../src/assets/file-types/api.svg";
import archiveFileIcon from "../../../../src/assets/file-types/archive.svg";
import csvFileIcon from "../../../../src/assets/file-types/csv.svg";
import databaseFileIcon from "../../../../src/assets/file-types/database.svg";
import excelFileIcon from "../../../../src/assets/file-types/excel.svg";
import imageFileIcon from "../../../../src/assets/file-types/image.svg";
import otherFileIcon from "../../../../src/assets/file-types/other.svg";
import pdfFileIcon from "../../../../src/assets/file-types/pdf.svg";
import powerpointFileIcon from "../../../../src/assets/file-types/powerpoint.svg";
import wordFileIcon from "../../../../src/assets/file-types/word.svg";

interface UploadFile {
  id: string;
  name: string;
  size: number;
  status: "pending" | "uploading" | "done" | "error";
  progress?: number;
  errorMessage?: string;
}

const props = withDefaults(
  defineProps<{
    label?: string;
    helperText?: string;
    error?: string;
    accept?: string;
    multiple?: boolean;
    maxFiles?: number;
    maxSize?: number;
    disabled?: boolean;
    files?: UploadFile[];
  }>(),
  { multiple: false, disabled: false },
);

const emit = defineEmits<{
  "update:files": [files: UploadFile[]];
  remove: [file: UploadFile];
}>();

const fileInput = ref<HTMLInputElement>();
const dragOver = ref(false);
const constraintText = computed(() => [
  props.helperText,
  props.accept ? `支持格式：${props.accept}` : "",
  props.maxSize ? `单文件不超过 ${formatSize(props.maxSize)}` : "",
].filter(Boolean).join("；"));

let counter = 0;
function makeId() { return `xc-upload-${Date.now()}-${++counter}`; }

const areaClass = computed(() => ({
  "xc-upload__area--disabled": props.disabled,
  "xc-upload__area--dragover": dragOver.value && !props.disabled,
  "xc-upload__area--error": Boolean(props.error),
}));

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileTypeIcon(fileName: string) {
  const extension = fileName.split(".").pop()?.toLowerCase() ?? "";
  if (["xls", "xlsx"].includes(extension)) return excelFileIcon;
  if (extension === "csv") return csvFileIcon;
  if (extension === "pdf") return pdfFileIcon;
  if (["doc", "docx"].includes(extension)) return wordFileIcon;
  if (["ppt", "pptx"].includes(extension)) return powerpointFileIcon;
  if (["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(extension)) return imageFileIcon;
  if (["zip", "rar", "7z", "tar", "gz"].includes(extension)) return archiveFileIcon;
  if (["json", "xml", "yaml", "yml"].includes(extension)) return apiFileIcon;
  if (["sql", "db", "sqlite", "sqlite3"].includes(extension)) return databaseFileIcon;
  return otherFileIcon;
}

function openFileDialog() {
  if (props.disabled) return;
  fileInput.value?.click();
}

function handleFileChange(e: Event) {
  const target = e.target as HTMLInputElement;
  if (target.files?.length) addFiles(target.files);
  target.value = "";
}

function handleDrop(e: DragEvent) {
  dragOver.value = false;
  if (props.disabled || !e.dataTransfer?.files.length) return;
  addFiles(e.dataTransfer.files);
}

function addFiles(fileList: FileList) {
  const newFiles: UploadFile[] = Array.from(fileList).map((f) => ({
    id: makeId(),
    name: f.name,
    size: f.size,
    status: "done",
  }));
  if (props.maxSize) {
    for (const f of fileList) {
      if (f.size > props.maxSize) {
        const nf = newFiles.find((nf) => nf.name === f.name)!;
        nf.status = "error";
        nf.errorMessage = `文件大小超过 ${formatSize(props.maxSize)} 限制`;
      }
    }
  }
  let combined = props.multiple ? [...props.files, ...newFiles] : newFiles;
  if (props.maxFiles && combined.length > props.maxFiles) combined = combined.slice(0, props.maxFiles);
  emit("update:files", combined);
}

function removeFile(file: UploadFile) {
  emit("update:files", props.files.filter((f) => f.id !== file.id));
  emit("remove", file);
}
</script>

<style scoped>
.xc-upload__label { margin-bottom: 6px; font-size: 14px; font-weight: 500; color: var(--text-primary); }
.xc-upload__area {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  border-radius: var(--radius-sm); border: 1px dashed var(--neutral-300); background: var(--neutral-50);
  padding: 24px; cursor: pointer; transition: border-color var(--motion-duration-fast), background var(--motion-duration-fast);
}
.xc-upload__area:hover { border-color: var(--product-blue-400); background: var(--product-blue-50); }
.xc-upload__area--disabled { cursor: not-allowed; opacity: .6; }
.xc-upload__area--dragover { border-color: var(--product-blue-500); background: var(--product-blue-50); }
.xc-upload__area--error { border-color: var(--error-solid); background: var(--neutral-50); }
.xc-upload__icon { color: var(--text-tertiary); margin-bottom: 8px; }
.xc-upload__text { font-size: 14px; color: var(--text-secondary); }
.xc-upload__link { color: var(--product-blue-500); }
.xc-upload__hint { margin-top: 4px; font-size: 12px; color: var(--text-tertiary); }
.xc-upload__hidden { display: none; }
.xc-upload__error { margin-top: 6px; font-size: 12px; color: var(--error-text); }
.xc-upload__list { margin-top: 12px; display: flex; flex-direction: column; gap: 8px; }
.xc-upload__file {
  display: flex; align-items: center; gap: 12px; border-radius: var(--radius-sm); border: 1px solid var(--neutral-200);
  background: #fff; padding: 12px;
}
.xc-upload__file--error { border-color: var(--error-solid); }
.xc-upload__file-icon { width: 20px; height: 20px; flex-shrink: 0; }
.xc-upload__file-icon-error { flex-shrink: 0; }
.xc-upload__file-info { flex: 1; min-width: 0; }
.xc-upload__file-name { font-size: 14px; color: var(--neutral-900); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.xc-upload__file-size { font-size: 12px; color: var(--text-tertiary); }
.xc-upload__progress { height: 4px; margin-top: 4px; overflow: hidden; border-radius: var(--radius-full); background: var(--neutral-100); }
.xc-upload__progress > span { display: block; height: 100%; border-radius: var(--radius-full); background: var(--product-blue-500); }
.xc-upload__file-error-text { font-size: 12px; color: var(--error-text); }
.xc-upload__file-remove {
  flex-shrink: 0; display: flex; width: 24px; height: 24px; align-items: center; justify-content: center;
  border: none; background: none; border-radius: var(--radius-sm); cursor: pointer; color: var(--text-tertiary);
}
.xc-upload__file-remove:hover { background: var(--neutral-100); color: var(--error-text); }
</style>
