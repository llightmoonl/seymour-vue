<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';

import { VButton, VContainer } from '@common/components';
import { DetailList } from '@modules/Research';
import { BackpropagationNeuron, BackpropagationTabs } from '../';
import { useBackpropagationStore } from '../stores/backpropagation';

import { BACKWARD_TAB_STEP, LAST_STEP } from '../models/constants';

const { t } = useI18n();

const detailsData = computed(() => [
  {
    id: 1,
    formula: `d - ${t('backpropagation.info.response')}`,
  },
  {
    id: 2,
    formula: `f - ${t('backpropagation.info.activation')}`,
  },
  {
    id: 3,
    formula: `$\\eta$ - ${t('backpropagation.info.rate')}`,
  },
]);

const currentTab = ref('forward');
const currentPass = ref('forward');

const backpropagationStore = useBackpropagationStore();
const { steps } = storeToRefs(backpropagationStore);

watch(steps, (newSteps) => {
  if (newSteps >= BACKWARD_TAB_STEP) {
    currentTab.value = 'backward';
    currentPass.value = 'backward';
  } else {
    currentTab.value = 'forward';
    currentPass.value = 'forward';
  }
});
</script>

<template>
  <div class="backpropagation">
    <v-container size="lg">
      <h1 class="backpropagation__title">{{ $t('shared.algorithms.backpropagation') }}</h1>
      <div class="backpropagation__body">
        <div class="backpropagation__top">
          <div class="backpropagation__panel">
            <div class="backpropagation__pass">
              {{ currentPass === 'forward' ? 'Прямой проход' : 'Обратный проход' }}
            </div>
            <backpropagation-neuron :steps="steps" class="backpropagation__neuron" />
          </div>
          <div class="backpropagation__info">
            <detail-list class="backpropagation__detail-list" :details="detailsData" direction="column" />
            <backpropagation-tabs class="backpropagation__tabs" v-model="currentTab" />
          </div>
        </div>
        <div class="backpropagation__bottom">
          <div class="backpropagation__controllers">
            <v-button :disabled="steps <= 0" @click="backpropagationStore.resetSteps()">
              {{ $t('ui.button.reset') }}
            </v-button>
            <div class="backpropagation__player">
              <v-button
                :disabled="steps <= 0"
                size="md"
                variant="link"
                @click="backpropagationStore.decrementSteps()"
                icon-only>
                <i-custom-step-back></i-custom-step-back>
              </v-button>
              <v-button size="md" icon-only>
                <i-custom-play></i-custom-play>
              </v-button>
              <v-button
                :disabled="steps >= LAST_STEP"
                size="md"
                variant="link"
                @click="backpropagationStore.incrementSteps()"
                icon-only>
                <i-custom-step-forward></i-custom-step-forward>
              </v-button>
            </div>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<style scoped lang="scss">
.backpropagation {
  margin: rem(32) 0;

  &__top {
    display: flex;
    justify-content: space-between;
    align-items: start;
    gap: rem(32);
  }

  &__panel {
    margin-top: rem(16);
  }

  &__pass {
    font-size: rem(20);
  }

  &__bottom {
    margin-top: rem(24);
  }

  &__tabs {
    margin-top: rem(16);
    max-width: 330px;
    width: 100%;
  }

  &__controllers {
    display: flex;
    align-items: center;
    justify-content: end;
    column-gap: rem(8);
  }

  &__player {
    display: flex;
    align-items: center;
    justify-content: end;
  }

  &__detail-list {
    &.detail-list {
      row-gap: rem(4);
    }
  }
}
</style>
