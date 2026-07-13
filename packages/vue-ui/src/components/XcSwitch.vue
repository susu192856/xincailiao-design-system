<template>
  <button
    type="button"
    class="xc-switch"
    :class="switchClasses"
    :disabled="disabled"
    :aria-checked="checked"
    role="switch"
    @click="toggle"
  >
    <span class="xc-switch__track">
      <span class="xc-switch__thumb" />
    </span>
    <span v-if="$slots.default || label" class="xc-switch__label">
      <slot>{{ label }}</slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

type SwitchSize = "sm" | "md";

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    size?: SwitchSize;
    disabled?: boolean;
    error?: boolean;
    label?: string;
  }>(),
  {
    modelValue: false,
    size: "md",
    disabled: false,
    error: false,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const checked = computed(() => Boolean(props.modelValue));

const switchClasses = computed(() => [
  `xc-switch--${props.size}`,
  {
    "xc-switch--checked": checked.value,
    "xc-switch--error": props.error,
  },
]);

function toggle() {
  emit("update:modelValue", !checked.value);
}
</script>

<style scoped>
.xc-switch {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 0;
  background: transparent;
  color: var(--neutral-900);
  font-family: inherit;
  font-size: 14px;
  line-height: 22px;
  cursor: pointer;
}

.xc-switch:disabled {
  color: var(--neutral-400);
  cursor: not-allowed;
}

.xc-switch__track {
  position: relative;
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  border-radius: var(--radius-full);
  background: var(--neutral-300);
  transition: background-color 0.15s ease;
}

.xc-switch__thumb {
  position: absolute;
  border-radius: var(--radius-full);
  background: #fff;
  box-shadow: var(--shadow-xs);
  transition: transform 0.15s ease;
}

.xc-switch--sm .xc-switch__track {
  width: 32px;
  height: 18px;
}

.xc-switch--sm .xc-switch__thumb {
  left: 2px;
  width: 14px;
  height: 14px;
}

.xc-switch--sm.xc-switch--checked .xc-switch__thumb {
  transform: translateX(14px);
}

.xc-switch--md .xc-switch__track {
  width: 40px;
  height: 22px;
}

.xc-switch--md .xc-switch__thumb {
  left: 2px;
  width: 18px;
  height: 18px;
}

.xc-switch--md.xc-switch--checked .xc-switch__thumb {
  transform: translateX(18px);
}

.xc-switch--checked .xc-switch__track {
  background: var(--product-blue-500);
}

.xc-switch:hover:not(:disabled) .xc-switch__track {
  background: var(--neutral-400);
}

.xc-switch--checked:hover:not(:disabled) .xc-switch__track {
  background: var(--product-blue-600);
}

.xc-switch:focus-visible .xc-switch__track {
  outline: 2px solid var(--neutral-900);
  outline-offset: 2px;
}

.xc-switch:disabled .xc-switch__track {
  background: var(--neutral-200);
}

.xc-switch--checked:disabled .xc-switch__track {
  background: var(--neutral-400);
}

.xc-switch--error .xc-switch__track {
  background: var(--error-text);
}
</style>
