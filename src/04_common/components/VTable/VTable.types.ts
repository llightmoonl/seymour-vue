import type { ColumnDef } from '@tanstack/vue-table';

export interface VTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  getRowId?: (row: T, index: number) => string;
  rowIndexHighlight?: number;
  columnIndexHighlight?: number;
}
