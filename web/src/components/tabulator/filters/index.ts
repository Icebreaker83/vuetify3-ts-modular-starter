import { createVNode, render, type ComponentInternalInstance, Component } from 'vue';
import InputHeaderFilter from './InputHeaderFilter.vue';
import SelectHeaderFilter from './SelectHeaderFilter.vue';
import RangeHeaderFilter from './RangeHeaderFilter.vue';
import type { Options, CellComponent, EmptyCallback, ValueBooleanCallback, ValueVoidCallback } from 'tabulator-tables';

interface FilterProps {
  [key: string]: unknown;
}
const getFilter = (appInstance: ComponentInternalInstance, component: Component, props: FilterProps) => {
  const { appContext } = appInstance;
  const vnode = createVNode(component, props);
  vnode.appContext = { ...appContext };
  const filterContainer = document.createElement('div');
  filterContainer.classList.add('header-filter-container');
  render(vnode, filterContainer);
  return filterContainer;
};

const getFilterProps = (cell: CellComponent, props: FilterProps, tableOptions: Options) => {
  const field = cell.getField();
  const headerFilterParams = tableOptions.columns?.find(column => column.field === field)?.headerFilterParams || {};
  return { ...props, ...headerFilterParams };
};

export default (appInstance: ComponentInternalInstance, tableOptions: Options) => ({
  inputHeaderFilter: (
    cell: CellComponent,
    onRendered: EmptyCallback,
    success: ValueBooleanCallback,
    cancel: ValueVoidCallback,
  ) => {
    const cellValue = cell.getValue();
    const props = {
      value: cellValue,
      success: success,
      cancel: cancel,
    };
    return getFilter(appInstance, InputHeaderFilter, getFilterProps(cell, props, tableOptions));
  },
  rangeHeaderFilter: (
    cell: CellComponent,
    onRendered: EmptyCallback,
    success: ValueBooleanCallback,
    cancel: ValueVoidCallback,
  ) => {
    const cellValue = cell.getValue();
    const props = {
      value: cellValue || { from: '', to: '' },
      success: success,
      cancel: cancel,
    };
    return getFilter(appInstance, RangeHeaderFilter, getFilterProps(cell, props, tableOptions));
  },
  selectHeaderFilter: (
    cell: CellComponent,
    onRendered: EmptyCallback,
    success: ValueBooleanCallback,
    cancel: ValueVoidCallback,
  ) => {
    const cellValue = cell.getValue();
    const props = {
      value: cellValue,
      success: success,
      cancel: cancel,
    };
    return getFilter(appInstance, SelectHeaderFilter, getFilterProps(cell, props, tableOptions));
  },
});
