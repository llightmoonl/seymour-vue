<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import VTabs from '@common/components/VTabs/VTabs.vue';

import HebbianGeneration from './HebbianGeneration.vue';
import HebbianQuality from './HebbianQuality.vue';
import HebbianRecognition from './HebbianRecognition.vue';
import HebbianTraining from './HebbianTraining.vue';

import type { Stage } from '../api/types.ts';

const { t } = useI18n();

const ALL_TABS = [
  { id: 1, title: t('hebbian.tabs.dataGeneration'), value: 'generation', component: HebbianGeneration },
  { id: 2, title: t('hebbian.tabs.training'), value: 'training', component: HebbianTraining },
  { id: 3, title: t('hebbian.tabs.qualityAssessment'), value: 'quality', component: HebbianQuality },
  { id: 4, title: t('hebbian.tabs.recognition'), value: 'recognition', component: HebbianRecognition },
];

const activeTab = defineModel<Stage>();

const tabItems = computed(() =>
  ALL_TABS.map((tab) => ({
    ...tab,
    disabled: tab.value !== String(activeTab.value ?? 'generation'),
  })),
);
</script>

<template>
  <v-tabs class="hebbian__tabs" :items="tabItems" v-model="activeTab" />
</template>

<style scoped lang="scss"></style>
