<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import VButton from '@common/components/VButton/VButton.vue';

import { DeltaNeuron } from '../';
import { DetailList, DrawingGridEditable } from '../../../';

import { useGetDeltaData } from '../composables/useGetDeltaData';
import { useRecognition } from '../composables/useRecognition';
import { COLS, ROWS } from '../models/constant';

import { formatArray } from '@common/utils/array';
import { createOutputsColumns, createSumColumns } from '@modules/Research/modules/Delta/composables/useDelta';

const route = useRoute();
const { t } = useI18n();

const pageId = route.params.id ? String(route.params.id) : '';

const { state, refetch } = useGetDeltaData(pageId);

const data = computed(() => {
  const data = state.value?.data;

  return {
    y: data?.y_pred ?? [],
    s: formatArray(data?.s) ?? [],
    eta: data?.eta.toFixed(2) ?? 0,
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

  return data?.y_pred ?? null;
});

const handleRecognition = () => {
  recognition().then(() => refetch());
  x.value = initialX;
};

const outputsColumns = createOutputsColumns(3);
const sumColumns = createSumColumns(3);

const detailsData = computed(() => [
  {
    id: 1,
    title: t('delta.shared.speed'),
    formula: '$\\eta$ =',
    value: data.value.eta,
  },
  {
    id: 2,
    title: `${t('delta.shared.sumInput')} (S)`,
    tableData: [data.value.s],
    tableColumns: sumColumns,
  },
  {
    id: 3,
    title: `Выходной вектор (y)`,
    tableData: [resultRecognition.value ?? []],
    tableColumns: outputsColumns,
  },
  {
    id: 4,
    title: `${t('hebbian.recognition.answer.text')}:`,
    value:
      resultRecognition.value?.[0] === 1
        ? 'Буква A'
        : resultRecognition.value?.[1] === 1
          ? 'Буква B'
          : resultRecognition.value?.[2] === 1
            ? 'Буква C'
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
      <delta-neuron :s="data.s" :y="data.y" />
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
