<script setup lang="ts">
import { useRoute } from 'vue-router';

import { VButton, VTable, VCarousel } from '@common/components';
import { DrawingGridEditable, DrawingGridView, useTabs, useCompleteTab } from '../../../';

import { useGenerateData } from '../composables/useGenerateData';
import { useDelta, createSamplesColumns } from '../composables/useDelta';
import { A, B, C, SAMPLE_LENGTH } from '../models/constant';

const route = useRoute();
const pageId = route.params.id ? String(route.params.id) : '';

const { x, samples, rawSamples, fetchSamples, addSample } = useDelta();
const columns = createSamplesColumns(SAMPLE_LENGTH);

const { setActiveTab } = useTabs();

const { completeTab } = useCompleteTab(pageId, 'generation');
const { generateData, asyncStatus, status } = useGenerateData(pageId, fetchSamples);

const handleFinishData = async () => {
  await generateData();

  if (status.value === 'success') {
    completeTab();
    setActiveTab('training');
  }
};
</script>

<template>
  <div class="delta-generation">
    <div class="header">
      <div class="drawing-canvas">
        <drawing-grid-editable class="drawing-grid" v-model:grid="x" />
        <div class="drawing-canvas__controllers">
          <v-button variant="subtle" class="drawing-canvas__button" @click="() => addSample(A)" size="md">A</v-button>
          <v-button variant="subtle" class="drawing-canvas__button" @click="() => addSample(B)" size="md">B</v-button>
          <v-button variant="subtle" class="drawing-canvas__button" @click="() => addSample(C)" size="md">C</v-button>
        </div>
        <v-button
          v-if="samples.length >= 3"
          :disabled="asyncStatus === 'loading'"
          :is-loading="asyncStatus === 'loading'"
          class="finish-data"
          @click="handleFinishData">
          {{ $t('delta.generation.finish') }}
        </v-button>
      </div>
      <v-table class="table" :data="samples" :columns="columns" />
    </div>

    <v-carousel class="carousel-samples" :options="{ slidesToScroll: 8 }" :items="rawSamples">
      <template #slide="{ item }">
        <drawing-grid-view :size="50" :grid="item"></drawing-grid-view>
      </template>
    </v-carousel>
  </div>
</template>

<style scoped lang="scss">
.delta-generation {
  margin-top: rem(32);

  & .header {
    display: flex;
    align-items: start;
    column-gap: rem(48);
  }
}

.drawing-canvas {
  display: flex;
  flex-direction: column;
  gap: rem(16);

  &__controllers {
    display: flex;
    gap: rem(8);
  }

  &__button {
    flex-grow: 1;
  }
}

.controllers {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: rem(16);

  & .group {
    display: flex;
    align-items: center;
    gap: rem(8);
  }
}

.carousel-samples {
  margin-block: rem(32);
}
</style>
