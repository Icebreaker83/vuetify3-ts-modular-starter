import type { HttpMethod } from 'tabulator-tables';

export interface GetUsers {
  method: HttpMethod;
  url: string;
  headers: Record<string, string>;
}