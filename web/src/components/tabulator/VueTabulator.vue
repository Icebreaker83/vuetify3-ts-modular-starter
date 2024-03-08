<script setup lang="ts">
import { ref, onMounted, onUnmounted, getCurrentInstance } from 'vue';
import { TabulatorFull as Tabulator, type Options, ColumnDefinition, RowComponent, Filter } from 'tabulator-tables';
import useTabulatorConfig from './config';
import useSelection from './selection';
import { useRowActions } from './row-actions';
import useTabulatorMobile from './mobile';
import { useRoute } from 'vue-router';
import { useDisplay } from 'vuetify';
// import FilterMenu from './mobile/filters/FilterMenu.vue';
// import AppliedFilters from './AppliedFilters.vue';
import getFilters from './filters';
import getFormatters from './formatters';
import type { MobileOptions, RowActions } from './types';

const props = withDefaults(
  defineProps<{
    options: Options;
    mobileOptions?: MobileOptions;
    rowActions?: RowActions;
    hideFilters?: boolean;
    idField?: string;
    showAppliedFilters?: boolean;
    showHeaderFilters?: boolean;
    calculateHeight?: boolean;
    formatUrl?: boolean;
  }>(),
  {
    options: () => ({}),
    rowActions: () => ({}),
    idField: 'id',
    showHeaderFilters: true,
    calculateHeight: true,
    formatUrl: true,
  },
);

Tabulator.extendModule('format', 'formatters', getFormatters()); // add custom formatters

const appInstance = getCurrentInstance();
appInstance && Tabulator.extendModule('edit', 'editors', getFilters(appInstance, props.options)); // add custom editors/filters

const table = ref();
const tabulatorInstance = ref();
const tableKey = ref(0);

const { tabulatorOptions, appliedFilters, selectionCount, parseRouteQuery } = useTabulatorConfig(props.formatUrl);

const route = useRoute();
const { xs } = useDisplay();

const getTableHeight = () => {
  const screenHeight = window.innerHeight;
  const paddings = 32;
  const actions = 52;
  const headerHeight = document.querySelector('header')?.offsetHeight || 0;
  return `${screenHeight - paddings - headerHeight - actions}px`;
};

const initialState =
  props.formatUrl && props.options.columns ? parseRouteQuery(route, props.options.columns, xs.value) : {};
const { paginationInitialPage, paginationSize, initialFilter, initialHeaderFilter, initialSort } = initialState;

const { getAllColumns, onClickGoToDetails } = useRowActions(props.rowActions);

const columns: ColumnDefinition[] = (props.options.columns && getAllColumns([...props.options.columns])) || [];

const { mobileConfig, mobileColumnDefinition } = useTabulatorMobile(
  props.mobileOptions?.idField,
  appInstance,
  columns,
  !!props.mobileOptions?.collapse,
);
xs.value && columns.unshift(mobileColumnDefinition);

const rowFormatter = (row: RowComponent) => {
  props.options.rowFormatter && props.options.rowFormatter(row);
  if (xs.value) return;
  onClickGoToDetails(row);
};

const { selectedRows, selectRow, deselectRow, dataProcessed } = useSelection(props.idField, tabulatorInstance.value);

const tableDefinition = {
  ...tabulatorOptions,
  ...props.options,
  columns: columns,
  ...(props.calculateHeight ? { height: getTableHeight() } : {}),
  ...(paginationInitialPage ? { paginationInitialPage } : {}),
  ...(paginationSize ? { paginationSize } : {}),
  ...(xs.value ? mobileConfig : {}),
  ...(initialFilter?.length ? { initialFilter } : {}),
  ...(initialHeaderFilter?.length ? { initialHeaderFilter } : {}),
  ...(initialSort?.length ? { initialSort } : {}),
  rowFormatter: rowFormatter,
};
console.log('tableDefinition: ', tableDefinition);

onMounted(() => {
  tabulatorInstance.value = new Tabulator(table.value, tableDefinition);
  if (!props.rowActions?.selection) return;
  // cant use rowSelectionChanged because tabulator emits it, with empty array, on ajax paging
  tabulatorInstance.value.on('rowSelected', selectRow);
  tabulatorInstance.value.on('rowDeselected', deselectRow);
  tabulatorInstance.value.on('dataProcessed', dataProcessed);
});

onUnmounted(() => {
  if (!props.rowActions?.selection) return;
  tabulatorInstance.value.off('rowSelected', selectRow);
  tabulatorInstance.value.off('rowDeselected', deselectRow);
  tabulatorInstance.value.off('dataProcessed', dataProcessed);
  tabulatorInstance.value.destroy();
});

const removeFilter = (filter: Filter) => {
  if (!xs.value) {
    tabulatorInstance.value.setHeaderFilterValue(filter.field, '');
    return;
  }
  const allFilters: Filter[] = tabulatorInstance.value.getFilters();
  tabulatorInstance.value.setFilter(allFilters.filter(f => f.field !== filter.field));
};
const removeAllFilters = () => {
  tabulatorInstance.value.clearFilter(true);
};

const applyFilters = (filters: Filter[]) => {
  tabulatorInstance.value.setFilter(filters);
};
const refresh = () => {
  tabulatorInstance.value.setData();
};
defineExpose({
  instance: tabulatorInstance,
  selectionCount,
  refresh,
});
</script>
<template>
  <v-container fluid class="ma-0 pa-0">
    <!-- <v-row v-if="!props.hideFilters" dense>
      <v-col cols="12" class="d-flex align-center">
        <FilterMenu v-if="xs" :columns="props.options.columns" :filters="appliedFilters" @submit="applyFilters" />
        <AppliedFilters
          v-if="props.showAppliedFilters && !xs"
          :filters="appliedFilters"
          :columns="props.options.columns"
          @remove="removeFilter"
          @remove-all="removeAllFilters"
        />
      </v-col>
      <v-col v-if="props.showAppliedFilters && xs" cols="12">
        <AppliedFilters
          :filters="appliedFilters"
          :columns="props.options.columns"
          @remove="removeFilter"
          @remove-all="removeAllFilters"
        />
      </v-col>
    </v-row> -->
    <v-row no-gutters>
      <v-col cols="12">
        <div ref="table" :key="tableKey" />
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped lang="scss">
@import 'vuetify/lib/styles/settings/_variables';
// @import 'tabulator-tables/dist/css/tabulator_bootstrap4.css';
:deep(.tabulator) {
  background-color: transparent;
  .pre {
    white-space: pre-wrap;
  }
  .row-actions-container {
    display: none;
  }
  .tabulator-header {
    .tabulator-col {
      background-color: rgb(var(--v-theme-primary));
    }
    .tabulator-col-sorter-element {
      background-color: rgb(var(--v-theme-primary));
      color: #fff;
      &:hover {
        background-color: rgb(var(--v-theme-primary-light-1)) !important;
      }
    }
    .header-filter-container {
      display: flex;
      align-items: center;
    }
    .custom-header-filter-container {
      display: flex;
      align-items: center;
      width: 100%;
    }
    .clear-icon {
      // convert a hexadecimal color code to a CSS filter
      filter: invert(100%) sepia(0%) saturate(7500%) hue-rotate(267deg) brightness(104%) contrast(104%);
    }
  }
  .tabulator-tableholder {
    min-height: 10px;
    overflow-y: auto;
    @media #{map-get($display-breakpoints, 'sm-and-up')} {
      overflow-y: hidden !important;
      .tabulator-table {
        width: unset;
      }
    }
    .tabulator-table {
      width: 100%;
      background-color: transparent;
      .tabulator-row {
        background-color: transparent;
        .tabulator-frozen,
        .extended-freeze {
          background-color: rgb(var(--v-theme-background));
        }
      }
    }
  }
  .tabulator-cell.selection-column {
    display: inline-flex !important;
    align-items: center;
    justify-content: center;
    position: absolute !important;
    height: 30px !important;
    top: 0;
    right: 0;
    padding: 0 !important;
    @media #{map-get($display-breakpoints, 'sm-and-up')} {
      height: unset !important;
      padding: 12px !important;
      position: relative !important;
      &.tabulator-frozen {
        position: sticky !important;
      }
      display: unset;
      align-items: unset;
      justify-content: unset;
    }
  }
  .mobile-view-column {
    // if not -1px column will go to collapsed section
    width: calc(100% - 1px) !important;
    padding: 0 !important;

    .mobile-view-column-content {
      padding-top: 35px;
    }
  }
  %display-row-actions {
    display: flex !important;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding-left: 4px;
    @media #{map-get($display-breakpoints, 'sm-and-up')} {
      height: 100%;
      flex-direction: column;
      justify-content: center;
      padding-left: unset;
    }
    span {
      display: inline-flex;
    }
  }
  .tabulator-cell.tabulator-row-actions {
    height: 30px !important;
    width: calc(100% - 35px) !important;
    // width: 0 !important;
    display: inline-flex !important;
    position: absolute !important;
    top: 0;
    left: 0;
    padding: 0 !important;
    @media #{map-get($display-breakpoints, 'sm-and-up')} {
      height: unset !important;
      // has to be same as width in actions column definition
      width: 30px !important;
      // padding: 12px !important;
      position: relative !important;
      &.tabulator-frozen {
        position: sticky !important;
      }
    }
    .row-actions-container {
      @extend %display-row-actions;
      //   height: unset;
      @media #{map-get($display-breakpoints, 'sm-and-up')} {
        // position: relative !important;
        display: none !important;
      }
    }
  }
  // .tabulator-row.tabulator-selectable:hover {
  //   .tabulator-cell.tabulator-row-actions .row-actions-container {
  //     @extend %display-row-actions;
  //   }
  // }
  .tabulator-row.tabulator-selectable:hover {
    .tabulator-cell.tabulator-row-actions .row-actions-container {
      @extend %display-row-actions;
    }
  }
  .row-status-primary {
    border-right: solid 6px rgb(var(--v-theme-primary-light)) !important;
  }
  .row-status-secondary {
    border-right: solid 6px rgb(var(--v-theme-secondary)) !important;
  }
  .row-status-warning {
    border-right: solid 6px rgb(var(--v-theme-warning)) !important ;
  }
  .row-status-danger {
    border-right: solid 6px rgb(var(--v-theme-danger)) !important;
  }
  .row-status-success {
    border-right: solid 6px rgb(var(--v-theme-success)) !important;
  }
  .row-status-partial {
    border-right: solid 6px rgb(var(--v-theme-partial)) !important;
  }
}
</style>
