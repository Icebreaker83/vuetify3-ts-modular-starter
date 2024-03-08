<script setup lang="ts">
import { endpoints } from '../../api';
import VueTabulator from '@/components/tabulator/VueTabulator.vue';
import type { RowActions } from '@/components/tabulator/types';
import type { Options, ColumnDefinition } from 'tabulator-tables';
import getColumns from './columns-definition';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { getUsers } = endpoints;

const { url, method, headers } = getUsers();
const options: Options = {
  ajaxURL: url,
  ajaxConfig: {
    method,
    headers,
  },
  columns: getColumns(t) as ColumnDefinition[],
};

const rowActions: RowActions = {
  selection: true,
  actions: [
    {
      type: 'openInNewTab',
      route: { name: 'usersItem', params: [{ login: 'login' }] },
    },
  ],
};
</script>
<template>
  <VueTabulator :options="options" :row-actions="rowActions" />
</template>
