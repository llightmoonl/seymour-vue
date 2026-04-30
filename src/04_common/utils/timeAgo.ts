interface DivisionsItem {
  amount: number;
  unit: Intl.RelativeTimeFormatUnit;
}

const DIVISIONS: DivisionsItem[] = [
  { amount: 60, unit: 'second' },
  { amount: 60, unit: 'minute' },
  { amount: 24, unit: 'hour' },
  { amount: 7, unit: 'day' },
  { amount: 4.34524, unit: 'week' },
  { amount: 12, unit: 'month' },
  { amount: Number.POSITIVE_INFINITY, unit: 'year' },
];

export const timeAgo = (date: string, locales: string = 'en') => {
  const formatter = new Intl.RelativeTimeFormat(locales, {
    numeric: 'auto',
  });

  let duration = (new Date(date).getTime() - new Date().getTime()) / 1000;

  for (const division of DIVISIONS) {
    if (Math.abs(duration) < division.amount) {
      return formatter.format(Math.round(duration), division.unit);
    }
    duration /= division.amount;
  }
};
