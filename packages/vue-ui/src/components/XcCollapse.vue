<template>
  <div class="xc-collapse" :class="[`xc-collapse--${variant}`, `xc-collapse--${size}`]">
    <div v-for="item in items" :key="item.key" class="xc-collapse__item" :class="{ 'xc-collapse__item--disabled': item.disabled }">
      <button class="xc-collapse__trigger" type="button" :disabled="item.disabled" @click="toggle(item.key)">
        <span class="xc-collapse__chevron" :class="{ 'xc-collapse__chevron--open': isOpen(item.key) }">›</span>
        <span class="xc-collapse__title">{{ item.title }}</span>
        <span v-if="item.extra" class="xc-collapse__extra">{{ item.extra }}</span>
      </button>
      <div v-if="isOpen(item.key)" class="xc-collapse__panel">
        {{ item.content }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

type CollapseSize = "sm" | "md";
type CollapseVariant = "outlined" | "plain";

export type XcCollapseItem = {
  key: string;
  title: string;
  content?: string;
  disabled?: boolean;
  extra?: string;
};

const props = withDefaults(
  defineProps<{
    items: XcCollapseItem[];
    modelValue?: string[];
    defaultOpenKeys?: string[];
    accordion?: boolean;
    size?: CollapseSize;
    variant?: CollapseVariant;
  }>(),
  {
    defaultOpenKeys: () => [],
    accordion: false,
    size: "md",
    variant: "outlined",
  },
);

const emit = defineEmits<{
  "update:modelValue": [keys: string[]];
}>();

const openKeys = ref<string[]>(props.modelValue ?? props.defaultOpenKeys);

watch(
  () => props.modelValue,
  (value) => {
    if (value) openKeys.value = value;
  },
);

function isOpen(key: string) {
  return openKeys.value.includes(key);
}

function toggle(key: string) {
  const next = isOpen(key)
    ? openKeys.value.filter((item) => item !== key)
    : props.accordion
      ? [key]
      : [...openKeys.value, key];
  openKeys.value = next;
  emit("update:modelValue", next);
}
</script>

<style scoped>
.xc-collapse {
  background: #fff;
  color: var(--neutral-900);
}

.xc-collapse--outlined {
  border: 1px solid var(--neutral-200);
  border-radius: var(--radius-sm);
}

.xc-collapse__item + .xc-collapse__item {
  border-top: 1px solid var(--neutral-200);
}

.xc-collapse__trigger {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 8px;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font: inherit;
  text-align: left;
}

.xc-collapse--sm .xc-collapse__trigger { padding: 10px 12px; }
.xc-collapse--md .xc-collapse__trigger { padding: 14px 16px; }

.xc-collapse__chevron {
  color: var(--neutral-500);
  transform: rotate(0deg);
  transition: transform 0.16s ease;
}

.xc-collapse__chevron--open {
  transform: rotate(90deg);
}

.xc-collapse__title {
  flex: 1;
  font-size: 14px;
  line-height: 22px;
}

.xc-collapse__extra {
  color: var(--neutral-500);
  font-size: 12px;
}

.xc-collapse__panel {
  border-top: 1px solid var(--neutral-100);
  padding: 12px 16px 16px 36px;
  color: var(--neutral-600);
  font-size: 14px;
  line-height: 22px;
}

.xc-collapse__item--disabled {
  color: var(--neutral-400);
}

.xc-collapse__item--disabled .xc-collapse__trigger {
  cursor: not-allowed;
}
</style>
