<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import VButton from '@common/components/VButton/VButton.vue';
import { DetailList, DrawingGridEditable } from '@modules/Research';
import { HebbianNeuron } from '../';

import { COLS, ROWS } from '../models/constant';

import { useGetHebbianData } from '../composables/useGetHebbianData';
import { useRecognition } from '../composables/useRecognition';

const route = useRoute();
const { t } = useI18n();

const pageId = route.params.id ? String(route.params.id) : '';

const { state, refetch } = useGetHebbianData(pageId);

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

const initialX: number[][] = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
const x = ref(initialX);

const { recognition, state: stateRecognition } = useRecognition(pageId, x);

const resultRecognition = computed(() => {
  const data = stateRecognition.value?.data;

  return data?.result ?? null;
});

const handleRecognition = () => {
  recognition().then(() => refetch());
  x.value = initialX;
};

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
  <div class="root">
    <div class="header">
      <div class="drawing-canvas">
        <drawing-grid-editable v-model:grid="x"></drawing-grid-editable>
        <v-button @click="handleRecognition" class="drawing-canvas__button">
          {{ $t('hebbian.recognition.button') }}
        </v-button>
      </div>
      <hebbian-neuron :w="data.weights" :s="data.s" :y="resultRecognition ?? 0" :neuron="data.neuron" />
      <detail-list :details="detailsData" direction="column"></detail-list>
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
