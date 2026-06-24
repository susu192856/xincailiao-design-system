<template>
  <div class="xc-datepicker" :class="rootClass">
    <label v-if="label" :for="inputId" class="xc-datepicker__label">{{ label }}</label>
    <span class="xc-datepicker__input-wrap">
      <input
        :id="inputId"
        ref="inputRef"
        type="date"
        :value="modelValue"
        :min="min"
        :max="max"
        :disabled="disabled"
        :aria-invalid="Boolean(error)"
        :aria-describedby="messageId"
        class="xc-datepicker__input"
        :class="inputClass"
        @change="handleChange"
      />
      <span class="xc-datepicker__suffix">
        <button
          v-if="clearable && modelValue && !disabled"
          type="button"
          aria-label="清除日期"
          class="xc-datepicker__clear"
          @click="handleClear"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="xc-datepicker__icon">
          <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
          <path d="M2 6h12M5 1v3M11 1v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </span>
    </span>
    <span v-if="error || helperText" :id="messageId" class="xc-datepicker__message" :class="{ 'xc-datepicker__message--error': error }">
      {{ error ?? helperText }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const props = withDefaults(
  defineProps<{
    label?: string;
    helperText?: string;
    error?: string;
    size?: "sm" | "md" | "lg";
    modelValue?: string;
    clearable?: boolean;
    disabled?: boolean;
    min?: string;
    max?: string;
    id?: string;
  }>(),
  { size: "md", clearable: true, disabled: false },
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const inputRef = ref<HTMLInputElement>();

const inputId = computed(() => props.id ?? `xc-datepicker-${Math.random().toString(36).slice(2, 8)}`);
const messageId = computed(() => props.error || props.helperText ? `${inputId.value}-message` : undefined);

const rootClass = computed(() => [`xc-datepicker--${props.size}`]);
const inputClass = computed(() => [`xc-datepicker__input--${props.size}`]);

function handleChange(e: Event) {
  const target = e.target as HTMLInputElement;
  emit("update:modelValue", target.value);
}

function handleClear() {
  emit("update:modelValue", "");
  inputRef.value?.focus();
}
</script>

<style scoped>
.xc-datepicker {
  display: block;
}
.xc-datepicker__label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
}
.xc-datepicker__input-wrap {
  position: relative;
  display: block;
}
.xc-datepicker__input {
  width: 100%;
  appearance: none;
  border-radius: var(--radius-sm);
  border: 1px solid var(--field-border-default);
  background: #fff;
  font-family: inherit;
  color: var(--text-body);
  outline: none;
  transition: border-color var(--motion-duration-fast);
}
.xc-datepicker__input:focus {
  border-color: var(--field-border-focus);
}
.xc-datepicker__input:disabled {
  cursor: not-allowed;
  background: var(--field-bg-disabled);
  color: var(--text-disabled);
}
.xc-datepicker__input--sm {
  height: var(--control-height-sm);
  padding-left: var(--field-padding-x-sm);
  padding-right: 32px;
  font-size: 12px;
}
.xc-datepicker__input--md {
  height: var(--control-height-md);
  padding-left: var(--field-padding-x-md);
  padding-right: 36px;
  font-size: 14px;
}
.xc-datepicker__input--lg {
  height: var(--control-height-lg);
  padding-left: var(--field-padding-x-lg);
  padding-right: 36px;
  font-size: 14px;
}
.xc-datepicker__input::-webkit-calendar-picker-indicator {
  opacity: 0;
  position: absolute;
  right: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.xc-datepicker__suffix {
  pointer-events: none;
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--text-tertiary);
}
.xc-datepicker__clear {
  pointer-events: auto;
  display: flex;
  height: 16px;
  width: 16px;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  border-radius: 2px;
  cursor: pointer;
  color: var(--text-tertiary);
}
.xc-datepicker__clear:hover {
  color: var(--text-body);
}
.xc-datepicker__icon {
  flex-shrink: 0;
}
.xc-datepicker__message {
  display: block;
  margin-top: 6px;
  font-size: 12px;
  color: var(--text-tertiary);
}
.xc-datepicker__message--error {
  color: var(--error-text);
}
</style>
