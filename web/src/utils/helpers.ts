import { DateTime } from 'luxon';

export const isoToFormat = (isoDate: string | undefined | null, format: string) => {
  if (!isoDate) return isoDate;
  return DateTime.fromISO(isoDate).toFormat(format);
};

export const getDateFormatForLocale = (locale: string) => {
  try {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric', // or '2-digit' or undefined
      month: '2-digit',
      day: '2-digit',
    };
    const dateFormatter = new Intl.DateTimeFormat(locale, options);
    return dateFormatter
      .formatToParts(date)
      .map(({ type, value }) => {
        switch (type) {
          case 'day':
            return 'dd';
          case 'month':
            return 'MM';
          case 'year':
            return 'yyyy';
          default:
            return value;
        }
      })
      .join('');
  } catch (error) {
    console.error(`Invalid locale '${locale}' or unsupported format.`);
    return '';
  }
};

export const getDateTimeFormatForLocale = (locale: string) => {
  try {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric', // or '2-digit' or undefined
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    const dateFormatter = new Intl.DateTimeFormat(locale, options);
    return dateFormatter
      .formatToParts(date)
      .map(({ type, value }) => {
        switch (type) {
          case 'day':
            return 'dd';
          case 'month':
            return 'MM';
          case 'year':
            return 'yyyy';
          case 'hour':
            return 'hh';
          case 'minute':
            return 'mm';
          case 'second':
            return 'ss';
          default:
            return value;
        }
      })
      .join('');
  } catch (error) {
    console.error(`Invalid locale '${locale}' or unsupported format.`);
    return '';
  }
};

export const formatAmount = (amount: number, locale: string) => {
  if (isNaN(amount)) return amount;
  return amount.toLocaleString(locale, { minimumFractionDigits: 2 });
};

export const getObjectKeys = <Obj extends object>(obj: Obj): (keyof Obj)[] => {
  return Object.keys(obj) as (keyof Obj)[];
};
