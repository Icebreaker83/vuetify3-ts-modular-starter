import { useI18n } from 'vue-i18n';
import { useRouter, type RouteLocationRaw, Router } from 'vue-router';
import type { RowComponent, CellComponent, ColumnDefinition } from 'tabulator-tables';
import { useDisplay } from 'vuetify';
import type { RowAction, RowActions, RowActionRoute, RowActionCell, RowData } from './types';

const getRoute = (route: RowActionRoute, rowData: RowData) => {
  const routeParams = Object.assign(
    {},
    ...(Array.isArray(route.params)
      ? route.params.map(p => {
          const keyValue = Object.entries(p)[0];
          return { [keyValue[0]]: rowData[keyValue[1] as keyof RowData] };
        })
      : []),
  );
  const routeObj: RouteLocationRaw = {
    name: route.name as string,
    ...(Object.keys(routeParams).length ? { params: routeParams } : {}),
    ...(route.query ? { query: route.query } : {}),
  };
  return routeObj;
};

const goToDetails = (e: MouseEvent, row: RowComponent, router: Router, routeObj: object, isSelectable: boolean) => {
  if (e.which === 2 || e.button === 1) {
    const routeData = router.resolve(routeObj);
    const win = window.open(routeData.href, '_blank');
    setTimeout(() => {
      win?.focus();
    }, 0);
    return;
  }
  if (isSelectable && e.ctrlKey && (e.which === 1 || e.button === 0)) {
    row.toggleSelect();
    return;
  }
  if (e.which === 1 || e.button === 0) {
    row.getTable().destroy();
    router.push(routeObj);
  }
};

export const useRowActions = (rowActions: RowActions) => {
  const { t } = useI18n();
  const router = useRouter();
  const { xs } = useDisplay();

  const actionCell: RowActionCell = {
    openInNewTab: (action: RowAction, container: HTMLElement, rowData) => {
      if (!action.route) return;
      const newTabElement = document.createElement('span');
      if (xs.value) {
        newTabElement.innerText = t('tabulator.details');
        newTabElement.style.color = '#82b0fa';
        newTabElement.style.border = '1px solid #82b0fa';
        newTabElement.style.borderRadius = '4px';
        newTabElement.style.padding = '2px';
      } else {
        newTabElement.classList.add('mdi');
        newTabElement.classList.add('mdi-open-in-new');
        newTabElement.style.fontSize = '20px';
        newTabElement.classList.add('pa-1');
      }

      newTabElement.setAttribute('title', t('tabulator.newTabTooltip'));
      container.appendChild(newTabElement);
      newTabElement.addEventListener('click', ev => {
        ev.stopPropagation();
        const route = action.route && getRoute(action.route, rowData);
        if (!route) return;
        if (xs.value) {
          router.push(route);
          return;
        }
        const routeData = router.resolve(route);
        window.open(routeData.href, '_blank');
      });
    },
    print: (action: RowAction, container: HTMLElement, rowData) => {
      const printElement = document.createElement('span');
      printElement.innerHTML = '<span class="mdi mdi-printer" />';
      printElement.setAttribute('title', t('tabulator.print'));
      container.appendChild(printElement);
      printElement.addEventListener('click', ev => {
        ev.stopPropagation();
        console.log('PRINT CLICKED!');
      });
    },
  };

  const formatter = (cell: CellComponent, actions: RowAction[] | undefined) => {
    const actionsElement = document.createElement('div') as HTMLElement;
    actionsElement.classList.add('row-actions-container');
    if (!actions) return actionsElement;

    const rowData = cell.getRow().getData();
    const row = cell.getRow();
    row.getElement().addEventListener('mouseenter', () => {
      actionsElement.style.display = 'inline';
    });
    row.getElement().addEventListener('mouseleave', () => {
      actionsElement.style.display = 'none';
    });

    actions.forEach(action => {
      const addActions = actionCell[action.type];
      addActions && addActions(action, actionsElement, rowData);
    });

    return actionsElement;
  };

  const selectionColumn: ColumnDefinition = {
    title: '',
    formatter: 'rowSelection',
    resizable: false,
    minWidth: 45,
    width: 45,
    hozAlign: 'center',
    cssClass: 'selection-column',
    frozen: !xs.value,
    headerSort: false,
    cellClick: (e: UIEvent, cell: CellComponent) => {
      cell.getRow().toggleSelect();
    },
  };

  const actionsColumn: ColumnDefinition = {
    title: '',
    hozAlign: 'center',
    headerSort: false,
    frozen: !xs.value,
    cssClass: 'tabulator-row-actions',
    resizable: false,
    minWidth: 40,
    maxWidth: 40,
    formatter: (cell: CellComponent) => formatter(cell, rowActions.actions),
  };

  const onClickGoToDetails = (row: RowComponent) => {
    const data = row.getData();
    const rowElement = row.getElement();
    const openInNewTab = rowActions.actions?.find(action => action.type === 'openInNewTab');
    if (!openInNewTab) return;
    const routeObj = openInNewTab.route && getRoute(openInNewTab.route, data);
    if (!routeObj) return;
    const startIndex = rowActions.selection ? 2 : 1;
    for (let i = startIndex; i < rowElement.children.length - 1; i++) {
      const element = rowElement.children[i] as HTMLElement;
      element.onmousedown = e => {
        goToDetails(e, row, router, routeObj, !!rowActions.selection);
      };
    }
  };

  const getAllColumns = (columns: ColumnDefinition[] = []) => {
    const allColumns: ColumnDefinition[] = [
      ...(rowActions.selection ? [selectionColumn] : []),
      ...(rowActions.actions?.length ? [actionsColumn] : []),
      ...columns,
    ];
    return allColumns;
  };

  return { selectionColumn, actionsColumn, onClickGoToDetails, getAllColumns };
};
