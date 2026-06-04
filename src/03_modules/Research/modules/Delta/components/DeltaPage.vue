<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import VContainer from '@common/components/VContainer/VContainer.vue';
import VMarkdown from '@common/components/VMarkdown/VMarkdown.vue';
import VTabs from '@common/components/VTabs/VTabs.vue';

import {
  DeltaGeneration,
  DeltaQuality,
  DeltaRecognition,
  DeltaTraining,
  useProgressTabs,
  useTabs,
} from '@modules/Research';

const { t } = useI18n();
const route = useRoute();

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
  <div class="delta">
    <v-container size="lg" class="delta__container">
      <div class="delta__content">
        <h1 class="delta__title">Дельта-правило: распознавание печатных букв</h1>
        <p class="delta__subtitle">
          <v-markdown
            class="markdown"
            :content="`Пояснение к задаче: Обучить сеть по дельта-правилу: настроить синаптические веса $w_j$, так, чтобы нейрон корректно распознавал печатные буквы, минимизируя ошибку между желаемым и фактическим выходным
        сигналом.`" />
        </p>
        <v-tabs class="delta__tabs" :items="tabsPages" v-model="activeTab" />
      </div>
    </v-container>
  </div>
</template>

<style scoped lang="scss">
.delta {
  margin-top: rem(32);
  margin-bottom: rem(32);

  &__subtitle {
    margin-top: rem(8);

    &:deep(.markdown p) {
      margin-top: 0;
    }
  }

  &__tabs {
    margin-top: rem(24);
  }
}
</style>
