<template>
  <label class="xc-radio" :class="{ 'xc-radio--disabled': disabled }">
    <span class="xc-radio__dot" :class="dotClasses" aria-hidden="true" />
    <input
      class="xc-radio__input"
      type="radio"
      :name="name"
      :value="value"
      :checked="checked"
      :disabled="disabled"
      :aria-invalid="Boolean(error)"
      @change="handleChange"
    />
    <span class="xc-radio__content">
      <span class="xc-radio__label">
        <slot>{{ label }}</slot>
      </span>
      <span v-if="error || helperText" class="xc-radio__message" :class="{ 'xc-radio__message--error': error }">
        {{ error || helperText }}
      </span>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed } from "vue";

type RadioValue = string | number | boolean;

const props = withDefaults(
  defineProps<{
    modelValue?: RadioValue;
    value?: RadioValue;
    name?: string;
    label?: string;
    helperText?: string;
    error?: string;
    disabled?: boolean;
  }>(),
  {
    value: true,
    disabled: false,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: RadioValue];
}>();

const checked = computed(() => props.modelValue === props.value);

const dotClasses = computed(() => ({
  "xc-radio__dot--checked": checked.value,
  "xc-radio__dot--error": props.error,
}));

function handleChange() {
  emit("update:modelValue", props.value);
}
</script>

<style scoped>
.xc-radio {
  position: relative;
  display: inline-flex;
  align-items: flex-start;
  gap: 8px;
  color: var(--neutral-900);
  font-size: 14px;
  line-height: 22px;
  cursor: pointer;
}

.xc-radio--disabled {
  color: var(--neutral-400);
  cursor: not-allowed;
}

.xc-radio__input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.xc-radio__dot {
  position: relative;
  width: 16px;
  height: 16px;
  flex: 0 0 auto;
  margin-top: 3px;
  border: 1px solid var(--neutral-300);
  border-radius: var(--radius-full);
  background: #fff;
}

.xc-radio__dot--checked {
  border-color: var(--product-blue-500);
}

.xc-radio__dot--checked::after {
  position: absolute;
  left: 4px;
  top: 4px;
  width: 6px;
  height: 6px;
  border-radius: var(--radius-full);
  background: var(--product-blue-500);
  content: "";
}

.xc-radio__dot--error {
  border-color: var(--error-text);
}

.xc-radio--disabled .xc-radio__dot {
  border-color: var(--neutral-200);
  background: var(--neutral-100);
}

.xc-radio__content {
  display: grid;
  gap: 2px;
}

.xc-radio__message {
  color: var(--neutral-500);
  font-size: 12px;
  line-height: 18px;
}

.xc-radio__message--error {
  color: var(--error-text);
}
</style>
