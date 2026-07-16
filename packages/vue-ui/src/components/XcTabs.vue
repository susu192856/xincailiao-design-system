<template>
  <div class="xc-tabs" :class="[`xc-tabs--${variant}`, `xc-tabs--${size}`]">
    <div class="xc-tabs__list" role="tablist" aria-orientation="horizontal">
      <button
        v-for="item in items"
        :key="item.value"
        type="button"
        class="xc-tabs__trigger"
        :class="{ 'xc-tabs__trigger--active': item.value === currentValue }"
        :disabled="item.disabled"
        :title="item.disabled ? item.disabledReason : undefined"
        role="tab"
        :aria-selected="item.value === currentValue"
        :aria-controls="`${instanceId}-${item.value}-panel`"
        :id="`${instanceId}-${item.value}-tab`"
        :tabindex="item.value === currentValue ? 0 : -1"
        @click="selectTab(item.value)"
        @keydown="handleKeydown($event, item.value)"
      >
        {{ item.label }}
      </button>
    </div>

    <div
      class="xc-tabs__panel"
      role="tabpanel"
      :id="`${instanceId}-${currentValue}-panel`"
      :aria-labelledby="`${instanceId}-${currentValue}-tab`"
    >
      <slot :value="currentValue">
        <slot :name="currentValue" />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useId } from "vue";

export type XcTabItem = {
  label: string;
  value: string;
  disabled?: boolean;
  disabledReason?: string;
};

const props = withDefaults(
  defineProps<{
    items: XcTabItem[];
    modelValue?: string;
    variant?: "line" | "page" | "card" | "segment" | "text";
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

const instanceId = useId().replace(/:/g, "");
const currentValue = computed(() => props.modelValue || props.items[0]?.value || "");

function selectTab(value: string) {
  if (value === currentValue.value) return;
  emit("update:modelValue", value);
  emit("change", value);
}

function handleKeydown(event: KeyboardEvent, currentItemValue: string) {
  if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;

  const enabledItems = props.items.filter((item) => !item.disabled);
  const currentIndex = enabledItems.findIndex((item) => item.value === currentItemValue);
  if (currentIndex < 0 || enabledItems.length === 0) return;

  event.preventDefault();
  let nextIndex = currentIndex;
  if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % enabledItems.length;
  if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + enabledItems.length) % enabledItems.length;
  if (event.key === "Home") nextIndex = 0;
  if (event.key === "End") nextIndex = enabledItems.length - 1;

  const nextItem = enabledItems[nextIndex];
  selectTab(nextItem.value);

  const currentButton = event.currentTarget as HTMLButtonElement;
  const enabledButtons = currentButton.parentElement?.querySelectorAll<HTMLButtonElement>("button:not(:disabled)");
  enabledButtons?.[nextIndex]?.focus();
}
</script>

<style scoped>
.xc-tabs {
  min-width: 0;
}

.xc-tabs__list {
  display: flex;
  gap: 16px;
  border-bottom: 1px solid var(--neutral-200);
  overflow-x: auto;
}

.xc-tabs__trigger {
  position: relative;
  border: 0;
  border-bottom: 0;
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

.xc-tabs:not(.xc-tabs--page):not(.xc-tabs--card):not(.xc-tabs--segment):not(.xc-tabs--text) .xc-tabs__trigger--active::after {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 32px;
  height: 2px;
  background: var(--neutral-900);
  content: "";
  transform: translateX(-50%);
}

.xc-tabs--sm .xc-tabs__trigger { padding: 6px 12px; font-size: 12px; }
.xc-tabs--lg .xc-tabs__trigger { padding: 10px 20px; font-size: 16px; }
.xc-tabs--segment .xc-tabs__list {
  width: fit-content;
  gap: 4px;
  border: 0;
  border-radius: var(--radius-sm);
  background: var(--neutral-100);
  padding: 2px;
}
.xc-tabs--page .xc-tabs__list { display: inline-grid; width: fit-content; grid-auto-flow: column; grid-auto-columns: 1fr; gap: 0; border: 0; border-radius: var(--radius-sm); background: var(--neutral-100); }
.xc-tabs--page .xc-tabs__trigger { position: relative; width: 100%; height: 40px; justify-content: center; border: 0; padding: 6px 14px; font-size: 16px; }
.xc-tabs--page .xc-tabs__trigger:not(:last-child)::after { position: absolute; top: 50%; right: 0; width: 1px; height: 16px; background: var(--neutral-200); content: ""; transform: translateY(-50%); }
.xc-tabs--page .xc-tabs__trigger--active { background: #fff; font-weight: 500; }
.xc-tabs--text .xc-tabs__list { width: fit-content; gap: 12px; border: 0; }
.xc-tabs--text .xc-tabs__trigger { border: 0; padding-right: 8px; padding-left: 8px; }
.xc-tabs--text .xc-tabs__trigger:not(:last-child)::after { position: absolute; top: 50%; right: -6px; width: 1px; height: 12px; background: var(--neutral-300); content: ""; transform: translateY(-50%); }
.xc-tabs--text .xc-tabs__trigger { position: relative; }
.xc-tabs--text .xc-tabs__trigger--active { color: var(--product-blue-600); font-weight: 400; }
.xc-tabs--segment .xc-tabs__trigger { border: 0; border-radius: var(--radius-sm); }
.xc-tabs--segment.xc-tabs--sm .xc-tabs__trigger { height: 24px; padding: 0 8px; }
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

.xc-tabs--page .xc-tabs__panel {
  min-height: 48px;
  background: var(--neutral-50);
  padding: 16px;
}
</style>
