<template>
  <nav class="xc-pagination" :class="[`xc-pagination--${size}`, { 'xc-pagination--compact': compact }]" aria-label="Pagination">
    <button
      type="button"
      class="xc-pagination__control"
      :disabled="disabled || page <= 1"
      aria-label="上一页"
      @click="setPage(page - 1)"
    >
      ‹
    </button>

    <span class="xc-pagination__summary">{{ page }} / {{ total }}</span>

    <template v-if="!compact" v-for="item in visibleItems" :key="item.key">
      <span v-if="item.type === 'ellipsis'" class="xc-pagination__ellipsis">...</span>
      <button
        v-else
        type="button"
        class="xc-pagination__page"
        :class="{ 'xc-pagination__page--active': item.value === page }"
        :disabled="disabled"
        :aria-current="item.value === page ? 'page' : undefined"
        @click="setPage(item.value)"
      >
        {{ item.value }}
      </button>
    </template>

    <button
      type="button"
      class="xc-pagination__control"
      :disabled="disabled || page >= total"
      aria-label="下一页"
      @click="setPage(page + 1)"
    >
      ›
    </button>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";

type PageItem =
  | { type: "page"; key: string; value: number }
  | { type: "ellipsis"; key: string };

const props = withDefaults(
  defineProps<{
    page: number;
    total: number;
    disabled?: boolean;
    compact?: boolean;
    size?: "sm" | "md";
  }>(),
  {
    disabled: false,
    compact: false,
    size: "md",
  },
);

const emit = defineEmits<{
  "update:page": [page: number];
  change: [page: number];
}>();

const visibleItems = computed<PageItem[]>(() => {
  const total = Math.max(1, props.total);
  const page = Math.min(Math.max(1, props.page), total);

  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => ({
      type: "page",
      key: `page-${index + 1}`,
      value: index + 1,
    }));
  }

  const items: PageItem[] = [
    { type: "page", key: "page-1", value: 1 },
  ];

  const start = Math.max(2, page - 1);
  const end = Math.min(total - 1, page + 1);

  if (start > 2) items.push({ type: "ellipsis", key: "ellipsis-start" });

  for (let value = start; value <= end; value += 1) {
    items.push({ type: "page", key: `page-${value}`, value });
  }

  if (end < total - 1) items.push({ type: "ellipsis", key: "ellipsis-end" });

  items.push({ type: "page", key: `page-${total}`, value: total });
  return items;
});

function setPage(nextPage: number) {
  const normalized = Math.min(Math.max(1, nextPage), Math.max(1, props.total));
  if (normalized === props.page) return;
  emit("update:page", normalized);
  emit("change", normalized);
}
</script>

<style scoped>
.xc-pagination {
  display: inline-flex;
  width: 100%;
  max-width: 100%;
  flex-wrap: nowrap;
  align-items: center;
  gap: 4px;
  container-type: inline-size;
}

.xc-pagination__control,
.xc-pagination__page {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  min-width: 32px;
  border: 0;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--neutral-700);
  cursor: pointer;
  font-size: 14px;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
}

.xc-pagination__page {
  padding: 0 10px;
}

.xc-pagination__control {
  font-size: 20px;
  line-height: 1;
}

.xc-pagination__control:hover:not(:disabled),
.xc-pagination__page:hover:not(:disabled) {
  background: var(--neutral-100);
  color: var(--neutral-900);
}

.xc-pagination__control:disabled,
.xc-pagination__page:disabled {
  cursor: not-allowed;
  opacity: 0.4;
}

.xc-pagination__page--active {
  background: var(--neutral-900);
  color: #fff;
}

.xc-pagination__page--active:hover:not(:disabled) {
  background: var(--neutral-800);
  color: #fff;
}

.xc-pagination__ellipsis {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  color: var(--neutral-500);
  font-size: 14px;
}

.xc-pagination__summary {
  display: none;
  padding: 0 8px;
  color: var(--neutral-700);
  white-space: nowrap;
}

.xc-pagination--compact .xc-pagination__summary {
  display: inline-flex;
}

.xc-pagination--sm .xc-pagination__control,
.xc-pagination--sm .xc-pagination__page {
  height: 28px;
  min-width: 28px;
  font-size: 12px;
}

@container (max-width: 480px) {
  .xc-pagination__page,
  .xc-pagination__ellipsis {
    display: none;
  }

  .xc-pagination__summary {
    display: inline-flex;
  }

}

@media (max-width: 640px) {
  .xc-pagination__control {
    min-width: 44px;
    min-height: 44px;
  }
}
</style>
