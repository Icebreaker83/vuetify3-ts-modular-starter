import { ref } from 'vue';
import type { RowComponent, Tabulator } from 'tabulator-tables';
import type { RowData } from './types';

export default (idField = 'id') => {
  const selectedRows = ref<RowData[]>([]);
  let tabulatorInstance: Tabulator;
  const setInstance = (instance: Tabulator) => {
    tabulatorInstance = instance;
  };
  const selectRow = (row: RowComponent) => {
    const data = row.getData();
    const rowId = data[idField];
    if (rowId === undefined) {
      console.error(`Id field "${idField}" not found in row data: ${data}`);
      return;
    }
    // have to make this check so that rows are not added again when switching pages
    // row selection is triggered in dataProcessed
    const selected = selectedRows.value.some(r => r[idField] === rowId);
    if (selected) return;
    selectedRows.value.push(data);
  };

  const deselectRow = (row: RowComponent) => {
    const data = row.getData();
    const rowId = data[idField];
    if (rowId === undefined) {
      console.error(`Id field "${idField}" not found in row data: ${data}`);
      return;
    }
    const index = selectedRows.value.findIndex(r => r[idField] === rowId);
    if (index === -1) return;
    selectedRows.value.splice(index, 1);
  };

  const dataProcessed = () => {
    if (!selectedRows.value?.length) return;
    const allRows = tabulatorInstance.getRows();
    allRows.forEach((row: RowComponent) => {
      const data = row.getData();
      if (!selectedRows.value.some(selected => selected[idField] === data[idField])) return;
      row.select();
    });
  };

  return { setInstance, selectedRows, selectRow, deselectRow, dataProcessed };
};
