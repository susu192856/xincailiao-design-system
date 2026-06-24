<template>
  <label class="xc-textarea">
    <span v-if="label" class="xc-textarea__label">
      {{ label }}<span v-if="required" class="xc-textarea__required">*</span>
    </span>
    <textarea
      :id="controlId"
      class="xc-textarea__control"
      :class="controlClasses"
      :name="name"
      :rows="rows"
      :value="modelValue"
      :disabled="disabled"
      :readonly="readOnly"
      :required="required"
      :maxlength="maxLength"
      :placeholder="placeholder"
      :aria-invalid="Boolean(error)"
      :aria-describedby="messageId"
      @input="handleInput"
    />
    <span v-if="error || helperText || showCount" class="xc-textarea__footer">
      <span :id="messageId" class="xc-textarea__message" :class="{ 'xc-textarea__message--error': error }">
        {{ error || helperText }}
      </span>
      <span v-if="showCount" class="xc-textarea__count">
        {{ modelValue.length }}<template v-if="maxLength"> / {{ maxLength }}</template>
      </span>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, useId } from "vue";

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
    required?: boolean;
    showCount?: boolean;
    maxLength?: number;
    rows?: number;
    name?: string;
  }>(),
  {
    modelValue: "",
    size: "md",
    disabled: false,
    readOnly: false,
    required: false,
    showCount: false,
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
const generatedId = useId();
const controlId = computed(() => props.name || `textarea-${generatedId}`);
const messageId = computed(() => (props.error || props.helperText ? `${controlId.value}-message` : undefined));

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

.xc-textarea__required {
  margin-left: 4px;
  color: var(--brand-600);
}

.xc-textarea__control {
  width: 100%;
  min-height: var(--textarea-min-height-md);
  border: 1px solid var(--field-border-default);
  border-radius: var(--radius-sm);
  background: #fff;
  color: var(--text-body);
  font-family: inherit;
  line-height: var(--type-body-m-line-height);
  outline: none;
  resize: vertical;
  transition:
    border-color 0.15s ease,
    background-color 0.15s ease;
}

.xc-textarea__control::placeholder {
  color: var(--text-disabled);
}

.xc-textarea__control:hover:not(:disabled):not(:read-only) {
  border-color: var(--field-border-hover);
}

.xc-textarea__control:focus {
  border-color: var(--field-border-focus);
  outline: var(--focus-ring-width) solid var(--focus-ring-color);
  outline-offset: var(--focus-ring-offset);
}

.xc-textarea__control:disabled,
.xc-textarea__control:read-only {
  background: var(--field-bg-readonly);
  color: var(--text-secondary);
}

.xc-textarea__control:disabled {
  cursor: not-allowed;
  background: var(--field-bg-disabled);
  color: var(--text-disabled);
}

.xc-textarea__control--error {
  border-color: var(--error-text);
}

.xc-textarea__control--sm {
  min-height: var(--textarea-min-height-sm);
  padding: 8px 12px;
  font-size: var(--type-body-m-size);
}

.xc-textarea__control--md {
  min-height: var(--textarea-min-height-md);
  padding: 10px 12px;
  font-size: var(--type-body-m-size);
}

.xc-textarea__control--lg {
  min-height: var(--textarea-min-height-lg);
  padding: 12px 16px;
  font-size: var(--type-body-l-size);
  line-height: var(--type-body-l-line-height);
}

.xc-textarea__footer {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 6px;
}

.xc-textarea__message,
.xc-textarea__count {
  color: var(--text-tertiary);
  font-size: 12px;
  line-height: 18px;
}

.xc-textarea__count {
  flex-shrink: 0;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

.xc-textarea__message--error {
  color: var(--error-text);
}
</style>
