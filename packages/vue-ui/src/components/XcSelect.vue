<template>
  <label class="xc-select" :class="rootClasses">
    <span v-if="label" class="xc-select__label" :style="labelStyle">
      {{ label }}<span v-if="required" class="xc-select__required">*</span>
    </span>
    <span class="xc-select__body">
      <span class="xc-select__control-wrap">
        <select
          :id="controlId"
          class="xc-select__control"
          :class="selectClasses"
          :value="modelValue"
          :disabled="disabled || loading"
          :required="required"
          :name="name"
          :aria-invalid="Boolean(error)"
          :aria-describedby="messageId"
          :aria-busy="loading"
          @change="handleChange"
        >
          <option v-if="placeholder" value="" :disabled="required">{{ placeholder }}</option>
          <option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
            :disabled="option.disabled"
          >
            {{ option.label }}
          </option>
        </select>
        <span v-if="loading" class="xc-select__spinner" aria-hidden="true" />
        <span v-else class="xc-select__caret" aria-hidden="true" />
      </span>
      <span v-if="error || helperText" :id="messageId" class="xc-select__message" :class="{ 'xc-select__message--error': error }">
        {{ error || helperText }}
      </span>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, useId } from "vue";

type SelectSize = "sm" | "md" | "lg";
type LabelPosition = "top" | "left";

export type XcSelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    options: XcSelectOption[];
    label?: string;
    helperText?: string;
    error?: string;
    placeholder?: string;
    size?: SelectSize;
    labelPosition?: LabelPosition;
    labelWidth?: number | string;
    disabled?: boolean;
    loading?: boolean;
    required?: boolean;
    name?: string;
  }>(),
  {
    modelValue: "",
    size: "md",
    labelPosition: "top",
    labelWidth: 96,
    disabled: false,
    loading: false,
    required: false,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
  change: [value: string];
}>();

const selectClasses = computed(() => [
  `xc-select__control--${props.size}`,
  {
    "xc-select__control--error": props.error,
  },
]);

const rootClasses = computed(() => ({
  "xc-select--horizontal": props.labelPosition === "left",
}));

const labelStyle = computed(() => {
  if (props.labelPosition !== "left") return undefined;
  return {
    "--select-label-width": typeof props.labelWidth === "number" ? `${props.labelWidth}px` : props.labelWidth,
  };
});
const generatedId = useId();
const controlId = computed(() => props.name || `select-${generatedId}`);
const messageId = computed(() => (props.error || props.helperText ? `${controlId.value}-message` : undefined));

function handleChange(event: Event) {
  const value = (event.target as HTMLSelectElement).value;
  emit("update:modelValue", value);
  emit("change", value);
}
</script>

<style scoped>
.xc-select {
  display: block;
}

.xc-select--horizontal {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.xc-select__label {
  display: block;
  margin-bottom: 6px;
  color: var(--neutral-900);
  font-size: 14px;
  font-weight: 500;
}

.xc-select__required {
  margin-left: 4px;
  color: var(--brand-600);
}

.xc-select--horizontal .xc-select__label {
  flex-shrink: 0;
  margin-bottom: 0;
  padding-top: 6px;
  width: var(--select-label-width);
  text-align: right;
}

.xc-select__body {
  display: block;
  min-width: 0;
  flex: 1;
}

.xc-select__control-wrap {
  position: relative;
  display: block;
}

.xc-select__control {
  width: 100%;
  appearance: none;
  border: 1px solid var(--field-border-default);
  border-radius: var(--radius-sm);
  background: #fff;
  color: var(--text-body);
  outline: none;
  transition:
    border-color 0.15s ease,
    background-color 0.15s ease;
}

.xc-select__control:hover:not(:disabled) {
  border-color: var(--field-border-hover);
}

.xc-select__control:focus {
  border-color: var(--field-border-focus);
  outline: var(--focus-ring-width) solid var(--focus-ring-color);
  outline-offset: var(--focus-ring-offset);
}

.xc-select__control:disabled {
  cursor: not-allowed;
  background: var(--field-bg-disabled);
  color: var(--text-disabled);
}

.xc-select__control--error {
  border-color: var(--error-text);
}

.xc-select__control--sm {
  height: var(--control-height-sm);
  padding: 0 32px 0 10px;
  font-size: 14px;
}

.xc-select__control--md {
  height: var(--control-height-md);
  padding: 0 36px 0 12px;
  font-size: 14px;
}

.xc-select__control--lg {
  height: var(--control-height-lg);
  padding: 0 36px 0 12px;
  font-size: 14px;
}

.xc-select__caret {
  position: absolute;
  right: 14px;
  top: 50%;
  width: 8px;
  height: 8px;
  border-right: 1.5px solid var(--neutral-600);
  border-bottom: 1.5px solid var(--neutral-600);
  pointer-events: none;
  transform: translateY(-65%) rotate(45deg);
}

.xc-select__spinner {
  position: absolute;
  right: 12px;
  top: 50%;
  width: 14px;
  height: 14px;
  margin-top: -7px;
  border: 2px solid var(--neutral-300);
  border-top-color: var(--text-tertiary);
  border-radius: 50%;
  animation: xc-select-spin 0.8s linear infinite;
}

@keyframes xc-select-spin {
  to { transform: rotate(360deg); }
}

.xc-select__message {
  display: block;
  margin-top: 6px;
  color: var(--text-tertiary);
  font-size: 12px;
  line-height: 18px;
}

@media (max-width: 639px) {
  .xc-select--horizontal {
    flex-direction: column;
    gap: 6px;
  }

  .xc-select--horizontal .xc-select__label {
    width: 100%;
    padding-top: 0;
    text-align: left;
  }

  .xc-select__control {
    min-height: var(--touch-target-min);
  }
}

.xc-select__message--error {
  color: var(--error-text);
}
</style>
