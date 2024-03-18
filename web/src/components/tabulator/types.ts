import type { Options, ValueBooleanCallback, ValueVoidCallback, Filter, SorterFromTable } from 'tabulator-tables';
import type { LocationQueryRaw } from 'vue-router';
export interface MobileOptions extends Options {
  idField: string;
  collapse: boolean;
}

export interface RowData {
  [index: string]: unknown;
}

export interface RowActionCell {
  [key: string]: (action: RowAction, container: HTMLElement, rowData: RowData) => void;
}
export interface RowActionRoute {
  name: string;
  params?: { [key: string]: string }[];
  query?: LocationQueryRaw;
}
export interface RowAction {
  type: 'openInNewTab' | 'print';
  route?: RowActionRoute;
}

export interface RowActions {
  selection?: boolean;
  actions?: RowAction[];
}

export interface DateMasks {
  [key: string]: {
    mask: string;
    format: string;
    maskToValue: (masked: string) => string;
  };
}

export interface RangeData {
  from: {
    masked: string;
    unmasked: string;
  };
  to: {
    masked: string;
    unmasked: string;
  };
}

export interface RangeFilter {
  from?: string;
  to?: string;
}

export interface SelectHeaderFilterItem {
  value: string;
  text: string | string[];
}

export interface HeaderFilterParams {
  filter: Filter[];
  sort: SorterFromTable[];
  pageNumber: number;
  pageSize: number;
  data: unknown;
}
export interface HeaderFilterProps {
  value: string;
  success: ValueBooleanCallback;
  cancel: ValueVoidCallback;
  maska?: string;
}

export interface IPillFormatter {
  text: string;
  color?: string;
}

export interface IPillFormatterParams {
  [key: string]: IPillFormatter;
}

export type InitialState = Pick<
  Options,
  'paginationInitialPage' | 'paginationSize' | 'initialFilter' | 'initialHeaderFilter' | 'initialSort'
>;
