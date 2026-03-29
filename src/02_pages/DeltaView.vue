<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';

import { VTabs, VContainer, VMarkdown } from '@common/components';
import { DeltaGeneration, DeltaTraining, DeltaRecognition, DeltaQuality, useTabs } from '@modules/Research';
import { useRoute } from 'vue-router';
import { useProgressTabs } from '@modules/Research/models/useProgressTabs.ts';

const { t } = useI18n();
const route = useRoute();

useHead({
  title: 'Delta',
});

const ALL_TABS = [
  { id: 1, title: t('delta.tabs.dataGeneration'), value: 'generation', component: DeltaGeneration },
  { id: 2, title: t('delta.tabs.training'), value: 'training', component: DeltaTraining },
  { id: 3, title: t('delta.tabs.qualityAssessment'), value: 'quality', component: DeltaQuality },
  { id: 4, title: t('delta.tabs.recognition'), value: 'recognition', component: DeltaRecognition },
];

const { activeTab } = storeToRefs(useTabs());
const completedTabs = ref<string[]>([]);

const tabsPages = computed(() =>
  ALL_TABS.map((tab) => ({
    ...tab,
    disabled: tab.value !== activeTab.value || completedTabs.value.includes(tab.value),
  })),
);

const id = String(route.params.id);
const { state } = useProgressTabs(id);

watch(
  state,
  (val) => {
    if (val.status !== 'success') return;
    const data = val.data ?? [];

    completedTabs.value = data.filter((t) => t.completed).map((t) => t.key);

    const firstAvailable = ALL_TABS.find((tab) => !completedTabs.value.includes(tab.value));
    if (firstAvailable) {
      activeTab.value = firstAvailable.value;
    }
  },
  { immediate: true },
);
</script>

<template>
  <VContainer size="lg">
    <div class="wrapper">
      <h1>Дельта-правило: распознавание печатных букв</h1>
      <p class="text">
        Пояснение к задаче: Обучить сеть по дельта-правилу: настроить синаптические веса
        <v-markdown class="markdown" content="$w_j$" />
        так, чтобы нейрон корректно распознавал печатные буквы, минимизируя ошибку между желаемым и фактическим выходным
        сигналом.
      </p>
      <VTabs :items="tabsPages" v-model="activeTab" />
    </div>
  </VContainer>
</template>

<style scoped lang="scss">
.wrapper {
  margin-top: rem(32);
  margin-bottom: rem(32);

  & .text {
    margin-top: rem(8);
  }
  & .markdown {
    display: inline;
  }
}
</style>
