<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import VButton from '@common/components/VButton/VButton.vue';

import DeltaNeuron from './DeltaNeuron.vue';
import DeltaSamplesTable from './DeltaSamplesTable.vue';
import DeltaWeightsTable from './DeltaWeightsTable.vue';

import { DetailList } from '../../_';

import { useDeltaData } from '../queries/useDeltaData';
import { useChangeWeight } from '../queries/useChangeWeight';
import { useNextStage } from '../queries/useNextStage';

import { useDeltaTables } from '../composables/useDeltaTables';

import { formatArray } from '@common/utils/array';

const { t } = useI18n();
const route = useRoute();
const pageId = String(route.params.id ?? '');

const { state } = useDeltaData(pageId);
const { changeWeight, asyncStatus } = useChangeWeight(pageId);
const { nextStage } = useNextStage(pageId);

const { outputsColumns, sumColumns, epsilonColumns } = useDeltaTables(3);

const data = computed(() => {
  const data = state.value?.data;

  return {
    epoch: data?.epoch ?? 0,
    y: data?.y_pred ?? [],
    s: formatArray(data?.s) ?? [],
    eta: data?.eta.toFixed(2) ?? 0,
    samples: (data?.data ?? []).map(({ x, y_true }) => [...x, y_true]),
    epsilon: data?.epsilon ?? [],

    weights: data?.w ?? [],
    weightsTable: [data?.w ?? []],

    isTrained: data?.isTrained ?? false,
    i: data?.i ?? 0,
    j: data?.j ?? 0,
    k: data?.k ?? 0,
    error: data?.error ?? 0,
  };
});

const calculationsData = computed(() => [
  {
    id: 1,
    title: t('delta.training.epochs'),
    value: data.value.epoch,
  },
  {
    id: 2,
    title: t('delta.training.countError'),
    value: data.value.error,
  },
  {
    id: 3,
    title: t('delta.shared.speed'),
    formula: '$\\eta$ =',
    value: data.value.eta,
  },
  {
    id: 4,
    title: t('delta.shared.sumInput'),
    formula: '$S_i = \\sum_{j=1}^{15} w_{ij} x_j$',
    tableData: [data.value.s],
    tableColumns: sumColumns(),
  },
  {
    id: 5,
    title: t('delta.shared.output'),
    formula: '$y_{ipred} = \\begin{cases} 1, & \\text{если } S_i \\geq 0\\\\ 0, & \\text{если } S_i < 0 \\end{cases}$',
    tableData: [data.value.y],
    tableColumns: outputsColumns(),
  },
  {
    id: 6,
    title: t('delta.shared.epsilon'),
    tableData: [data.value.epsilon],
    tableColumns: epsilonColumns(),
  },
]);
</script>

<template>
  <div class="delta-training">
    <div class="delta-training__content">
      <delta-neuron :s="data.s" :y="data.y" />
      <div class="delta-training__tables">
        <delta-samples-table :data="data.samples" :row-index-highlight="data.i" :column-index-highlight="data.j" />
        <delta-weights-table :data="data.weights" :row-index-highlight="data.k" :column-index-highlight="data.j" />
      </div>
    </div>

    <div class="delta-training__controllers">
      <VButton @click="nextStage" v-if="data.isTrained">
        {{ $t('delta.training.completeLearning') }}
      </VButton>
      <VButton v-if="!data.isTrained" @click="changeWeight" :disabled="asyncStatus === 'loading'" size="md" icon-only>
        <i-custom-play></i-custom-play>
      </VButton>
    </div>
    <detail-list class="delta-training__calculations" :details="calculationsData" />
  </div>
</template>

<style scoped lang="scss">
.delta-training {
  margin-top: rem(32);

  &__content {
    display: flex;
    justify-content: space-between;
  }

  &__tables {
    display: flex;
    flex-direction: column;
    row-gap: rem(20);
    align-items: start;
    overflow: auto;
  }

  &__controllers {
    display: flex;
    align-items: center;
    justify-content: end;
    margin-top: rem(16);
    gap: rem(8);
  }

  &__calculations {
    margin-top: rem(64);
  }
}
</style>
