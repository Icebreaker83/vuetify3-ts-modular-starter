import { createVNode, render, type ComponentInternalInstance } from 'vue';
import type { ColumnDefinition, CellComponent, Options } from 'tabulator-tables';
import MobileRow from './MobileRow.vue';

export default (
  idField: string = 'id',
  appInstance: ComponentInternalInstance | null,
  columnDefinition: ColumnDefinition[],
  collapse: boolean,
) => {
  const visibleColumns = columnDefinition.filter(c => c.title && c.visible !== false);
  const maxHeight = screen.height - 150;

  const mobileConfig: Options = {
    columnDefaults: {
      minWidth: 110,
      resizable: false,
      headerHozAlign: 'center',
    },
    layout: 'fitDataFill',
    height: `${maxHeight}px`,
    movableColumns: false,
    headerVisible: false,
    pagination: false,
    paginationSize: 10,
    progressiveLoad: 'scroll',
    progressiveLoadScrollMargin: 300,
    responsiveLayout: collapse ? 'collapse' : 'hide',
    ...(collapse
      ? {
          responsiveLayoutCollapseStartOpen: false,
        }
      : {}),
  };

  const mobileColumnFormatter = (cell: CellComponent) => {
    if (!appInstance) return cell.getValue();
    const rowData = cell.getData();
    const { appContext } = appInstance;
    const props = {
      id: idField, // TODO: check this
      cell: cell,
      data: rowData,
      columns: visibleColumns,
      parent: cell.getRow().getElement(),
    };
    const vnode = createVNode(MobileRow, props);
    vnode.appContext = { ...appContext };
    const mobileColElement = document.createElement('div');
    mobileColElement.classList.add('mobile-view-column-content');
    render(vnode, mobileColElement);
    return mobileColElement;
  };

  // title has to be assigned any string for formatter div to show,
  const mobileColumnDefinition: ColumnDefinition = {
    field: idField,
    title: 'MobileRow',
    headerSort: false,
    cssClass: 'mobile-view-column',
    formatter: mobileColumnFormatter,
    responsive: 0 // ensures that this mobile column is never hidden on resize
  };

  return { mobileConfig, mobileColumnDefinition };
};
