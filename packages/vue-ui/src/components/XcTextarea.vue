<template>
  <label class="xc-textarea">
    <span v-if="label" class="xc-textarea__label">{{ label }}</span>
    <textarea
      class="xc-textarea__control"
      :class="controlClasses"
      :name="name"
      :rows="rows"
      :value="modelValue"
      :disabled="disabled"
      :readonly="readOnly"
      :placeholder="placeholder"
      :aria-invalid="Boolean(error)"
      @input="handleInput"
    />
    <span v-if="error || helperText" class="xc-textarea__message" :class="{ 'xc-textarea__message--error': error }">
      {{ error || helperText }}
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed } from "vue";

type TextareaSize = "sm" | "md" | "lg";

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    label?: string;
    helperText?: string;
    error?: string;
    placeholder?: string;
    size?: TextareaSize;
    disabled?: boolean;
    readOnly?: boolean;
    rows?: number;
    name?: string;
  }>(),
  {
    modelValue: "",
    size: "md",
    disabled: false,
    readOnly: false,
    rows: 4,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const controlClasses = computed(() => [
  `xc-textarea__control--${props.size}`,
  {
    "xc-textarea__control--error": props.error,
  },
]);

function handleInput(event: Event) {
  emit("update:modelValue", (event.target as HTMLTextAreaElement).value);
}
</script>

<style scoped>
.xc-textarea {
  display: block;
}

.xc-textarea__label {
  display: block;
  margin-bottom: 6px;
  color: var(--neutral-900);
  font-size: 14px;
  font-weight: 500;
}

.xc-textarea__control {
  width: 100%;
  min-height: 96px;
  border: 1px solid var(--neutral-300);
  border-radius: var(--radius-sm);
  background: #fff;
  color: var(--neutral-900);
  font-family: inherit;
  line-height: 22px;
  outline: none;
  resize: vertical;
  transition:
    border-color 0.15s ease,
    background-color 0.15s ease;
}

.xc-textarea__control::placeholder {
  color: var(--neutral-400);
}

.xc-textarea__control:hover:not(:disabled):not(:read-only) {
  border-color: var(--neutral-400);
}

.xc-textarea__control:focus {
  border-color: var(--neutral-900);
}

.xc-textarea__control:disabled,
.xc-textarea__control:read-only {
  background: var(--neutral-100);
  color: var(--neutral-500);
}

.xc-textarea__control:disabled {
  cursor: not-allowed;
}

.xc-textarea__control--error {
  border-color: var(--error-text);
}

.xc-textarea__control--sm {
  padding: 8px 12px;
  font-size: 14px;
}

.xc-textarea__control--md {
  padding: 10px 12px;
  font-size: 14px;
}

.xc-textarea__control--lg {
  padding: 12px 16px;
  font-size: 16px;
  line-height: 24px;
}

.xc-textarea__message {
  display: block;
  margin-top: 6px;
  color: var(--neutral-500);
  font-size: 12px;
  line-height: 18px;
}

.xc-textarea__message--error {
  color: var(--error-text);
}
</style>
