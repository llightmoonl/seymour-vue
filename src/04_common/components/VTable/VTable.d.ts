export interface VTableProps<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
  getRowId?: (row: T, index: number) => string;
}
