<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';

import VMarkdown from '@common/components/VMarkdown/VMarkdown.vue';

import { useBackpropagationStore } from '../stores/backpropagation';
import { BACKPROP_STEPS } from '../models/constants';

const { t } = useI18n();
const backpropagationStore = useBackpropagationStore();
const { steps } = storeToRefs(backpropagationStore);
</script>

<template>
  <div class="backpropagation-forward">
    <div v-if="steps === BACKPROP_STEPS['EMPTY']" class="backpropagation-forward__empty">{{ t('table.empty') }}</div>
    <VMarkdown
      class="backpropagation-forward__item"
      v-if="steps >= BACKPROP_STEPS['FORWARD_F11']"
      content="$f_{11} = f(w_{11}x_{1}+w_{13}x_{2})$" />
    <VMarkdown
      class="backpropagation-forward__item"
      v-if="steps >= BACKPROP_STEPS['FORWARD_F12']"
      content="$f_{12} = f(w_{12}x_{1}+w_{14}x_{2})$" />
    <VMarkdown
      class="backpropagation-forward__item"
      v-if="steps >= BACKPROP_STEPS['OUTPUT']"
      content="$y=f(f_{11}w_{21}+f_{12}w_{22})$" />
    <div v-if="steps >= BACKPROP_STEPS['ERROR']" class="backpropagation-forward__item --error">
      <div class="backpropagation-forward__error --title">{{ t('backpropagation.info.error') }}:</div>
      <VMarkdown class="backpropagation-forward__error --value" content="$\epsilon = y - d$" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.backpropagation-forward {
  margin-top: rem(12);
  padding: 0 rem(6);
  display: flex;
  flex-direction: column;
  row-gap: rem(8);
  overflow-y: auto;
  height: rem(148);

  &__item {
    &.--error {
      display: flex;
      flex-direction: column;
      row-gap: rem(4);
    }

    &:deep(p) {
      margin-top: 0;
    }
  }

  &__empty {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
}
</style>
