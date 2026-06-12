<template>
  <div class="xc-transfer" :class="{ 'xc-transfer--disabled': disabled }">
    <section class="xc-transfer__panel">
      <header class="xc-transfer__header">{{ sourceTitle }} <span>{{ source.length }}</span></header>
      <input v-if="searchable" class="xc-transfer__search" placeholder="搜索" />
      <button v-for="item in source" :key="item.key" class="xc-transfer__item" type="button" :disabled="item.disabled || disabled" @click="toggle(item.key)">
        <span class="xc-transfer__checkbox" :class="{ 'xc-transfer__checkbox--checked': selectedKeys.includes(item.key) }" />
        {{ item.label }}
      </button>
    </section>
    <div class="xc-transfer__actions">
      <button type="button" :disabled="disabled" @click="$emit('moveRight')">›</button>
      <button type="button" :disabled="disabled" @click="$emit('moveLeft')">‹</button>
    </div>
    <section class="xc-transfer__panel">
      <header class="xc-transfer__header">{{ targetTitle }} <span>{{ target.length }}</span></header>
      <button v-for="item in target" :key="item.key" class="xc-transfer__item" type="button" :disabled="item.disabled || disabled" @click="toggle(item.key)">
        <span class="xc-transfer__checkbox" :class="{ 'xc-transfer__checkbox--checked': selectedKeys.includes(item.key) }" />
        {{ item.label }}
      </button>
    </section>
  </div>
</template>

<script setup lang="ts">
export type XcTransferItem = {
  key: string;
  label: string;
  disabled?: boolean;
};

const props = withDefaults(
  defineProps<{
    source: XcTransferItem[];
    target: XcTransferItem[];
    selectedKeys?: string[];
    sourceTitle?: string;
    targetTitle?: string;
    disabled?: boolean;
    searchable?: boolean;
  }>(),
  {
    selectedKeys: () => [],
    sourceTitle: "可选项",
    targetTitle: "已选项",
    disabled: false,
    searchable: false,
  },
);

const emit = defineEmits<{
  "update:selectedKeys": [keys: string[]];
  moveRight: [];
  moveLeft: [];
}>();

function toggle(key: string) {
  const next = props.selectedKeys.includes(key) ? props.selectedKeys.filter((item) => item !== key) : [...props.selectedKeys, key];
  emit("update:selectedKeys", next);
}
</script>

<style scoped>
.xc-transfer {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 48px minmax(0, 1fr);
  gap: 12px;
  color: var(--neutral-900);
}

.xc-transfer__panel {
  overflow: hidden;
  border: 1px solid var(--neutral-200);
  border-radius: var(--radius-sm);
  background: #fff;
}

.xc-transfer__header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--neutral-200);
  padding: 10px 12px;
  color: var(--neutral-900);
  font-size: 14px;
}

.xc-transfer__search {
  width: calc(100% - 24px);
  height: 32px;
  border: 1px solid var(--neutral-200);
  margin: 12px;
  padding: 0 8px;
}

.xc-transfer__item {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 8px;
  border: 0;
  background: #fff;
  color: inherit;
  cursor: pointer;
  padding: 9px 12px;
  text-align: left;
}

.xc-transfer__item:hover {
  background: var(--neutral-50);
}

.xc-transfer__checkbox {
  width: 14px;
  height: 14px;
  border: 1px solid var(--neutral-300);
  border-radius: var(--radius-sm);
}

.xc-transfer__checkbox--checked {
  border-color: var(--product-blue-500);
  background: var(--product-blue-500);
}

.xc-transfer__actions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
}

.xc-transfer__actions button {
  height: 32px;
  border: 1px solid var(--neutral-300);
  border-radius: var(--radius-sm);
  background: #fff;
  cursor: pointer;
}

.xc-transfer--disabled {
  opacity: 0.6;
  pointer-events: none;
}
</style>
