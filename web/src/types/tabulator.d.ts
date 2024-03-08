import * as Tabulator from 'tabulator-tables';

declare module 'tabulator-tables' {
  export type CustomEditor = 'inputHeaderFilter' | 'rangeHeaderFilter' | 'selectHeaderFilter' | Tabulator.Editor;
  export interface CustomHeaderFilterParams {
    type?: 'date' | 'amount';
    items?: { value: string | number | boolean; text: string }[];
  }
  export type CustomEditorParams = CustomHeaderFilterParams | Tabulator.EditorParams;
  export type CustomFormatter = 'appDate' | 'appDateTime' | Tabulator.Formatter;

  export interface CustomColumnDefinition
    extends Omit<Tabulator.ColumnDefinition, 'headerFilter' | 'formatter' | 'headerFilterParams'> {
    headerFilter?: CustomEditor;
    headerFilterParams?: CustomEditorParams;
    formatter?: CustomFormatter;
  }
}
