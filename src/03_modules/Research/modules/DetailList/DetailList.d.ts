export interface DetailListItem {
  id: number;
  title?: string;
  marker?: string;
  formula?: string;
  value: number | number[];
}

export interface DetailListProps {
  details: DetailListItem[];
  direction?: 'row' | 'column';
}
