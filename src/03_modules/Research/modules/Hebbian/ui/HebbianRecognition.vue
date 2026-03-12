<script setup lang="ts">
import { computed, ref } from 'vue';
import { DetailList, DrawingGridEditable, NeuronBase } from '@modules/Research';

import { random } from '@common/utils/random';
import { useHebbian } from '@modules/Research/modules/Hebbian/models/useHebbian.ts';
import { VButton } from '@common/components';

const { x } = useHebbian();
const y = ref(0);
const s = ref(0);
const neuron = random(1, 3);

const detailsData = computed(() => [
  {
    id: 1,
    title: 'Порог чувствительности нейрона (Ө)',
    marker: 'Ө',
    value: neuron,
  },
  {
    id: 2,
    title: 'Взвешенное суммирование входных сигналов',
    marker: 'S',
    value: s.value,
  },
  {
    id: 3,
    title: 'Выходной сигнал',
    marker: 'y',
    value: y.value,
  },
  {
    id: 4,
    title: 'Ответ:',
    value: y.value,
  },
]);
</script>

<template>
  <div class="root">
    <div class="header">
      <div class="drawing-canvas">
        <drawing-grid-editable :grid="x"></drawing-grid-editable>
        <v-button class="drawing-canvas__button">Распознать</v-button>
      </div>
      <neuron-base></neuron-base>
      <detail-list :details="detailsData"></detail-list>
    </div>
  </div>
</template>

<style scoped lang="scss">
.root {
  margin-top: rem(32);
}

.header {
  display: flex;
  column-gap: rem(48);
}

.drawing-canvas {
  display: flex;
  flex-direction: column;
  gap: rem(16);

  &__button {
    width: 100%;
  }
}
</style>
