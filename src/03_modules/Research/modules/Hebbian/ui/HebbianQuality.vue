<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

import { VButton, VCarousel } from '@common/components';
import { DetailList, DrawingGridView, NeuronBase } from '@modules/Research';

import { useGetHebbianData } from '@modules/Research/modules/Hebbian/models/useGetHebbianData.ts';
import { COLS, ROWS } from '@modules/Research/modules/Hebbian/models/constant.ts';

const route = useRoute();
const pageId = computed(() => (route.params.id ? String(route.params.id) : ''));

const { state } = useGetHebbianData(pageId.value);

const data = computed(() => {
  const data = state.value?.data?.data;

  return {
    y: data?.y_pred ?? 0,
    s: data?.s ?? 0,
    neuron: data?.neuron ?? 0,
    samples: (data?.data ?? []).map(({ x }) =>
      Array.from({ length: ROWS }, (_, i) => x.slice(i * COLS, i * COLS + COLS)),
    ),
    weights: data?.w ?? [],
  };
});

const initialX: number[][] = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
const x = ref(initialX);

const clickItem = (item) => {
  x.value = item;
};

const detailsData = computed(() => [
  {
    id: 1,
    title: 'Порог чувствительности нейрона (Ө)',
    marker: 'Ө',
    value: data.value.neuron,
  },
  {
    id: 2,
    title: 'Взвешенное суммирование входных сигналов',
    marker: 'S',
    value: data.value.s,
  },
  {
    id: 3,
    title: 'Выходной сигнал',
    marker: 'y',
    value: data.value.y,
  },
  // {
  //   id: 4,
  //   title: 'Ответ:',
  //   value: y.value,
  // },
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

    <v-carousel class="carousel-samples" :options="{ slidesToScroll: 8 }" :items="data.samples">
      <template #slide="{ item }">
        <drawing-grid-view
          class="carousel-samples-item"
          :size="50"
          :grid="item"
          @click="() => clickItem(item)"></drawing-grid-view>
      </template>
    </v-carousel>
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

.carousel-samples {
  margin-block: rem(32);

  &-item {
    cursor: pointer;
  }
}
</style>
