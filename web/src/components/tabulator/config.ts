import { ref } from 'vue';
import { useApis } from '@/services/api';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter, type RouteLocationNormalizedLoaded } from 'vue-router';
import type { AjaxConfig, Options, Filter, SorterFromTable, ColumnDefinition } from 'tabulator-tables';
import type { HeaderFilterParams, InitialState } from './types';

const filterMapping = {
  from: 'filter[%field-From]=%value',
  to: 'filter[%field-To]=%value',
};

const handlePagination = (
  result: InitialState,
  property: 'paginationInitialPage' | 'paginationSize',
  value: string,
) => {
  const val = parseInt(value);
  if (isNaN(val)) {
    console.warn(`Invalid value for '${property}': ${value}`);
    return;
  }
  result[property] = val;
};

const columnNameRegex = /^filter\[(.+?)(-(From|To))?\]$/;
const filterRegex = /^filter\[(.+)\]$/;
const rangeRegex = /^(\w+)-(From|To)$/;
const fromRegex = /^(\w+)-From$/;
const toRegex = /^(\w+)-To$/;

type FilterType = 'initialFilter' | 'initialHeaderFilter';

const handleFilter = (field: string, value: string, filterType: FilterType, result: InitialState) => {
  filterType === 'initialFilter' &&
    result.initialFilter?.push({
      field: field,
      type: '=',
      value: value,
    });
  filterType === 'initialHeaderFilter' &&
    result.initialHeaderFilter?.push({
      field: field,
      value: value,
    });
};

const handleRangeFilter = (field: string, value: string, filterType: FilterType, result: InitialState) => {
  const rangeField = field.replace(rangeRegex, '$1');
  const filter = result[filterType]?.find(f => f.field === rangeField);
  if (!filter) {
    filterType === 'initialFilter' &&
      result.initialFilter?.push({
        field: rangeField,
        type: '=',
        value: { from: fromRegex.test(field) ? value : '', to: toRegex.test(field) ? value : '' },
      });
    filterType === 'initialHeaderFilter' &&
      result.initialHeaderFilter?.push({
        field: rangeField,
        value: { from: fromRegex.test(field) ? value : '', to: toRegex.test(field) ? value : '' },
      });
    return;
  }
  const rangeValue = {
    ...(fromRegex.test(field) ? { from: value } : {}),
    ...(toRegex.test(field) ? { to: value } : {}),
  };
  Object.assign(filter.value, rangeValue);
};

const parseRouteQuery = (route: RouteLocationNormalizedLoaded, columns: ColumnDefinition[], isXs: boolean) => {
  const result: InitialState = {
    initialFilter: [],
    initialHeaderFilter: [],
    initialSort: [],
    paginationInitialPage: 0,
    paginationSize: 0,
  };

  Object.entries(route.query).forEach(([key, value]) => {
    if (key === 'pageNumber') {
      handlePagination(result, 'paginationInitialPage', value as string);
      return;
    }
    if (key === 'pageSize') {
      handlePagination(result, 'paginationSize', value as string);
      return;
    }
    if (key === 'sortBy') {
      result.initialSort?.push({ column: value as string, dir: route.query?.sortDesc ? 'desc' : 'asc' });
      return;
    }
    if (!filterRegex.test(key)) {
      console.warn(`Unknown query expression ${key}=${value}`);
      return;
    }

    const columnName = key.replace(columnNameRegex, '$1');
    const column = columns.find(c => c.field === columnName);
    if (!column) {
      console.warn(`No tabulator column definition found for query ${key}=${value}`);
      return;
    }
    const field = key.replace(filterRegex, '$1');
    const filterType: FilterType = column.headerFilter && !isXs ? 'initialHeaderFilter' : 'initialFilter';
    if (!rangeRegex.test(field)) {
      handleFilter(field, value as string, filterType, result);
      return;
    }
    handleRangeFilter(field, value as string, filterType, result);
  });
  return result;
};

interface AjaxRequestFuncParser {
  sort: (sorts: SorterFromTable[]) => string;
  pageNumber: (value: number) => string;
  pageSize: (value: number) => string;
  filter: (filters: Filter[]) => string;
}

const ajaxRequestFuncParser: AjaxRequestFuncParser = {
  sort: (sorts: SorterFromTable[]): string => sorts.map(s => `sortBy=${s.field}&sortDesc=${s.dir}`).join('&'),
  pageNumber: (value: number): string => `pageNumber=${value}`,
  pageSize: (value: number): string => `pageSize=${value}`,
  filter: (filters: Filter[]): string => {
    const queryFilters = filters.map((filter: Filter) => {
      if (filter.value && typeof filter.value !== 'object')
        return `filter[${filter.field}]=${encodeURIComponent(filter.value)}`;
      const queries = [];
      if (Array.isArray(filter.value))
        return `filter[${filter.field}]=${filter.value.map(val => encodeURIComponent(val)).join(',')}`;
      for (const [key, value] of Object.entries(filter.value)) {
        if (value === undefined || value === null || value === '') continue;
        const filterQuery = filterMapping[key as keyof typeof filterMapping];
        if (!filterQuery) {
          console.error(`No tabulator filter query mapping for filter ${JSON.stringify(filter)}`);
          continue;
        }
        queries.push(
          filterQuery.replace(/%field/, filter.field).replace(/%value/, encodeURIComponent(value as string)),
        );
      }
      return queries.join('&');
    });
    return queryFilters.filter(Boolean).join('&');
  },
};

export default (formatUrl: boolean) => {
  const { sendRequest } = useApis();
  const router = useRouter();
  const route = useRoute();
  const i18n = useI18n();
  const locale = i18n.locale.value;
  const appliedFilters = ref<Filter[]>([]);
  const selectionCount = ref(0);

  const tabulatorOptions: Options = {
    columnDefaults: {
      title: '',
      headerTooltip: true,
      headerSortTristate: true,
      resizable: true,
      headerHozAlign: 'center',
      vertAlign: 'middle',
      hozAlign: 'center',
      headerFilterLiveFilter: false,
    },
    movableColumns: true,
    pagination: true,
    paginationMode: 'remote',
    paginationCounter: 'rows',
    dataLoader: false,
    layout: 'fitColumns',
    paginationInitialPage: 1,
    paginationSize: 10,
    paginationSizeSelector: [5, 10, 20, 50],
    paginationButtonCount: 10,
    sortMode: 'remote',
    columnHeaderSortMulti: false,
    filterMode: 'remote',
    layoutColumnsOnNewData: true,
    minHeight: 1,
    persistence: {
      columns: ['width'],
    },
    ajaxRequestFunc: (url: string, config: AjaxConfig, params: HeaderFilterParams) => {
      const currentFilters: Filter[] = [];
      const queries = Object.entries(params).reduce(
        (acc, entry) => {
          const parserKey = entry[0] as keyof AjaxRequestFuncParser;
          const parser = ajaxRequestFuncParser[parserKey];
          if (!parser) return acc;
          entry[0] === 'filter' && currentFilters.push(...entry[1]);
          const queryString = parser(entry[1]);
          if (!queryString) return acc;
          acc.push(queryString);
          return acc;
        },
        <string[]>[],
      );

      const queryString = queries.join('&');
      const getData = {
        method: config.method ?? 'get',
        url: `${url}${url.includes('?') ? '&' : '?'}${queryString}`,
        ...(params.data ? { data: params.data } : {}),
        ...(config.headers ? { headers: config.headers } : {}),
      };

      formatUrl &&
        router.replace(`${route.path}${route.path.includes('?') ? '&' : '?'}${queryString}`).catch(error => {
          console.error(error);
        });
      appliedFilters.value = currentFilters;
      return sendRequest(getData);
    },
    ajaxResponse: (url, params, response) => {
      if (!response?.data?.rows) {
        return {
          contentType: 'application/json; charset=utf-8',
          data: [],
          last_page: 0,
        };
      }
      selectionCount.value = response.data.additionalInformation?.selectionCount;
      const totalElements = response.data?.totalRows || 0;
      const addition = totalElements % params.pageSize > 0 ? 1 : 0;
      const lastPage = Math.floor(totalElements / params.pageSize) + addition;
      const retObj = {
        contentType: 'application/json; charset=utf-8',
        data: response.data.rows,
        last_page: lastPage,
        last_row: totalElements,
      };
      return retObj;
    },
    dataSendParams: {
      page: 'pageNumber',
      size: 'pageSize',
    },
    locale: locale,
    langs: {
      sr: i18n.messages.value.sr.tabulator,
      en: i18n.messages.value.en.tabulator,
    },
  };

  return {
    tabulatorOptions,
    appliedFilters,
    selectionCount,
    parseRouteQuery,
  };
};
