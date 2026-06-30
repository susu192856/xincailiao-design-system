<template>
  <section
    class="xc-chart"
    :class="[`xc-chart--${size}`, `xc-chart--${chartType}`]"
    :aria-busy="loading || undefined"
    :aria-labelledby="titleId"
  >
    <header class="xc-chart__header">
      <div class="xc-chart__heading">
        <h3 :id="titleId" class="xc-chart__title">{{ title }}</h3>
        <p v-if="description" class="xc-chart__description">{{ description }}</p>
      </div>
      <slot name="actions" />
    </header>

    <ul v-if="legendItems.length" class="xc-chart__legend" aria-label="图例">
      <li v-for="(item, index) in legendItems" :key="`${item.label}-${index}`" class="xc-chart__legend-item">
        <span
          class="xc-chart__legend-mark"
          :class="`xc-chart__legend-mark--${item.shape ?? 'block'}`"
          :style="{ backgroundColor: item.color ?? colors[index % colors.length] }"
          aria-hidden="true"
        />
        <span>{{ item.label }}</span>
      </li>
    </ul>

    <div v-if="loading" class="xc-chart__state" role="status">图表加载中</div>
    <div v-else-if="isEmpty" class="xc-chart__state" role="status">
      <strong>暂无数据</strong>
      <span>调整时间范围或筛选条件后重试。</span>
    </div>
    <div v-else class="xc-chart__plot" role="img" :aria-label="ariaLabel || `${title}图表`">
      <slot :data="data" :colors="colors" :chart-type="chartType" />
    </div>

    <div v-if="showTable && !loading && !isEmpty" class="xc-chart__table" :aria-label="`${title}明细数据`">
      <slot name="table" :data="data" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, useId } from "vue";

type ChartType = "line" | "bar" | "donut" | "waterfall" | "histogram" | "area" | "candlestick" | "heatmap" | "stacked-bar" | "stacked-area";
type ChartSize = "sm" | "md" | "lg";

export type ChartLegendItem = {
  label: string;
  color?: string;
  shape?: "line" | "block" | "dot";
};

const props = withDefaults(
  defineProps<{
    chartType: ChartType;
    title: string;
    description?: string;
    legendItems?: ChartLegendItem[];
    colors?: string[];
    data?: unknown[];
    size?: ChartSize;
    showTable?: boolean;
    empty?: boolean;
    loading?: boolean;
    ariaLabel?: string;
  }>(),
  {
    description: undefined,
    legendItems: () => [],
    colors: () => ["var(--data-blue-2)", "var(--data-green-2)", "var(--data-purple-2)"],
    data: () => [],
    size: "md",
    showTable: false,
    empty: false,
    loading: false,
    ariaLabel: undefined,
  },
);

const titleId = `xc-chart-${useId()}`;
const isEmpty = computed(() => props.empty || props.data.length === 0);
</script>

<style scoped>
.xc-chart {
  overflow: hidden;
  border: 1px solid var(--neutral-200);
  border-radius: var(--radius-sm);
  background: #fff;
  color: var(--neutral-800);
}

.xc-chart__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--spacing-md);
  border-bottom: 1px solid var(--neutral-200);
  padding: var(--spacing-md) var(--spacing-lg);
}

.xc-chart__heading { min-width: 0; }
.xc-chart__title { margin: 0; color: var(--neutral-900); font-size: 16px; font-weight: 600; line-height: 24px; }
.xc-chart__description { margin: var(--spacing-xs) 0 0; color: var(--neutral-500); font-size: 14px; line-height: 22px; }

.xc-chart__legend {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm) var(--spacing-md);
  margin: 0;
  padding: var(--spacing-md) var(--spacing-lg) 0;
  color: var(--neutral-600);
  font-size: 13px;
  line-height: 20px;
  list-style: none;
}

.xc-chart__legend-item { display: inline-flex; align-items: center; gap: var(--spacing-xs); }
.xc-chart__legend-mark { width: 10px; height: 10px; border-radius: var(--radius-sm); }
.xc-chart__legend-mark--line { width: 20px; height: 2px; }
.xc-chart__legend-mark--dot { border-radius: 50%; }

.xc-chart__plot { min-width: 0; overflow-x: auto; padding: var(--spacing-lg); }
.xc-chart--sm .xc-chart__plot { min-height: 200px; }
.xc-chart--md .xc-chart__plot { min-height: 280px; }
.xc-chart--lg .xc-chart__plot { min-height: 360px; }

.xc-chart__state {
  display: flex;
  min-height: 240px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-lg);
  color: var(--neutral-500);
  font-size: 14px;
  line-height: 22px;
  text-align: center;
}

.xc-chart__state strong { color: var(--neutral-800); font-size: 16px; font-weight: 500; }
.xc-chart__table { overflow-x: auto; border-top: 1px solid var(--neutral-200); padding: var(--spacing-lg); }

@media (max-width: 640px) {
  .xc-chart__header { flex-direction: column; padding: var(--spacing-md); }
  .xc-chart__legend { padding: var(--spacing-md) var(--spacing-md) 0; }
  .xc-chart__plot, .xc-chart__table { padding: var(--spacing-md); }
}
</style>
