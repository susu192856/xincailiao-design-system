<template>
  <nav class="xc-breadcrumb" aria-label="面包屑">
    <ol class="xc-breadcrumb__list">
      <li v-for="(item, index) in visibleItems" :key="index" class="xc-breadcrumb__item">
        <span v-if="index > 0" class="xc-breadcrumb__separator">/</span>
        <a v-if="item.href && !isLast(index) && !item.disabled" class="xc-breadcrumb__link" :href="item.href">{{ item.label }}</a>
        <span v-else class="xc-breadcrumb__text" :class="{ 'xc-breadcrumb__text--current': isLast(index) || item.current, 'xc-breadcrumb__text--disabled': item.disabled }">
          {{ item.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";

export type XcBreadcrumbItem = {
  label: string;
  href?: string;
  current?: boolean;
  disabled?: boolean;
};

const props = defineProps<{
  items: XcBreadcrumbItem[];
  maxItems?: number;
}>();

const visibleItems = computed(() => {
  if (!props.maxItems || props.items.length <= props.maxItems || props.maxItems < 3) return props.items;
  return [props.items[0], { label: "...", disabled: true }, ...props.items.slice(props.items.length - (props.maxItems - 2))];
});

function isLast(index: number) {
  return index === visibleItems.value.length - 1;
}
</script>

<style scoped>
.xc-breadcrumb__list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  margin: 0;
  padding: 0;
  list-style: none;
  color: var(--neutral-500);
  font-size: 14px;
  line-height: 22px;
}

.xc-breadcrumb__item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.xc-breadcrumb__separator {
  color: var(--neutral-300);
}

.xc-breadcrumb__link {
  color: inherit;
  text-decoration: none;
}

.xc-breadcrumb__link:hover {
  color: var(--neutral-900);
}

.xc-breadcrumb__text--current {
  color: var(--neutral-900);
}

.xc-breadcrumb__text--disabled {
  color: var(--neutral-400);
}
</style>
