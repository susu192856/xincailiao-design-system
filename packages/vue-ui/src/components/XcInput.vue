<template>
  <label class="xc-input">
    <span v-if="label" class="xc-input__label">{{ label }}</span>
    <span class="xc-input__control-wrap">
      <span v-if="$slots.icon" class="xc-input__icon" aria-hidden="true">
        <slot name="icon" />
      </span>
      <input
        class="xc-input__control"
        :class="inputClasses"
        :type="type"
        :name="name"
        :autocomplete="autocomplete"
        :value="modelValue"
        :disabled="disabled"
        :placeholder="placeholder"
        :aria-invalid="Boolean(error)"
        @input="handleInput"
      />
    </span>
    <span v-if="error || helperText" class="xc-input__message" :class="{ 'xc-input__message--error': error }">
      {{ error || helperText }}
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, useSlots } from "vue";

type InputSize = "sm" | "md" | "lg";

const props = withDefaults(
  defineProps<{
    modelValue?: string | number;
    label?: string;
    helperText?: string;
    error?: string;
    placeholder?: string;
    size?: InputSize;
    disabled?: boolean;
    type?: string;
    name?: string;
    autocomplete?: string;
  }>(),
  {
    modelValue: "",
    size: "md",
    disabled: false,
    type: "text",
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const slots = useSlots();

const inputClasses = computed(() => [
  `xc-input__control--${props.size}`,
  {
    "xc-input__control--error": props.error,
    "xc-input__control--with-icon": Boolean(slots.icon),
  },
]);

function handleInput(event: Event) {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
}
</script>

<style scoped>
.xc-input {
  display: block;
}

.xc-input__label {
  display: block;
  margin-bottom: 6px;
  color: var(--neutral-900);
  font-size: 14px;
  font-weight: 500;
}

.xc-input__control-wrap {
  position: relative;
  display: block;
}

.xc-input__icon {
  position: absolute;
  left: 12px;
  top: 50%;
  display: flex;
  color: var(--neutral-500);
  transform: translateY(-50%);
  pointer-events: none;
}

.xc-input__control {
  width: 100%;
  border: 1px solid var(--neutral-300);
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
  border-color: var(--neutral-400);
}

.xc-input__control:focus {
  border-color: var(--neutral-900);
}

.xc-input__control:disabled {
  cursor: not-allowed;
  background: var(--neutral-100);
  color: var(--neutral-400);
}

.xc-input__control--error {
  border-color: var(--error-text);
}

.xc-input__control--sm {
  height: 32px;
  padding: 0 12px;
  font-size: 14px;
}

.xc-input__control--md {
  height: 36px;
  padding: 0 12px;
  font-size: 14px;
}

.xc-input__control--lg {
  height: 40px;
  padding: 0 16px;
  font-size: 16px;
}

.xc-input__control--with-icon {
  padding-left: 36px;
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
</style>
