export interface DetailListItem {
  id?: number;
  title?: string;
  marker?: string;
  formula?: string;
  value?: number | number[];
  tableData?: number[][];
  tableColumns?: ColumnDef<number[]>[];
}

export interface DetailListProps {
  details: DetailListItem[];
  direction?: 'row' | 'column';
}
