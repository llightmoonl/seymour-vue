<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

import VButton from '@common/components/VButton/VButton.vue';
import VCarousel from '@common/components/VCarousel/VCarousel.vue';

import DeltaNeuron from './DeltaNeuron.vue';
import { DetailList, DrawingGridView } from '../../_';

import { useDeltaData } from '../queries/useDeltaData';
import { useRecognition } from '../queries/useRecognition';
import { useNextStage } from '../queries/useNextStage';

import { useDelta } from '../composables/useDelta';
import { useDeltaTables } from '../composables/useDeltaTables.ts';

import { COLS, ROWS } from '../models/constant';

import { formatArray } from '@common/utils/array';

const { t } = useI18n();

const route = useRoute();
const pageId = String(route.params.id ?? '');

const { x, isUnchanged } = useDelta();
const { state } = useDeltaData(pageId);
const { nextStage } = useNextStage(pageId);
const { outputsColumns, sumColumns } = useDeltaTables(3);
const { recognition, state: stateRecognition } = useRecognition(pageId, x);

const checkedItems = ref(new Set<number>());
const currentIndex = ref(0);

const resultRecognition = computed(() => {
  const data = stateRecognition.value?.data;

  return data?.y_pred ?? null;
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
    y: data?.y_pred ?? [],
    s: formatArray(data?.s) ?? [],
    eta: data?.eta.toFixed(2) ?? 0,
    samples: (data?.data ?? []).map(({ x }) =>
      Array.from({ length: ROWS }, (_, i) => x.slice(i * COLS, i * COLS + COLS)),
    ),
    weights: data?.w ?? [],
  };
});

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
    tableColumns: sumColumns(),
  },
  {
    id: 3,
    title: `${t('delta.shared.sumInput')} (y)`,
    tableData: [resultRecognition.value ?? []],
    tableColumns: outputsColumns(),
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
  <div class="delta-quality">
    <div class="delta-quality__content">
      <div class="delta-quality__input-panel">
        <drawing-grid-view :grid="x"></drawing-grid-view>
        <v-button :disabled="isUnchanged" class="delta-quality__input-panel-button" @click="runRecognition">
          {{ $t('hebbian.recognition.button') }}
        </v-button>
        <v-button
          v-if="checkedItems.size === data.samples.length"
          @click="nextStage"
          class="delta-quality__input-panel-button">
          {{ $t('hebbian.recognition.complete') }}
        </v-button>
      </div>
      <delta-neuron class="delta-quality__neuron" :s="data.s" :y="data.y" />
      <detail-list class="delta-quality__calculations" :details="detailsData" direction="column"></detail-list>
    </div>

    <v-carousel class="delta-quality__samples" :options="{ slidesToScroll: 8 }" :items="data.samples">
      <template #slide="{ item, index }">
        <drawing-grid-view
          class="delta-quality__samples-item"
          :size="50"
          :grid="item"
          @click="() => clickItem(item, index)"></drawing-grid-view>
      </template>
    </v-carousel>
  </div>
</template>

<style scoped lang="scss">
.delta-quality {
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
