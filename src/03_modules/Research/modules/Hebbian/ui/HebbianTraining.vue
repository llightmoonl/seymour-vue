<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { VButton, VTable } from '@common/components';
import { NeuronBase, DetailList } from '@modules/Research';

import { createSamplesColumns, createWeightColumns } from '../models/useHebbian';
import { useGetHebbianData } from '../models/useGetHebbianData';
import { useChangeWeight } from '../models/useChangeWeight';

import { SAMPLE_LENGTH } from '../models/constant';

const samplesColumns = createSamplesColumns(SAMPLE_LENGTH);
const weightColumns = createWeightColumns(SAMPLE_LENGTH);

const route = useRoute();
const pageId = computed(() => (route.params.id ? String(route.params.id) : ''));

const { state, refetch } = useGetHebbianData(pageId.value);
const { changeWeight, asyncStatus: changeWeightAsyncStatus } = useChangeWeight(pageId.value);

const data = computed(() => {
  const data = state.value?.data?.data;

  return {
    epoch: data?.epoch ?? 0,
    y: data?.y_pred ?? 0,
    s: data?.s ?? 0,
    neuron: data?.neuron ?? 0,

    samples: (data?.data ?? []).map(({ x, y_true }) => [...x, y_true]),

    weights: data?.w ?? [],
    weightsTable: [data?.w ?? []],

    isTrained: data?.isTrained ?? false,
    i: data?.i ?? 0,
    j: data?.j ?? 0,
    error: data?.error ?? 0,
  };
});

const handleChangeWeight = () => {
  changeWeight().then(() => refetch());
};

const detailsData = computed(() => [
  {
    id: 1,
    title: 'Эпохи обучения:',
    value: data.value.epoch,
  },
  {
    id: 2,
    title: 'Порог чувствительности нейрона (Ө):',
    marker: 'Ө',
    value: data.value.neuron,
  },
  {
    id: 3,
    title: 'Взвешенное суммирование входных сигналов:',
    marker: 'S',
    value: data.value.s,
  },
  {
    id: 4,
    title: 'Выходной сигнал:',
    marker: 'y',
    value: data.value.y,
  },
  {
    id: 5,
    title: 'Количество ошибок за эпоху:',
    value: data.value.error,
  },
]);
</script>

<template>
  <div class="root">
    <div class="header">
      <neuron-base :w="data.weights" :s="data.s" :y="data.y"></neuron-base>
      <div class="tables-data">
        <div class="table">
          <VTable
            :data="data.samples"
            :columns="samplesColumns"
            :row-index-highlight="data.i"
            :column-index-highlight="data.j" />
        </div>
        <div class="table">
          <VTable
            :data="data.weightsTable"
            :columns="weightColumns"
            :row-index-highlight="0"
            :column-index-highlight="data.j" />
        </div>
      </div>
    </div>

    <div class="controller-section">
      <div class="group group__right">
        <VButton v-if="data.isTrained">Завершить обучение</VButton>
        <VButton
          v-if="!data.isTrained"
          @click="handleChangeWeight"
          :disabled="changeWeightAsyncStatus === 'loading'"
          size="icon-md">
          <i-custom-play></i-custom-play>
        </VButton>
      </div>
    </div>
    <DetailList class="information-list" :details="detailsData" />
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
  align-items: start;

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

.information-list {
  margin-top: rem(64);
}
</style>
