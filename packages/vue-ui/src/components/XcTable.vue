<template>
  <div class="xc-table" :style="{ maxHeight }">
    <table class="xc-table__element" :class="[`xc-table__element--${density}`, `xc-table__element--${variant}`]">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            :style="cellStyle(column)"
            :class="[column.align ? `xc-table__cell--${column.align}` : undefined, column.sticky ? `xc-table__cell--sticky-${column.sticky}` : undefined]"
            :aria-sort="column.sortable && sortKey === column.key ? sortDirection === 'asc' ? 'ascending' : 'descending' : undefined"
          >
            <button v-if="column.sortable" type="button" class="xc-table__sort" @click="toggleSort(column.key)">
              {{ column.title }}
              <span aria-hidden="true">{{ sortKey === column.key ? sortDirection === "asc" ? "↑" : "↓" : "↕" }}</span>
            </button>
            <span v-else>{{ column.title }}</span>
          </th>
        </tr>
      </thead>
      <tbody v-if="rows.length">
        <tr v-for="(row, rowIndex) in rows" :key="getRowKey(row, rowIndex)">
          <td
            v-for="column in columns"
            :key="column.key"
            :style="cellStyle(column)"
            :class="[column.align ? `xc-table__cell--${column.align}` : undefined, column.sticky ? `xc-table__cell--sticky-${column.sticky}` : undefined]"
          >
            <slot :name="column.key" :row="row" :value="row[column.key]" :index="rowIndex">
              {{ row[column.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="!rows.length" class="xc-table__empty">
      {{ emptyText }}
    </div>
  </div>
</template>

<script setup lang="ts">
export type XcTableColumn = {
  title: string;
  key: string;
  width?: string;
  align?: "left" | "center" | "right";
  sticky?: "left" | "right";
  sortable?: boolean;
};

type TableRow = Record<string, unknown>;

const props = withDefaults(
  defineProps<{
    columns: XcTableColumn[];
    rows: TableRow[];
    rowKey?: string | ((row: TableRow, index: number) => string | number);
    emptyText?: string;
    density?: "compact" | "standard" | "comfortable";
    variant?: "line" | "grid";
    maxHeight?: string;
    sortKey?: string;
    sortDirection?: "asc" | "desc";
  }>(),
  {
    emptyText: "暂无数据",
    density: "standard",
    variant: "line",
    sortDirection: "asc",
  },
);

const emit = defineEmits<{ sort: [payload: { key: string; direction: "asc" | "desc" }] }>();

function toggleSort(key: string) {
  const direction = props.sortKey === key && props.sortDirection === "asc" ? "desc" : "asc";
  emit("sort", { key, direction });
}

function cellStyle(column: XcTableColumn) {
  return {
    width: column.width,
    position: column.sticky ? "sticky" : undefined,
    left: column.sticky === "left" ? "0" : undefined,
    right: column.sticky === "right" ? "0" : undefined,
  };
}

function getRowKey(row: TableRow, index: number) {
  if (typeof props.rowKey === "function") return props.rowKey(row, index);
  if (props.rowKey && row[props.rowKey] != null) return String(row[props.rowKey]);
  return index;
}
</script>

<style scoped>
.xc-table {
  overflow: auto;
  background: #fff;
}

.xc-table__element {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 14px;
}

.xc-table__element th {
  background: var(--neutral-50);
  color: var(--neutral-600);
  font-size: 14px;
  font-weight: 600;
}

.xc-table__element th,
.xc-table__element td {
  border-bottom: 1px solid var(--neutral-200);
  padding: 12px 16px;
}

.xc-table__element--compact th,
.xc-table__element--compact td { padding: 8px 12px; }

.xc-table__element--comfortable th,
.xc-table__element--comfortable td { padding: 16px 20px; }

.xc-table__element--grid th,
.xc-table__element--grid td { border-right: 1px solid var(--neutral-200); }

.xc-table__element--grid th:last-child,
.xc-table__element--grid td:last-child { border-right: 0; }

.xc-table__cell--sticky-left,
.xc-table__cell--sticky-right { z-index: 1; background: #fff; }

.xc-table__cell--sticky-left { box-shadow: var(--table-sticky-shadow-left); }
.xc-table__cell--sticky-right { box-shadow: var(--table-sticky-shadow-right); }

th.xc-table__cell--sticky-left,
th.xc-table__cell--sticky-right { z-index: 2; background: var(--neutral-50); }

.xc-table__sort {
  display: inline-flex;
  width: 100%;
  align-items: center;
  justify-content: inherit;
  gap: 4px;
  color: inherit;
}

.xc-table__sort:focus-visible { outline: 2px solid var(--focus-ring-color); outline-offset: 2px; }

.xc-table__element td {
  color: var(--neutral-800);
  font-family: inherit;
  font-variant-numeric: tabular-nums;
}

.xc-table__element tbody tr:hover {
  background: var(--neutral-50);
}

.xc-table__element tbody tr:last-child td {
  border-bottom: 0;
}

.xc-table__cell--center {
  text-align: center;
}

.xc-table__cell--right {
  text-align: right;
}

.xc-table__empty {
  border-top: 1px solid var(--neutral-200);
  padding: 32px 16px;
  color: var(--neutral-500);
  font-size: 14px;
  text-align: center;
}
</style>
