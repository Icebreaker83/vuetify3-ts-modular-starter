import { formatAmount, isoToFormat, getDateFormatForLocale, getDateTimeFormatForLocale } from '@/utils/helpers';
import { useAppStore } from '@/store/app';
import type { CellComponent } from 'tabulator-tables';

export default () => {
  const { locale } = useAppStore();

  const amount = (cell: CellComponent) => {
    return formatAmount(cell.getValue(), locale);
  };

  const appDate = (cell: CellComponent) => {
    const value = cell.getValue();
    if (!value || value === '0001-01-01T00:00:00') return '';
    return isoToFormat(value, getDateFormatForLocale(locale)) || '';
  };

  const appDateTime = (cell: CellComponent) => {
    const value = cell.getValue();
    if (!value || value === '0001-01-01T00:00:00') return '';
    return isoToFormat(value, getDateTimeFormatForLocale(locale)) || '';
  };

  return {
    amount,
    appDate,
    appDateTime,
  };
}
