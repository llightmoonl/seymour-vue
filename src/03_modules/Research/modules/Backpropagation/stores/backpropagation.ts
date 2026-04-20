import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useBackpropagationStore = defineStore('backpropagation', () => {
  const steps = ref<number>(0);

  const incrementSteps = () => {
    steps.value++;
  };

  const decrementSteps = () => {
    steps.value = Math.max(0, steps.value - 1);
  };

  const resetSteps = () => {
    steps.value = 0;
  };

  return { steps, incrementSteps, decrementSteps, resetSteps };
});
