import { h } from 'vue';
import type { ColumnDef } from '@tanstack/vue-table';

export function useDeltaTables(length: number) {
  const outputsColumns = (): ColumnDef<number[]>[] => {
    return [
      ...Array.from({ length }, (_, i) => ({
        id: String(i),
        header: () => h('span', [h('span', 'y'), h('sub', {}, i + 1)]),
        accessorFn: (row: number[]) => row[i],
      })),
    ];
  };

  const sumColumns = (): ColumnDef<number[]>[] => {
    return [
      ...Array.from({ length }, (_, i) => ({
        id: String(i),
        header: () => h('span', [h('span', 'S'), h('sub', {}, i + 1)]),
        accessorFn: (row: number[]) => row[i],
      })),
    ];
  };

  const epsilonColumns = (): ColumnDef<number[]>[] => {
    return [
      ...Array.from({ length }, (_, i) => ({
        id: String(i + 1),
        header: () => h('span', [h('span', 'ε'), h('sub', {}, i + 1)]),
        accessorFn: (row: number[]) => row[i]?.toFixed(2),
      })),
    ];
  };

  return {
    outputsColumns,
    sumColumns,
    epsilonColumns,
  };
}
