<script setup lang="ts">
import { useRoute } from 'vue-router';

import VButton from '@common/components/VButton/VButton.vue';
import VCarousel from '@common/components/VCarousel/VCarousel.vue';

import HebbianSamplesTable from './HebbianSamplesTable.vue';
import { DrawingGridEditable, DrawingGridView } from '../../_';

import { useGenerateData } from '../composables/useGenerateData';
import { useHebbian } from '../composables/useHebbian';

import { EVEN, ODD } from '../models/constant';

import { ButtonSizes, ButtonVariants } from '@common/components/VButton/VButton.types';

const route = useRoute();
const pageId = String(route.params.id ?? '');

const { x, samples, rawSamples, fetchSamples, addSample, isUnchanged } = useHebbian();

const { generateData, asyncStatus } = useGenerateData(pageId, fetchSamples);
</script>

<template>
  <div class="hebbian-generation">
    <div class="hebbian-generation__content">
      <div class="hebbian-generation__input-panel">
        <drawing-grid-editable class="hebbian-generation__input-panel-grid" v-model:grid="x" />
        <div class="hebbian-generation__input-panel-controllers">
          <v-button
            class="hebbian-generation__input-panel-button"
            @click="() => addSample(EVEN)"
            :disabled="isUnchanged"
            :size="ButtonSizes.MD"
            :variant="ButtonVariants.SUBTLE">
            {{ $t('hebbian.buttons.even.title') }}
          </v-button>
          <v-button
            class="hebbian-generation__input-panel-button"
            @click="() => addSample(ODD)"
            :disabled="isUnchanged"
            :size="ButtonSizes.MD">
            {{ $t('hebbian.buttons.odd.title') }}
          </v-button>
        </div>
        <v-button
          v-if="samples.length >= 10"
          :disabled="asyncStatus === 'loading'"
          :is-loading="asyncStatus === 'loading'"
          class="hebbian-generation__complete"
          @click="generateData">
          {{ $t('hebbian.generation.finish') }}
        </v-button>
      </div>
      <hebbian-samples-table :data="samples" />
    </div>

    <v-carousel class="hebbian-generation__samples" :options="{ slidesToScroll: 8 }" :items="rawSamples">
      <template #slide="{ item }">
        <drawing-grid-view :size="50" :grid="item"></drawing-grid-view>
      </template>
    </v-carousel>
  </div>
</template>

<style scoped lang="scss">
.hebbian-generation {
  margin-top: rem(32);

  &__content {
    display: flex;
    align-items: start;
    column-gap: rem(48);
  }

  &__input-panel {
    display: flex;
    flex-direction: column;
    gap: rem(16);

    &-controllers {
      display: flex;
      gap: rem(8);
    }

    &-button {
      flex-grow: 1;
    }
  }

  &__samples {
    margin-block: rem(32);
  }
}
</style>
