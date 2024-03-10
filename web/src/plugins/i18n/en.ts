export default {
  appTitleShort: 'App',
  appTitleFull: 'App title',
  environments: {
    test: 'Test environment',
    development: 'Development environment',
    staging: 'Staging environment',
    production: 'Production environment',
  },
  user: {
    login: 'Username',
    password: 'Password',
  },
  home: {
    login: 'Login',
    heading: 'App title',
    register: 'Register',
    notRegistered: "You don't have account?",
    subheading: 'Short description of the application and what its used for',
  },
  dashboard: {
    self: 'Dashboard',
    title: 'Welcome',
  },
  users: {
    registration: {
      self: 'Register account',
      fields: {
        username: 'Username',
        name: 'Name and Surname',
        email: 'E-mail',
        password: 'Password',
      },
      success: 'Account registered',
    },
  },
  form: {
    submit: 'Submit',
    cancel: 'Cancel',
  },
  validators: {
    required: 'Required',
    email: 'Invalid email',
  },
  404: '404 - Page not found',
  403: 'You are not authorized to view this page',
  misc: {
    logout: 'Logout',
    from: 'From',
    to: 'To',
  },
  tabulator: {
    ajax: {
      loading: 'Loading', // ajax loader text
      error: 'Error', // ajax error text
    },
    groups: {
      // copy for the auto generated item count in group header
      item: 'item', // the singular  for item
      items: 'items', // the plural for items
    },
    pagination: {
      page_size: 'Page size:', // label for the page size select element
      first: 'First', // text for the first page button
      first_title: 'First page', // tooltip text for the first page button
      last: 'Last',
      last_title: 'Last page',
      prev: 'Previous',
      prev_title: 'Previous page',
      next: 'Next',
      next_title: 'Next page',
      counter: {
        showing: 'Showing',
        of: 'of',
        rows: 'rows',
        pages: 'pages',
      },
    },
    headerFilters: {
      default: 'filter', // default header filter placeholder text
      columns: {
        name: 'filter name', // replace default header filter text for column name
      },
      gte: 'From',
      lte: 'To',
    },
    emptyTable: 'No data',
    totalElements: 'Total rows: ',
    rowTooltip: '[Mouse middle click] open details in new tab',
    newTabTooltip: 'Open details in new tab',
    details: 'details',
  },
};
