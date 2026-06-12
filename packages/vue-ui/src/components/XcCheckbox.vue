<template>
  <label class="xc-checkbox" :class="{ 'xc-checkbox--disabled': disabled }">
    <span class="xc-checkbox__box" :class="boxClasses" aria-hidden="true">
      <span v-if="checked && !indeterminate" class="xc-checkbox__mark">✓</span>
      <span v-if="indeterminate" class="xc-checkbox__mark">−</span>
    </span>
    <input
      class="xc-checkbox__input"
      type="checkbox"
      :checked="checked"
      :disabled="disabled"
      :aria-invalid="Boolean(error)"
      @change="handleChange"
    />
    <span class="xc-checkbox__content">
      <span class="xc-checkbox__label">
        <slot>{{ label }}</slot>
      </span>
      <span v-if="error || helperText" class="xc-checkbox__message" :class="{ 'xc-checkbox__message--error': error }">
        {{ error || helperText }}
      </span>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    label?: string;
    helperText?: string;
    error?: string;
    disabled?: boolean;
    indeterminate?: boolean;
  }>(),
  {
    modelValue: false,
    disabled: false,
    indeterminate: false,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const checked = computed(() => Boolean(props.modelValue));

const boxClasses = computed(() => ({
  "xc-checkbox__box--checked": checked.value,
  "xc-checkbox__box--indeterminate": props.indeterminate,
  "xc-checkbox__box--error": props.error,
}));

function handleChange(event: Event) {
  emit("update:modelValue", (event.target as HTMLInputElement).checked);
}
</script>

<style scoped>
.xc-checkbox {
  position: relative;
  display: inline-flex;
  align-items: flex-start;
  gap: 8px;
  color: var(--neutral-900);
  font-size: 14px;
  line-height: 22px;
  cursor: pointer;
}

.xc-checkbox--disabled {
  color: var(--neutral-400);
  cursor: not-allowed;
}

.xc-checkbox__input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.xc-checkbox__box {
  display: inline-flex;
  width: 16px;
  height: 16px;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  margin-top: 3px;
  border: 1px solid var(--neutral-300);
  border-radius: var(--radius-sm);
  background: #fff;
  color: #fff;
  font-size: 12px;
  line-height: 1;
}

.xc-checkbox__box--checked,
.xc-checkbox__box--indeterminate {
  border-color: var(--product-blue-500);
  background: var(--product-blue-500);
}

.xc-checkbox__box--error {
  border-color: var(--error-text);
}

.xc-checkbox--disabled .xc-checkbox__box {
  border-color: var(--neutral-200);
  background: var(--neutral-100);
}

.xc-checkbox__content {
  display: grid;
  gap: 2px;
}

.xc-checkbox__message {
  color: var(--neutral-500);
  font-size: 12px;
  line-height: 18px;
}

.xc-checkbox__message--error {
  color: var(--error-text);
}
</style>
