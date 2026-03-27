import { ref, type Ref, h } from 'vue';
import { ROWS, COLS } from './constant';
import type { ColumnDef } from '@tanstack/vue-table';
import type { GenerateDataItem } from '../api/putGenerateData.d';

export function createSamplesColumns(length: number): ColumnDef<number[]>[] {
  return [
    ...Array.from({ length }, (_, i) => ({
      id: String(i),
      header: () => h('span', [h('span', 'x'), h('sub', {}, i)]),
      accessorFn: (row: number[]) => row[i],
    })),
    {
      id: 'y1',
      header: () => h('span', [h('span', 'y'), h('sub', {}, 1)]),
      accessorFn: (row: number[]) => row[row.length - 3],
    },
    {
      id: 'y2',
      header: () => h('span', [h('span', 'y'), h('sub', {}, 2)]),
      accessorFn: (row: number[]) => row[row.length - 2],
    },
    {
      id: 'y3',
      header: () => h('span', [h('span', 'y'), h('sub', {}, 3)]),
      accessorFn: (row: number[]) => row[row.length - 1],
    },
  ];
}

export function createWeightColumns(length: number): ColumnDef<number[]>[] {
  return [
    ...Array.from({ length }, (_, i) => ({
      id: String(i + 1),
      header: () => h('span', [h('span', 'w'), h('sub', {}, i + 1)]),
      accessorFn: (row: number[]) => row[i],
    })),
  ];
}

export function useDelta() {
  const initialX: number[][] = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  const x = ref(initialX);
  const samples: Ref<number[][]> = ref([]);
  const rawSamples: Ref<number[][][]> = ref([]);
  const fetchSamples: Ref<GenerateDataItem[]> = ref([]);

  const resetX = () => {
    x.value = initialX;
  };

  const addSample = (y: number[]) => {
    samples.value = [...samples.value, [1, ...x.value.flat(), ...y]];
    rawSamples.value = [...rawSamples.value, x.value];
    fetchSamples.value = [...fetchSamples.value, { y_true: y, x: x.value.flat() }];
    resetX();
  };

  return {
    x,
    samples,
    rawSamples,
    fetchSamples,
    addSample,
  };
}
