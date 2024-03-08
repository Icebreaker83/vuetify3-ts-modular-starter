export default {
  appTitleShort: 'БПС',
  appTitleFull: 'Сервис буџетског планирања',
  environments: {
    ptest: 'Test environment',
    development: 'Development environment',
    staging: 'Staging environment',
    atest: 'ATest environment',
    production: 'Production environment',
    local: 'Local environment',
  },
  user: {
    login: 'Корисничко име',
    password: 'Лозинка',
  },
  home: {
    login: 'Пријава',
    register: 'Региструјте се',
    notRegistered: 'Немате налог?',
    subheading:
      'Информациони систем за припрему, извршење, буџетско рачуноводство и извештавање буџета Републике Србије',
  },
  dashboard: {
    self: 'Почетна',
    title: 'Добродошли',
  },
  form: {
    submit: 'Потврди',
  },
  validators: {
    required: 'Неопходно',
  },
  404: 'Страница није пронађена',
  403: 'Страница није пронађена или немате право приступа',
  misc: {
    logout: 'Одјава',
    from: 'Од',
    to: 'До',
  },
  tabulator: {
    ajax: {
      loading: 'Учитавам', // ajax loader text
      error: 'Грешка', // ajax error text
    },
    groups: {
      // copy for the auto generated item count in group header
      item: 'ставка', // the singular  for item
      items: 'ставке', // the plural for items
    },
    pagination: {
      page_size: 'Редова по страни:', // label for the page size select element
      first: 'Прва', // text for the first page button
      first_title: 'Прва страна', // tooltip text for the first page button
      last: 'Последња',
      last_title: 'Последња страна',
      prev: 'Претходна',
      prev_title: 'Претходна страна',
      next: 'Следећа',
      next_title: 'Следећа страна',
      counter: {
        showing: 'Приказано',
        of: 'од',
        rows: 'редова',
        pages: 'страна',
      },
    },
    headerFilters: {
      default: 'филтрирај', // default header filter placeholder text
      columns: {
        name: 'филтрирај име', // replace default header filter text for column name
      },
      gte: 'Од',
      lte: 'До',
    },
    emptyTable: 'Нема информација',
    totalElements: 'Укупно редова: ',
    rowTooltip: '[Средњи клик миша] отварање детаља на новој картици',
    newTabTooltip: 'Отварање детаља на новој картици',
    details: 'детаљи',
  },
};
