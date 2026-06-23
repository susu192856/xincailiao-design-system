<template>
  <nav class="xc-menu" :class="[`xc-menu--${resolvedOrientation}`, `xc-menu--${size}`, { 'xc-menu--collapsed': collapsed }]">
    <template v-for="item in items" :key="item.key">
      <div v-if="item.type === 'group'" class="xc-menu__group">{{ item.label }}</div>
      <div v-else-if="item.type === 'divider'" class="xc-menu__divider" />
      <button v-else class="xc-menu__item" :class="{ 'xc-menu__item--active': item.key === currentValue }" type="button" :disabled="item.disabled" @click="select(item.key)">
        <span v-if="item.icon" class="xc-menu__icon">{{ item.icon }}</span>
        <span v-if="!collapsed" class="xc-menu__label">{{ item.label }}</span>
        <span v-if="item.badge && !collapsed" class="xc-menu__badge">{{ item.badge }}</span>
      </button>
    </template>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";

type MenuMode = "vertical" | "horizontal";
type MenuSize = "sm" | "md";

export type XcMenuItem = {
  key: string;
  label?: string;
  icon?: string;
  badge?: string | number;
  disabled?: boolean;
  type?: "item" | "group" | "divider";
};

const props = withDefaults(
  defineProps<{
    items: XcMenuItem[];
    modelValue?: string;
    activeKey?: string;
    orientation?: MenuMode;
    mode?: MenuMode;
    collapsed?: boolean;
    size?: MenuSize;
  }>(),
  {
    mode: "vertical",
    collapsed: false,
    size: "md",
  },
);

const emit = defineEmits<{
  "update:modelValue": [key: string];
  select: [key: string];
}>();

const resolvedOrientation = computed(() => props.orientation ?? props.mode);
const currentValue = computed(() => props.modelValue ?? props.activeKey);

function select(key: string) {
  emit("update:modelValue", key);
  emit("select", key);
}
</script>

<style scoped>
.xc-menu {
  display: flex;
  gap: 4px;
  color: var(--neutral-700);
}

.xc-menu--vertical {
  flex-direction: column;
}

.xc-menu--horizontal {
  flex-direction: row;
  align-items: center;
}

.xc-menu__item {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 0;
  border-radius: var(--radius-sm);
  background: transparent;
  color: inherit;
  cursor: pointer;
  font: inherit;
  text-align: left;
}

.xc-menu--sm .xc-menu__item { min-height: 32px; padding: 0 10px; font-size: 13px; }
.xc-menu--md .xc-menu__item { min-height: 36px; padding: 0 12px; font-size: 14px; }
.xc-menu--collapsed .xc-menu__item { justify-content: center; width: 40px; padding: 0; }

.xc-menu__item:hover {
  background: var(--neutral-50);
  color: var(--neutral-900);
}

.xc-menu__item--active {
  background: var(--neutral-900);
  color: #fff;
}

.xc-menu__item:disabled {
  color: var(--neutral-400);
  cursor: not-allowed;
}

.xc-menu__icon {
  width: 16px;
  text-align: center;
}

.xc-menu__badge {
  margin-left: auto;
  color: var(--brand-600);
  font-size: 12px;
}

.xc-menu__group {
  padding: 12px 12px 6px;
  color: var(--neutral-500);
  font-size: 12px;
}

.xc-menu__divider {
  height: 1px;
  margin: 8px 0;
  background: var(--neutral-200);
}
</style>
