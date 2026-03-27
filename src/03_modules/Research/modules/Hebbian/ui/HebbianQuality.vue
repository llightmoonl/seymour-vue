<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

import { VButton, VCarousel } from '@common/components';
import { DetailList, DrawingGridView, NeuronBase, useTabs } from '@modules/Research';

import { useGetHebbianData } from '../models/useGetHebbianData';
import { COLS, ROWS } from '../models/constant';
import { useRecognition } from '@modules/Research/modules/Hebbian/models/useRecognition.ts';
import { useCompleteTab } from '@modules/Research/models/useCompleteTab.ts';

const route = useRoute();
const { t } = useI18n();
const pageId = route.params.id ? String(route.params.id) : '';
const { setActiveTab } = useTabs();

const { state, refetch } = useGetHebbianData(pageId);

const data = computed(() => {
  const data = state.value?.data?.data;

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
const countCheckedElement = ref(0);

const clickItem = (item) => {
  x.value = item;
};

const { recognition, state: stateRecognition } = useRecognition(pageId, x);

const resultRecognition = computed(() => {
  const data = stateRecognition.value?.data?.data;

  return data?.result ?? null;
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
      <neuron-base :w="data.weights" :s="data.s" :y="resultRecognition ?? 0"></neuron-base>
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
