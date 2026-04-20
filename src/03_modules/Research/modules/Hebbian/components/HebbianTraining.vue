<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

import { VButton, VTable } from '@common/components';
import { HebbianNeuron } from '../';
import { useCompleteTab, DetailList, useTabs } from '../../../';

import { createSamplesColumns, createWeightColumns } from '../composables/useHebbian';
import { useGetHebbianData } from '../composables/useGetHebbianData';
import { useChangeWeight } from '../composables/useChangeWeight';

import { SAMPLE_LENGTH } from '../models/constant';

const samplesColumns = createSamplesColumns(SAMPLE_LENGTH);
const weightColumns = createWeightColumns(SAMPLE_LENGTH);

const { t } = useI18n();
const route = useRoute();
const pageId = route.params.id ? String(route.params.id) : '';
const { setActiveTab } = useTabs();

const { state, refetch } = useGetHebbianData(pageId);
const { changeWeight, asyncStatus: changeWeightAsyncStatus } = useChangeWeight(pageId);

const data = computed(() => {
  const data = state.value?.data;

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

const { completeTab } = useCompleteTab(pageId, 'training');

const detailsData = computed(() => [
  {
    id: 1,
    title: t('hebbian.training.epochs'),
    value: data.value.epoch,
  },
  {
    id: 2,
    title: t('hebbian.shared.thresholdNeuron'),
    formula: `$\\theta = ${data.value.neuron}$`,
  },
  {
    id: 3,
    title: t('hebbian.shared.sumInput'),
    formula: `$S = \\sum_{j=1}^{15} w_j x_j = ${data.value.s}$`,
  },
  {
    id: 4,
    title: t('hebbian.shared.output'),
    formula: `$y_{pred} = \\begin{cases} 1, & \\text{если } S \\geq \\theta \\\\ 0, & \\text{если } S < \\theta \\end{cases} = ${data.value.y}$`,
  },
  {
    id: 5,
    title: t('hebbian.training.countError'),
    value: data.value.error,
  },
]);

const handleCompleteData = () => {
  completeTab();
  setActiveTab('quality');
};
</script>

<template>
  <div class="root">
    <div class="header">
      <hebbian-neuron :w="data.weights" :s="data.s" :y="data.y" :neuron="data.neuron" />
      <div class="tables-data">
        <div class="table">
          <v-table
            :data="data.samples"
            :columns="samplesColumns"
            :row-index-highlight="data.i"
            :column-index-highlight="data.j" />
        </div>
        <div class="table">
          <v-table
            :data="data.weightsTable"
            :columns="weightColumns"
            :row-index-highlight="0"
            :column-index-highlight="data.j" />
        </div>
      </div>
    </div>

    <div class="controller-section">
      <div class="group group__right">
        <v-button @click="handleCompleteData" v-if="data.isTrained">
          {{ $t('hebbian.training.completeLearning') }}
        </v-button>
        <v-button
          v-if="!data.isTrained"
          @click="handleChangeWeight"
          :disabled="changeWeightAsyncStatus === 'loading'"
          size="icon-md">
          <i-custom-play></i-custom-play>
        </v-button>
      </div>
    </div>
    <detail-list class="information-list" :details="detailsData" />
  </div>
</template>

<style scoped lang="scss">
.root {
  margin-top: rem(32);
}

.header {
  display: flex;
  justify-content: space-between;
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
  overflow: auto;

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
