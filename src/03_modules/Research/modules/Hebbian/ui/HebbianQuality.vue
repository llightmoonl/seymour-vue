<script setup lang="ts">
import { computed, ref } from 'vue';
import { DetailList, DrawingGridView, NeuronBase } from '@modules/Research';


import { random } from '@common/utils/random';
import { useHebbian } from '@modules/Research/modules/Hebbian/models/useHebbian.ts';
import { VButton, VCarousel } from '@common/components';

const { x, rawSamples } = useHebbian();
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
        <drawing-grid-view :grid="x"></drawing-grid-view>
        <v-button class="drawing-canvas__button">Распознать</v-button>
      </div>
      <neuron-base></neuron-base>
      <detail-list :details="detailsData"></detail-list>
    </div>

    <v-carousel class="carousel-samples" :options="{ slidesToScroll: 8 }" :items="rawSamples">
      <template #slide="{ item }">
        <drawing-grid-view :size="50" :grid="item"></drawing-grid-view>
      </template>
    </v-carousel>
  </div>
</template>

<style scoped lang="scss">
@use '@common/styles/helpers' as *;

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

.carousel-samples {
  margin-block: rem(32);
}
</style>
