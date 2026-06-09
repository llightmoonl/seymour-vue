<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import VButton from '@common/components/VButton/VButton.vue';
import HebbianNeuron from './HebbianNeuron.vue';
import { DrawingGridEditable, DetailList } from '../../_';

import { COLS, ROWS } from '../models/constant';

import { useHebbianData } from '../composables/useHebbianData';
import { useRecognition } from '../composables/useRecognition';
import { useHebbian } from '@modules/Research/modules/Hebbian/composables/useHebbian';

const { t } = useI18n();

const route = useRoute();
const pageId = String(route.params.id ?? '');

const { x, resetX } = useHebbian();
const { state } = useHebbianData(pageId);
const { recognition, state: stateRecognition } = useRecognition(pageId, x);

const resultRecognition = computed(() => {
  const data = stateRecognition.value?.data;

  return data?.result ?? null;
});

const runRecognition = () => {
  recognition();
  resetX();
};

const data = computed(() => {
  const data = state.value?.data;

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
const detailsData = computed(() => [
  {
    id: 1,
    title: t('hebbian.shared.thresholdNeuron'),
    formula: `$\\theta = ${data.value.neuron}$`,
  },
  {
    id: 2,
    title: t('hebbian.shared.sumInput'),
    formula: `$S = ${data.value.s}$`,
  },
  {
    id: 3,
    title: t('hebbian.shared.output'),
    formula: `$y = ${resultRecognition.value ?? 0}$`,
  },
  {
    id: 4,
    title: `${t('hebbian.recognition.answer.text')}:`,
    value:
      resultRecognition.value != null
        ? resultRecognition.value
          ? t('hebbian.recognition.answer.odd')
          : t('hebbian.recognition.answer.even')
        : '',
  },
]);
</script>

<template>
  <div class="hebbian-recognition">
    <div class="hebbian-recognition__content">
      <div class="hebbian-recognition__input-panel">
        <drawing-grid-editable v-model:grid="x"></drawing-grid-editable>
        <v-button @click="runRecognition" class="hebbian-recognition__input-panel-button">
          {{ $t('hebbian.recognition.button') }}
        </v-button>
      </div>
      <hebbian-neuron
        class="hebbian-recognition__neuron"
        :w="data.weights"
        :s="data.s"
        :y="resultRecognition ?? 0"
        :neuron="data.neuron" />
      <detail-list class="hebbian-recognition__calculations" :details="detailsData" direction="column"></detail-list>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hebbian-recognition {
  margin-top: rem(32);

  &__content {
    display: flex;
    column-gap: rem(48);
  }

  &__input-panel {
    display: flex;
    flex-direction: column;
    gap: rem(16);

    &-button {
      width: 100%;
    }
  }
}
</style>
