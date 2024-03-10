import type { RouteRecordRaw, RouteLocationRaw } from 'vue-router';
import { DisplayBreakpoint } from 'vuetify';

export interface BreadcrumbItem {
  title: string;
  href?: string;
  to?: RouteLocationRaw;
  param?: string;
}

export type RouteMeta = {
  title: string;
  icon?: string;
  hideActions?: boolean;
  requiresAuth?: boolean;
  isNavigation?: boolean;
  isRoot?: boolean;
  breadcrumbs?: BreadcrumbItem[];
  size?: DisplayBreakpoint;
} & Record<string | number | symbol, unknown>;

export interface RouteDefinition extends Omit<RouteRecordRaw, 'meta' | 'children'> {
  meta: RouteMeta;
  children?: RouteDefinition[];
}
