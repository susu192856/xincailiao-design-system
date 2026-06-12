<template>
  <dl
    class="xc-description-list"
    :class="[
      columnClass,
      `xc-description-list--${size}`,
      `xc-description-list--${layout}`,
      { 'xc-description-list--bordered': bordered },
    ]"
  >
    <div v-for="(item, index) in items" :key="index" class="xc-description-list__item" :class="spanClass(item.span)">
      <dt class="xc-description-list__label" :style="labelStyle">{{ item.label }}</dt>
      <dd class="xc-description-list__value">{{ item.value ?? emptyText }}</dd>
    </div>
  </dl>
</template>

<script setup lang="ts">
import { computed } from "vue";

type DescriptionColumns = 1 | 2 | 3;
type DescriptionSpan = 1 | 2 | 3;
type DescriptionSize = "sm" | "md";
type DescriptionLayout = "stacked" | "inline";

export type XcDescriptionItem = {
  label: string;
  value?: string | number;
  span?: DescriptionSpan;
};

const props = withDefaults(
  defineProps<{
    items: XcDescriptionItem[];
    columns?: DescriptionColumns;
    bordered?: boolean;
    emptyText?: string;
    size?: DescriptionSize;
    layout?: DescriptionLayout;
    labelWidth?: number | string;
  }>(),
  {
    columns: 2,
    bordered: true,
    emptyText: "--",
    size: "md",
    layout: "stacked",
    labelWidth: 88,
  },
);

const columnClass = computed(() => `xc-description-list--${props.columns}`);

function spanClass(span: DescriptionSpan = 1) {
  return `xc-description-list__item--span-${span}`;
}

const labelStyle = computed(() => {
  if (props.layout !== "inline") return undefined;
  return { width: typeof props.labelWidth === "number" ? `${props.labelWidth}px` : props.labelWidth };
});
</script>

<style scoped>
.xc-description-list {
  display: grid;
  background: #fff;
  color: var(--neutral-900);
}

.xc-description-list--1 { grid-template-columns: 1fr; }
.xc-description-list--2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.xc-description-list--3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }

.xc-description-list--bordered {
  border: 1px solid var(--neutral-200);
}

.xc-description-list__item {
  padding: 16px;
}

.xc-description-list--sm .xc-description-list__item { padding: 12px; }
.xc-description-list--inline .xc-description-list__item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.xc-description-list--bordered .xc-description-list__item {
  border-bottom: 1px solid var(--neutral-200);
  border-right: 1px solid var(--neutral-200);
}

.xc-description-list__item--span-2 { grid-column: span 2; }
.xc-description-list__item--span-3 { grid-column: span 3; }

.xc-description-list__label {
  flex-shrink: 0;
  color: var(--neutral-500);
  font-size: 12px;
  line-height: 18px;
}

.xc-description-list__value {
  margin: 4px 0 0;
  color: var(--neutral-900);
  font-size: 14px;
  line-height: 22px;
}

.xc-description-list--sm .xc-description-list__value {
  line-height: 20px;
}

.xc-description-list--inline .xc-description-list__value {
  min-width: 0;
  margin-top: 0;
}
</style>
