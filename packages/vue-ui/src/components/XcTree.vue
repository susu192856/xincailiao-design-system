<template>
  <div class="xc-tree">
    <div v-for="node in nodes" :key="node.key" class="xc-tree__node">
      <button class="xc-tree__row" :class="{ 'xc-tree__row--selected': node.key === selectedKey }" type="button" :disabled="node.disabled" @click="$emit('select', node.key)">
        <span class="xc-tree__caret" :class="{ 'xc-tree__caret--expanded': node.children?.length }" aria-hidden="true" />
        <span class="xc-tree__label">{{ node.label }}</span>
      </button>
      <div v-if="node.children?.length" class="xc-tree__children">
        <button v-for="child in node.children" :key="child.key" class="xc-tree__row" :class="{ 'xc-tree__row--selected': child.key === selectedKey }" type="button" :disabled="child.disabled" @click="$emit('select', child.key)">
          <span class="xc-tree__caret" />
          <span class="xc-tree__label">{{ child.label }}</span>
        </button>
      </div>
    </div>
    <div v-if="nodes.length === 0" class="xc-tree__empty">{{ emptyText }}</div>
  </div>
</template>

<script setup lang="ts">
export type XcTreeNode = {
  key: string;
  label: string;
  disabled?: boolean;
  children?: XcTreeNode[];
};

withDefaults(
  defineProps<{
    nodes: XcTreeNode[];
    selectedKey?: string;
    emptyText?: string;
  }>(),
  {
    emptyText: "暂无数据",
  },
);

defineEmits<{
  select: [key: string];
}>();
</script>

<style scoped>
.xc-tree {
  color: var(--neutral-700);
  font-size: 14px;
}

.xc-tree__row {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 6px;
  border: 0;
  border-radius: var(--radius-sm);
  background: transparent;
  color: inherit;
  cursor: pointer;
  min-height: 32px;
  padding: 0 8px;
  text-align: left;
}

.xc-tree__row:hover {
  background: var(--neutral-50);
  color: var(--neutral-900);
}

.xc-tree__row--selected {
  background: var(--product-blue-50);
  color: var(--product-blue-700);
}

.xc-tree__row:disabled {
  color: var(--neutral-400);
  cursor: not-allowed;
}

.xc-tree__caret {
  width: 0;
  height: 0;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  border-left: 6px solid currentColor;
  color: var(--neutral-500);
}

.xc-tree__caret:not(.xc-tree__caret--expanded) {
  width: 6px;
  border: 0;
}

.xc-tree__caret--expanded {
  transform: rotate(90deg);
}

.xc-tree__children {
  margin-left: 20px;
}

.xc-tree__empty {
  border: 1px dashed var(--neutral-200);
  padding: 24px;
  color: var(--neutral-500);
  text-align: center;
}
</style>
