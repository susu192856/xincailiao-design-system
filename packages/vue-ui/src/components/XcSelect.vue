<template>
  <label class="xc-select" :class="rootClasses">
    <span v-if="label" class="xc-select__label" :style="labelStyle">{{ label }}</span>
    <span class="xc-select__body">
      <span class="xc-select__control-wrap">
        <select
          class="xc-select__control"
          :class="selectClasses"
          :value="modelValue"
          :disabled="disabled"
          :name="name"
          :aria-invalid="Boolean(error)"
          @change="handleChange"
        >
          <option v-if="placeholder" value="">{{ placeholder }}</option>
          <option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
            :disabled="option.disabled"
          >
            {{ option.label }}
          </option>
        </select>
        <span class="xc-select__caret" aria-hidden="true" />
      </span>
      <span v-if="error || helperText" class="xc-select__message" :class="{ 'xc-select__message--error': error }">
        {{ error || helperText }}
      </span>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed } from "vue";

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
    name?: string;
  }>(),
  {
    modelValue: "",
    size: "md",
    labelPosition: "top",
    labelWidth: 96,
    disabled: false,
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
    width: typeof props.labelWidth === "number" ? `${props.labelWidth}px` : props.labelWidth,
  };
});

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

.xc-select--horizontal .xc-select__label {
  flex-shrink: 0;
  margin-bottom: 0;
  padding-top: 6px;
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
  border: 1px solid var(--neutral-300);
  border-radius: var(--radius-sm);
  background: #fff;
  color: var(--neutral-900);
  outline: none;
  transition:
    border-color 0.15s ease,
    background-color 0.15s ease;
}

.xc-select__control:hover:not(:disabled) {
  border-color: var(--neutral-400);
}

.xc-select__control:focus {
  border-color: var(--neutral-900);
}

.xc-select__control:disabled {
  cursor: not-allowed;
  background: var(--neutral-100);
  color: var(--neutral-400);
}

.xc-select__control--error {
  border-color: var(--error-text);
}

.xc-select__control--sm {
  height: 28px;
  padding: 0 32px 0 10px;
  font-size: 14px;
}

.xc-select__control--md {
  height: 32px;
  padding: 0 36px 0 12px;
  font-size: 14px;
}

.xc-select__control--lg {
  height: 36px;
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

.xc-select__message {
  display: block;
  margin-top: 6px;
  color: var(--neutral-500);
  font-size: 12px;
  line-height: 18px;
}

.xc-select__message--error {
  color: var(--error-text);
}
</style>
