<script setup lang="ts">
// import { computed, ref } from 'vue';

import { VButton, VTable } from '@common/components';
import { NeuronBase } from '@modules/Research';

import { createSamplesColumns, useHebbian } from '../models/useHebbian';
import { SAMPLE_LENGTH } from '../models/constant';

// import { random } from '@common/utils/random';

// const epoch = ref(0);
// const y = ref(0);
// const s = ref(0);
// const neuron = random(1, 3);

const { samples } = useHebbian();
const xColumns = createSamplesColumns(SAMPLE_LENGTH);

// const detailsData = computed(() => [
//   {
//     id: 1,
//     title: 'Эпохи обучения:',
//     value: epoch,
//   },
//   {
//     id: 1,
//     title: 'Порог чувствительности нейрона (Ө)',
//     marker: 'Ө',
//     value: neuron,
//   },
//   {
//     id: 2,
//     title: 'Взвешенное суммирование входных сигналов',
//     marker: 'S',
//     value: s.value,
//   },
//   {
//     id: 3,
//     title: 'Выходной сигнал',
//     marker: 'y',
//     value: y.value,
//   },
// ]);
</script>

<template>
  <div class="root">
    <div class="header">
      <neuron-base></neuron-base>
      <div class="tables-data">
        <div class="table">
          <VTable :data="samples" :columns="xColumns" />
        </div>
        <div class="table">
          <VTable :data="samples" :columns="xColumns" />
        </div>
      </div>
    </div>

    <div class="controller-section">
      <div class="group group__right">
        <VButton>Завершить обучение</VButton>
        <VButton size="icon-md"><i-custom-play></i-custom-play></VButton>
      </div>
    </div>
    <!--    <DetailList :details="detailsData" />-->
  </div>
</template>

<style scoped lang="scss">
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
  justify-content: end;
  margin-top: rem(16);

  & .group {
    display: flex;
    align-items: stretch;
    gap: rem(8);
  }
}
</style>
