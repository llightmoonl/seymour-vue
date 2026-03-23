export interface VTableProps<T, K> {
  data: T[];
  columns: ColumnDef<T, K>[];
  getRowId?: (row: T, index: number) => string;
  rowIndexHighlight?: number;
  columnIndexHighlight?: number;
}
