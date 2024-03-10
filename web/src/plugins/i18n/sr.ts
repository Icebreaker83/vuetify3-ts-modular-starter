export default {
  appTitleShort: 'Апп',
  appTitleFull: 'Апп пун назив',
  environments: {
    test: 'Тестно окружење',
    development: 'Развојно окружење',
    staging: 'Стејџинг окружење',
    production: 'Продукционо окружење',
  },
  user: {
    login: 'Корисничко име',
    password: 'Лозинка',
  },
  home: {
    login: 'Пријава',
    register: 'Региструјте се',
    notRegistered: 'Немате налог?',
    subheading: 'Овде иде кратки опис апликације',
  },
  dashboard: {
    self: 'Почетна',
    title: 'Добродошли',
  },
  users: {
    registration: {
      self: 'Регистрација налога',
      fields: {
        username: 'Кориснички налог',
        name: 'Име и Презиме',
        email: 'Е-пошта',
        password: 'Лозинка',
      },
      success: 'Налог регистрован',
    },
  },
  form: {
    submit: 'Потврди',
    cancel: 'Откажи',
  },
  validators: {
    required: 'Неопходно',
    email: 'Неисправна адреса е-поште',
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
