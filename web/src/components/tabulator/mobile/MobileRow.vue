<script setup lang="ts">
import type { ColumnDefinition, CellComponent } from 'tabulator-tables';

type DataItem = { [key: string]: unknown };

const props = withDefaults(
  defineProps<{
    id: string;
    cell: CellComponent;
    data: DataItem;
    columns: ColumnDefinition[];
  }>(),
  {
    id: 'id',
    columns: () => [],
  },
);

const getCellValue = (column: ColumnDefinition) => {
  if (!column.field) return '';
  const formatter = column.formatter;
  if (!formatter || typeof formatter !== 'function') return props.data[column.field] || '-';
  const table = props.cell.getTable();
  const row = props.cell.getRow();
  const columnComponent = table.getColumn(column.field);
  const cell = row.getCell(columnComponent);
  const el = formatter(cell, column.formatterParams as object, () => {});
  if (el instanceof Element) return el.outerHTML;
  const span = document.createElement('span');
  span.innerText = el;
  return span.outerHTML;
};
</script>
<template>
  <v-container fluid class="pa-2">
    <div>
      <v-row v-for="column in props.columns" :key="column.field" dense>
        <v-col cols="6">
          <strong class="pre">{{ column.title }}</strong>
        </v-col>
        <v-col cols="6" class="pre">
          <div v-html="getCellValue(column)" />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
