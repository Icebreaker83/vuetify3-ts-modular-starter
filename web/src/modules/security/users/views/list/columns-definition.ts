import type { ComposerTranslation } from 'vue-i18n';
import type { CustomColumnDefinition } from 'tabulator-tables';

export default (t: ComposerTranslation): CustomColumnDefinition[] => [
  { title: 'id', field: 'id', visible: false },
  {
    title: 'name',
    hozAlign: 'center',
    field: 'name',
    headerFilter: 'inputHeaderFilter',
    width: 1000,
    minWidth: 200,
    responsive: 2 // ensures that column is hidden when no more space on mobile
  },
  {
    title: 'login',
    hozAlign: 'center',
    field: 'login',
    headerFilter: 'inputHeaderFilter',
    width: 200,
    minWidth: 200,
  },
  {
    title: 'organizationId',
    hozAlign: 'center',
    field: 'organizationId',
    headerFilter: 'inputHeaderFilter',
    visible: false,
    width: 100,
  },
  {
    title: '',
    field: 'roleId',
    visible: false,
  },
  {
    title: 'organizationName',
    hozAlign: 'center',
    field: 'organizationName',
    headerFilter: 'inputHeaderFilter',
    visible: false,
    width: 200,
    minWidth: 200,
  },
  {
    title: 'roleName',
    hozAlign: 'center',
    field: 'roleName',
    headerFilter: 'inputHeaderFilter',
    minWidth: 200,
    width: 200,
  },
  {
    title: 'email',
    hozAlign: 'center',
    field: 'email',
    // widthGrow: 1,
    width: 200,
    minWidth: 200,
    headerFilter: 'inputHeaderFilter',
  },
  {
    title: 'createdDate',
    hozAlign: 'center',
    field: 'createdDate',
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
  {
    title: 'lastLoginDate',
    hozAlign: 'center',
    field: 'lastLoginDate',
    width: 170,
    minWidth: 170,
    maxWidth: 170,
    resizable: false,
    sorter: 'date',
    formatter: 'appDateTime',
    headerFilter: 'rangeHeaderFilter',
    headerFilterParams: {
      type: 'date',
    },
    headerSortStartingDir: 'desc',
  },
  {
    title: 'status',
    hozAlign: 'center',
    field: 'status',
    width: 150,
    minWidth: 150,
    formatter: cell => {
      const status = cell.getValue();
      return t(`security.users.status.${status}`);
    },
    headerFilter: 'selectHeaderFilter',
    headerFilterParams: {
      items: [
        { value: 1, text: t('security.users.status.1') },
        { value: 2, text: t('security.users.status.2') },
        { value: 3, text: t('security.users.status.3') },
        { value: 4, text: t('security.users.status.4') },
      ],
    },
    // headerFilterLiveFilter: false,
  },
  {
    title: 'userGroupName',
    hozAlign: 'center',
    field: 'userGroupName',
    width: 120,
    minWidth: 120,
    headerFilter: 'inputHeaderFilter',
  },
  {
    title: 'notificationServer',
    hozAlign: 'center',
    field: 'notificationServer',
    width: 150,
    minWidth: 150,
    // headerFilter: this.vSelect,
    // headerFilterParams: {
    //   items: [
    //     { value: '', text: '' },
    //     ...appConfiguration.getters.serverNames
    //       .filter(s => s.Name !== 'Default')
    //       .map(s => ({ value: s.Name, text: s.DisplayedName })),
    //   ],
    // },
    // headerFilterLiveFilter: false,
    // formatter: (cell, formatterParams, onRendered) => {
    //   const value = cell.getValue();
    //   if (value === 'Default') return '';
    //   return appConfiguration.getters.serverNames.find(server => server.Name === value)?.DisplayedName || value;
    // },
  },
  {
    title: '',
    field: 'loggedIn',
    visible: false,
    // headerSort: false,
    // headerFilter: this.vCheckboxFilter,
    // headerFilterLiveFilter: false,
  },
];
