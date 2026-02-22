import { ref, type Ref } from 'vue';

export function useHebbian() {
  const initialX: number[][] = Array.from({ length: 5 }, () => Array(3).fill(0));
  const x = ref(initialX);
  const samples: Ref<number[][]> = ref([]);

  const resetX = () => {
    x.value = initialX;
  }

  const addSample = (y: number) => {
    samples.value = [...samples.value, [y, ...x.value.flat()]];
    resetX();
  }

  return {
    x,
    samples,
    addSample
  }
}
