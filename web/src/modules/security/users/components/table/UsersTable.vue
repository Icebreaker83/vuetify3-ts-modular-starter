<script setup lang="ts">
import { endpoints } from '../../api';
import VueTabulator from '@/components/tabulator/VueTabulator.vue';
import type { RowActions } from '@/components/tabulator/types';
import type { Options, ColumnDefinition } from 'tabulator-tables';
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
  columns: [
    { title: 'id', field: 'id', visible: false },
    {
      title: t('users.fields.username'),
      field: 'username',
      hozAlign: 'center',
      headerFilter: 'inputHeaderFilter',
    },

    {
      title: t('users.fields.name'),
      field: 'name',
      hozAlign: 'center',
      headerFilter: 'inputHeaderFilter',
    },
    {
      title: t('users.fields.email'),
      field: 'email',
      hozAlign: 'center',
      headerFilter: 'inputHeaderFilter',
    },
    {
      title: t('users.fields.createdDate'),
      field: 'createdDate',
      hozAlign: 'center',
      width: 170,
      minWidth: 170,
      maxWidth: 170,
      resizable: false,
      sorter: 'date',
      formatter: 'appDate',
      headerFilter: 'rangeHeaderFilter',
      headerFilterParams: {
        type: 'date',
      },
      headerSortStartingDir: 'desc',
    },
  ] as ColumnDefinition[],
};

const rowActions: RowActions = {
  selection: true,
  actions: [
    {
      type: 'openInNewTab',
      route: { name: 'usersItem', params: [{ id: 'id' }] },
    },
  ],
};
</script>
<template>
  <VueTabulator persistence-id="users-list" :options="options" :row-actions="rowActions" />
</template>
