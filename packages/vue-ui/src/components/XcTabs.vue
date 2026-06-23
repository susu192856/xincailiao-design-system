<template>
  <div class="xc-tabs" :class="[`xc-tabs--${variant}`, `xc-tabs--${size}`]">
    <div class="xc-tabs__list" role="tablist">
      <button
        v-for="item in items"
        :key="item.value"
        type="button"
        class="xc-tabs__trigger"
        :class="{ 'xc-tabs__trigger--active': item.value === currentValue }"
        :disabled="item.disabled"
        role="tab"
        :aria-selected="item.value === currentValue"
        @click="selectTab(item.value)"
      >
        {{ item.label }}
      </button>
    </div>

    <div class="xc-tabs__panel" role="tabpanel">
      <slot :value="currentValue">
        <slot :name="currentValue" />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

export type XcTabItem = {
  label: string;
  value: string;
  disabled?: boolean;
};

const props = withDefaults(
  defineProps<{
    items: XcTabItem[];
    modelValue?: string;
    variant?: "line" | "card" | "segment";
    size?: "sm" | "md" | "lg";
  }>(),
  {
    variant: "line",
    size: "md",
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
  change: [value: string];
}>();

const currentValue = computed(() => props.modelValue || props.items[0]?.value || "");

function selectTab(value: string) {
  if (value === currentValue.value) return;
  emit("update:modelValue", value);
  emit("change", value);
}
</script>

<style scoped>
.xc-tabs {
  min-width: 0;
}

.xc-tabs__list {
  display: flex;
  border-bottom: 1px solid var(--neutral-200);
  overflow-x: auto;
}

.xc-tabs__trigger {
  border: 0;
  border-bottom: 2px solid transparent;
  background: transparent;
  color: var(--neutral-600);
  cursor: pointer;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 500;
  transition:
    border-color 0.15s ease,
    color 0.15s ease;
}

.xc-tabs--sm .xc-tabs__trigger { padding: 6px 12px; font-size: 12px; }
.xc-tabs--lg .xc-tabs__trigger { padding: 10px 20px; font-size: 16px; }
.xc-tabs--segment .xc-tabs__list {
  width: fit-content;
  gap: 4px;
  border: 0;
  border-radius: var(--radius-sm);
  background: var(--neutral-100);
  padding: 4px;
}
.xc-tabs--segment .xc-tabs__trigger { border: 0; border-radius: var(--radius-sm); }
.xc-tabs--segment .xc-tabs__trigger--active { background: #fff; box-shadow: var(--shadow-xs); }
.xc-tabs--card .xc-tabs__list { gap: 4px; border: 0; }
.xc-tabs--card .xc-tabs__trigger { border: 1px solid var(--neutral-200); }

.xc-tabs__trigger:hover:not(:disabled) {
  color: var(--neutral-900);
}

.xc-tabs__trigger:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}

.xc-tabs__trigger--active {
  border-bottom-color: var(--neutral-900);
  color: var(--neutral-900);
}

.xc-tabs__panel {
  padding-top: 16px;
}
</style>
