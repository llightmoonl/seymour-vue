import { ref, type Ref, h } from 'vue';
import { ROWS, COLS } from './constant';
import type { ColumnDef } from '@tanstack/vue-table';

export function createSamplesColumns(length: number): ColumnDef<number[]>[] {
  return [
    {
      id: '0',
      header: 'y',
      accessorFn: (row) => row[0],
    },
    ...Array.from({ length }, (_, i) => ({
      id: String(i + 1),
      header: () => h('span', [h('span', 'x'), h('sub', {}, i + 1)]),
      accessorFn: (row: number[]) => row[i + 1],
    })),
  ];
}

export function useHebbian() {
  const initialX: number[][] = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  const x = ref(initialX);
  const samples: Ref<number[][]> = ref([]);
  const rawSamples: Ref<number[][][]> = ref([]);

  const resetX = () => {
    x.value = initialX;
  }

  const addSample = (y: number) => {
    samples.value = [...samples.value, [y, ...x.value.flat()]];
    rawSamples.value = [...rawSamples.value, x.value];
    resetX();
  }

  return {
    x,
    samples,
    rawSamples,
    addSample,
  }
}
