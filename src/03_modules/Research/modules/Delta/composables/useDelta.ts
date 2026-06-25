import { ref, type Ref, computed } from 'vue';
import { ROWS, COLS } from '../models/constant.ts';

import type { GenerateDataItem } from '../api/types';

const createInitialX = () => Array.from({ length: ROWS }, () => Array(COLS).fill(0));

export function useDelta() {
  const x = ref(createInitialX());
  const initialX = createInitialX();
  const samples: Ref<number[][]> = ref([]);
  const rawSamples: Ref<number[][][]> = ref([]);
  const fetchSamples: Ref<GenerateDataItem[]> = ref([]);

  const resetX = () => {
    x.value = createInitialX();
  };

  const isUnchanged = computed(() => x.value.every((row, i) => row.every((val, j) => val === initialX[i][j])));

  const addSample = (y: number[]) => {
    samples.value = [...samples.value, [1, ...x.value.flat(), ...y]];
    rawSamples.value = [...rawSamples.value, x.value];
    fetchSamples.value = [...fetchSamples.value, { y_true: y, x: x.value.flat() }];
    resetX();
  };

  return {
    x,
    isUnchanged,
    samples,
    rawSamples,
    fetchSamples,
    addSample,
    resetX,
  };
}
