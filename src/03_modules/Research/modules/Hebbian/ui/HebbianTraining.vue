<script setup lang="ts">
import { computed, ref, type Ref } from 'vue';

import { VButton, VTable } from '@common/components';
import { DrawingGridEditable, DetailBlock } from '@modules/Research';

import { random } from '@common/utils/random';

const x = ref(Array.from({ length: 5 }, () => Array.from({ length: 3 }, () => 0)));
const w = ref(Array.from({ length: 5 }, () => Array.from({ length: 3 }, () => random(1, 3))));
const y = ref(0);
const s = ref(0);
const neuron = random(1, 3);
const setsX: Ref<number[][]> = ref([]);
const setsW: Ref<number[][]> = ref([w.value.flat()]);

const detailsData = computed(() => [
  {
    id: 1,
    title: 'Порог чувствительности нейрона (Ө)',
    tooltip: 'Генерируется случайным образом',
    marker: 'Ө',
    value: neuron,
  },
  {
    id: 2,
    title: 'Взвешенное суммирование входных сигналов',
    tooltip: '$S = \\sum_{j=1}^N w_j x_j$',
    marker: 'S',
    value: s.value,
  },
  {
    id: 3,
    title: 'Выходной сигнал',
    tooltip: 'Условие: если S ≥ Θ, то y = 1\n если S < Θ, то y = 0',
    marker: 'y',
    value: y.value,
  },
]);
</script>

<template>
  <div class="root">
    <div class="header">
      <div class="drawing-section">
        <div>
          <DrawingGridEditable v-model:grid="x" />
        </div>
        <div class="detail-information">
          <DetailBlock v-for="detail in detailsData" :key="detail.id" :marker="detail.marker">
            <template #title>{{ detail.title }}</template>
            <template #tooltip>{{ detail.tooltip }}</template>
            <template #value>{{ detail.value }}</template>
          </DetailBlock>
        </div>
      </div>
      <div class="tables-data">
        <div class="table-element">
          <VTable :headers="['№', ...Array.from({ length: 15 }, (_, i) => `x${i + 1}`)]" :data="setsX" />
        </div>
        <div class="table-element">
          <VTable :headers="['№', ...Array.from({ length: 15 }, (_, i) => `w${i + 1}`)]" :data="setsW" />
        </div>
      </div>
    </div>

    <div class="controller-section">
      <div class="group group__left">
        <VButton>Четное</VButton>
        <VButton>Нечетное</VButton>
      </div>
      <div class="group group__right">
        <VButton>Завершить обучение</VButton>
        <VButton size="icon-md"><i-custom-play></i-custom-play></VButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@common/styles/helpers' as *;

.root {
  margin-top: rem(32);
}

.header {
  display: flex;
  justify-content: space-between;
  column-gap: rem(128);
}

.drawing-section {
  display: flex;
  column-gap: rem(32);
  flex-shrink: 0;

  & .detail-information {
    display: flex;
    flex-direction: column;
    row-gap: rem(20);
    max-width: rem(350);
  }
}

.tables-data {
  display: flex;
  flex-direction: column;
  row-gap: rem(20);

  & .table-element {
    flex-shrink: 1;
    max-height: rem(215);
    min-width: max-content;
    overflow-x: auto;
    overflow-y: auto;
    scrollbar-gutter: auto;
    scrollbar-width: thin;
    scrollbar-color: rgb(203, 203, 203) rgb(48, 48, 48);
    scroll-behavior: smooth;
  }
}

.controller-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: rem(16);

  & .group {
    display: flex;
    align-items: stretch;
    gap: rem(8);
  }
}
</style>
