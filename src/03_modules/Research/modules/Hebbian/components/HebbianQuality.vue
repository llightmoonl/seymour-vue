<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

import VButton from '@common/components/VButton/VButton.vue';
import VCarousel from '@common/components/VCarousel/VCarousel.vue';

import HebbianNeuron from './HebbianNeuron.vue';
import { DetailList, DrawingGridView } from '../../_';

import { useHebbianData } from '../composables/useHebbianData';
import { useRecognition } from '../composables/useRecognition';
import { useNextStage } from '../composables/useNextStage';

import { useHebbian } from '../composables/useHebbian';

import { COLS, ROWS } from '../models/constant';

const { t } = useI18n();

const route = useRoute();
const pageId = String(route.params.id ?? '');

const { x, isUnchanged } = useHebbian();
const { state } = useHebbianData(pageId);
const { nextStage } = useNextStage(pageId);
const { recognition, state: stateRecognition } = useRecognition(pageId, x);

const checkedItems = ref(new Set<number>());
const currentIndex = ref(0);

const resultRecognition = computed(() => {
  const data = stateRecognition.value?.data;

  return data?.result ?? null;
});

const clickItem = (item: number[][], index: number) => {
  x.value = item;
  currentIndex.value = index;
};

const runRecognition = () => {
  recognition();
  checkedItems.value.add(currentIndex.value);
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
const calculationsData = computed(() => [
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
  <div class="hebbian-quality">
    <div class="hebbian-quality__content">
      <div class="hebbian-quality__input-panel">
        <drawing-grid-view :grid="x"></drawing-grid-view>
        <v-button :disabled="isUnchanged" class="hebbian-quality__input-panel-button" @click="runRecognition">
          {{ $t('hebbian.recognition.button') }}
        </v-button>
        <v-button
          v-if="checkedItems.size === data.samples.length"
          @click="nextStage"
          class="hebbian-quality__input-panel-button">
          {{ $t('hebbian.recognition.complete') }}
        </v-button>
      </div>
      <hebbian-neuron
        class="hebbian-quality__neuron"
        :w="data.weights"
        :s="data.s"
        :y="resultRecognition ?? 0"
        :neuron="data.neuron" />
      <detail-list class="hebbian-quality__calculations" :details="calculationsData" direction="column" />
    </div>

    <v-carousel class="hebbian-quality__samples" :options="{ slidesToScroll: 8 }" :items="data.samples">
      <template #slide="{ item, index }">
        <drawing-grid-view
          class="hebbian-quality__samples-item"
          :size="50"
          :grid="item"
          @click="clickItem(item, index)" />
      </template>
    </v-carousel>
  </div>
</template>

<style scoped lang="scss">
.hebbian-quality {
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

  &__samples {
    margin-block: rem(32);
    &-item {
      cursor: pointer;
    }
  }
}
</style>
