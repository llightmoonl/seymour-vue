<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

import VButton from '@common/components/VButton/VButton.vue';
import VMarkdown from '@common/components/VMarkdown/VMarkdown.vue';

import HebbianNeuron from './HebbianNeuron.vue';
import HebbianSamplesTable from './HebbianSamplesTable.vue';
import HebbianWeightsTable from './HebbianWeightsTable.vue';

import { DetailList } from '../../_';

import { useHebbianData } from '../composables/useHebbianData';
import { useChangeWeight } from '../composables/useChangeWeight';
import { useNextStage } from '../composables/useNextStage';

import { ButtonSizes } from '@common/components/VButton/VButton.types';

const { t } = useI18n();
const route = useRoute();
const pageId = String(route.params.id ?? '');

const { state } = useHebbianData(pageId);
const { changeWeight, asyncStatus } = useChangeWeight(pageId);
const { nextStage } = useNextStage(pageId);

const data = computed(() => {
  const data = state.value?.data;

  return {
    epoch: data?.epoch ?? 0,
    y: data?.y_pred ?? 0,
    s: data?.s ?? 0,
    neuron: data?.neuron ?? 0,
    correction: data?.correction ?? 'none',
    samples: (data?.data ?? []).map(({ x, y_true }) => [...x, y_true]),

    weights: data?.w ?? [],
    weightsTable: [data?.w ?? []],

    isTrained: data?.isTrained ?? false,
    i: data?.i ?? 0,
    j: data?.j ?? 0,
    error: data?.error ?? 0,
  };
});

const calculationsData = computed(() => [
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
    formula: `$y_{pred} = \\begin{cases} 1, & \\text{если } S \\geq \\theta \\\\ 0, & \\text{если } S < \\theta \\end{cases} \\rightarrow ${data.value.y}$`,
  },
  {
    id: 5,
    title: t('hebbian.training.countError'),
    value: data.value.error,
  },
]);
</script>

<template>
  <div class="hebbian-training">
    <div class="hebbian-training__content">
      <div class="hebbian-training__neuron">
        <hebbian-neuron :w="data.weights" :s="data.s" :y="data.y" :neuron="data.neuron" />
        <div v-if="data.correction !== 'none'" class="hebbian-training__rule">
          <VMarkdown v-if="data.correction === 'plus'" content="$w_i = w_i + x_i$" />
          <VMarkdown v-if="data.correction === 'minus'" content="$w_i = w_i - x_i$" />
        </div>
      </div>

      <div class="hebbian-training__tables">
        <hebbian-samples-table :data="data.samples" :row-index-highlight="data.i" :column-index-highlight="data.j" />
        <hebbian-weights-table :data="data.weightsTable" :row-index-highlight="0" :column-index-highlight="data.j" />
      </div>
    </div>

    <div class="hebbian-training__controllers">
      <v-button @click="nextStage" v-if="data.isTrained">
        {{ $t('hebbian.training.completeLearning') }}
      </v-button>
      <v-button
        v-if="!data.isTrained"
        @click="changeWeight"
        :disabled="asyncStatus === 'loading'"
        :size="ButtonSizes.MD"
        icon-only>
        <i-custom-play />
      </v-button>
    </div>

    <detail-list class="hebbian-training__calculations" :details="calculationsData" />
  </div>
</template>

<style scoped lang="scss">
.hebbian-training {
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

  &__rule {
    display: flex;
    justify-content: center;
    border: 1px solid var(--ring);
    width: fit-content;
    padding: rem(6) rem(12);
    margin: 0 auto;

    &:deep(.markdown p) {
      margin: 0;
    }
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
