export interface DetailListItem {
  id: number;
  title?: string;
  marker?: string;
  value: number | number[];
}

export interface DetailListProps {
  details: DetailListItem[];
}
