<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

import { VButton, VCarousel } from '@common/components';
import { DeltaNeuron } from '../';
import { DetailList, DrawingGridView, useTabs, useCompleteTab } from '../../..';

import { useGetDeltaData } from '../composables/useGetDeltaData';
import { useRecognition } from '../composables/useRecognition';
import { COLS, ROWS } from '../models/constant';

import { formatArray } from '@common/utils/array';
import { createNeuronsColumns } from '@modules/Research/modules/Delta/composables/useDelta.ts';

const route = useRoute();
const { t } = useI18n();
const pageId = route.params.id ? String(route.params.id) : '';
const { setActiveTab } = useTabs();

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
const countCheckedElement = ref(0);

const clickItem = (item) => {
  x.value = item;
};

const { recognition, state: stateRecognition } = useRecognition(pageId, x);

const resultRecognition = computed(() => {
  const data = stateRecognition.value?.data;

  return data?.y_pred ?? null;
});

const isUnchanged = computed(() => JSON.stringify(x.value) === JSON.stringify(initialX));

const handleRecognition = () => {
  recognition().then(() => refetch());
  countCheckedElement.value += 1;
};

const { completeTab } = useCompleteTab(pageId, 'quality');

const handleComplete = () => {
  completeTab();

  setActiveTab('recognition');
};

const neuronsColumns = createNeuronsColumns(3);

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
    tableColumns: neuronsColumns,
  },
  {
    id: 3,
    title: `${t('delta.shared.sumInput')} (y)`,
    tableData: [resultRecognition.value ?? []],
    tableColumns: neuronsColumns,
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
        <drawing-grid-view :grid="x"></drawing-grid-view>
        <v-button :disabled="isUnchanged" class="drawing-canvas__button" @click="handleRecognition">
          {{ $t('hebbian.recognition.button') }}
        </v-button>
        <v-button
          v-show="countCheckedElement === data.samples.length"
          @click="handleComplete"
          class="drawing-canvas__button">
          {{ $t('hebbian.recognition.complete') }}
        </v-button>
      </div>
      <delta-neuron :s="data.s" :y="data.y" />
      <detail-list :details="detailsData" direction="column"></detail-list>
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
