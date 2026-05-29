<template>
  <div class="xc-tabs">
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

const props = defineProps<{
  items: XcTabItem[];
  modelValue?: string;
}>();

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
