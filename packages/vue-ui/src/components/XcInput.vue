<template>
  <label class="xc-input" :class="rootClasses">
    <span v-if="label" class="xc-input__label" :style="labelStyle">
      {{ label }}<span v-if="required" class="xc-input__required" aria-hidden="true">*</span>
    </span>
    <span class="xc-input__body">
      <span class="xc-input__control-wrap">
        <span v-if="$slots.prefix || $slots.icon" class="xc-input__prefix" aria-hidden="true">
          <slot name="prefix"><slot name="icon" /></slot>
        </span>
        <input
          :id="id"
          class="xc-input__control"
          :class="inputClasses"
          :type="type"
          :name="name"
          :autocomplete="autocomplete"
          :value="modelValue"
          :disabled="disabled"
          :readonly="readOnly"
          :placeholder="placeholder"
          :aria-invalid="Boolean(error)"
          :aria-describedby="error || helperText ? messageId : undefined"
          :aria-required="required || undefined"
          @input="handleInput"
        />
        <span v-if="$slots.suffix" class="xc-input__suffix" aria-hidden="true">
          <slot name="suffix" />
        </span>
      </span>
      <span v-if="error || helperText" :id="messageId" class="xc-input__message" :class="{ 'xc-input__message--error': error }">
        {{ error || helperText }}
      </span>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, useSlots } from "vue";

type InputSize = "sm" | "md" | "lg";
type LabelPosition = "top" | "left";

const props = withDefaults(
  defineProps<{
    modelValue?: string | number;
    label?: string;
    helperText?: string;
    error?: string;
    placeholder?: string;
    size?: InputSize;
    labelPosition?: LabelPosition;
    labelWidth?: number | string;
    disabled?: boolean;
    readOnly?: boolean;
    type?: string;
    name?: string;
    autocomplete?: string;
    id?: string;
    required?: boolean;
  }>(),
  {
    modelValue: "",
    size: "md",
    labelPosition: "top",
    labelWidth: 96,
    disabled: false,
    readOnly: false,
    type: "text",
    required: false,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const slots = useSlots();

const rootClasses = computed(() => ({
  "xc-input--horizontal": props.labelPosition === "left",
}));

const labelStyle = computed(() => {
  if (props.labelPosition !== "left") return undefined;
  return {
    width: typeof props.labelWidth === "number" ? `${props.labelWidth}px` : props.labelWidth,
  };
});

const inputClasses = computed(() => [
  `xc-input__control--${props.size}`,
  {
    "xc-input__control--error": props.error,
    "xc-input__control--with-prefix": Boolean(slots.prefix || slots.icon),
    "xc-input__control--with-suffix": Boolean(slots.suffix),
  },
]);

const messageId = computed(() => (props.id ? `${props.id}-message` : undefined));

function handleInput(event: Event) {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
}
</script>

<style scoped>
.xc-input {
  display: block;
}

.xc-input--horizontal {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.xc-input__label {
  display: block;
  margin-bottom: 6px;
  color: var(--neutral-900);
  font-size: 14px;
  font-weight: 500;
}

.xc-input--horizontal .xc-input__label {
  flex-shrink: 0;
  margin-bottom: 0;
  padding-top: 6px;
  text-align: right;
}

.xc-input__body {
  display: block;
  min-width: 0;
  flex: 1;
}

.xc-input__control-wrap {
  position: relative;
  display: block;
}

.xc-input__prefix,
.xc-input__suffix {
  position: absolute;
  top: 50%;
  display: flex;
  color: var(--neutral-500);
  transform: translateY(-50%);
  pointer-events: none;
}

.xc-input__prefix {
  left: 12px;
}

.xc-input__suffix {
  right: 12px;
  font-size: 12px;
}

.xc-input__required {
  margin-left: 4px;
  color: var(--brand-600);
}

.xc-input__control {
  width: 100%;
  border: 1px solid var(--field-border-default);
  border-radius: var(--radius-sm);
  background: #fff;
  color: var(--neutral-900);
  outline: none;
  transition:
    border-color 0.15s ease,
    background-color 0.15s ease;
}

.xc-input__control::placeholder {
  color: var(--neutral-400);
}

.xc-input__control:hover:not(:disabled) {
  border-color: var(--field-border-hover);
}

.xc-input__control:focus {
  border-color: var(--field-border-focus);
  outline: var(--focus-ring-width) solid var(--focus-ring-color);
  outline-offset: var(--focus-ring-offset);
}

.xc-input__control:disabled {
  cursor: not-allowed;
  background: var(--field-bg-disabled);
  color: var(--neutral-400);
}

.xc-input__control:read-only:not(:disabled) {
  background: var(--field-bg-readonly);
  color: var(--neutral-600);
}

.xc-input__control--error {
  border-color: var(--field-border-error);
}

.xc-input__control--sm {
  height: var(--control-height-sm);
  padding: 0 var(--field-padding-x-sm);
  font-size: 14px;
}

.xc-input__control--md {
  height: var(--control-height-md);
  padding: 0 var(--field-padding-x-md);
  font-size: 14px;
}

.xc-input__control--lg {
  height: var(--control-height-lg);
  padding: 0 var(--field-padding-x-lg);
  font-size: 14px;
}

.xc-input__control--with-prefix {
  padding-left: 36px;
}

.xc-input__control--with-suffix {
  padding-right: 40px;
}

.xc-input__message {
  display: block;
  margin-top: 6px;
  color: var(--neutral-500);
  font-size: 12px;
  line-height: 18px;
}

.xc-input__message--error {
  color: var(--error-text);
}

@media (max-width: 767px) {
  .xc-input--horizontal {
    display: block;
  }

  .xc-input--horizontal .xc-input__label {
    width: auto !important;
    margin-bottom: 6px;
    padding-top: 0;
    text-align: left;
  }

  .xc-input__control {
    min-height: 44px;
  }
}
</style>
