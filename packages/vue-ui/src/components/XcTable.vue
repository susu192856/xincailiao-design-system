<template>
  <div class="xc-table">
    <table class="xc-table__element">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            :style="{ width: column.width }"
            :class="column.align ? `xc-table__cell--${column.align}` : undefined"
          >
            {{ column.title }}
          </th>
        </tr>
      </thead>
      <tbody v-if="rows.length">
        <tr v-for="(row, rowIndex) in rows" :key="getRowKey(row, rowIndex)">
          <td
            v-for="column in columns"
            :key="column.key"
            :class="column.align ? `xc-table__cell--${column.align}` : undefined"
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
};

type TableRow = Record<string, unknown>;

const props = withDefaults(
  defineProps<{
    columns: XcTableColumn[];
    rows: TableRow[];
    rowKey?: string | ((row: TableRow, index: number) => string | number);
    emptyText?: string;
  }>(),
  {
    emptyText: "暂无数据",
  },
);

function getRowKey(row: TableRow, index: number) {
  if (typeof props.rowKey === "function") return props.rowKey(row, index);
  if (props.rowKey && row[props.rowKey] != null) return String(row[props.rowKey]);
  return index;
}
</script>

<style scoped>
.xc-table {
  overflow-x: auto;
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
  color: var(--neutral-900);
  font-size: 12px;
  font-weight: 600;
}

.xc-table__element th,
.xc-table__element td {
  border-bottom: 1px solid var(--neutral-200);
  padding: 12px 16px;
}

.xc-table__element td {
  color: var(--neutral-700);
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
