<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import { VTabs, VContainer } from '@common/components';
import { HebbianGeneration, HebbianTraining, HebbianRecognition, HebbianQuality, useTabs } from '@modules/Research';

const { t } = useI18n();

const tabsPages = [
  { id: 1, title: t('hebbian.tabs.dataGeneration'), value: 'generation', component: HebbianGeneration },
  { id: 2, title: t('hebbian.tabs.training'), value: 'training', component: HebbianTraining },
  { id: 3, title: t('hebbian.tabs.qualityAssessment'), value: 'quality', component: HebbianQuality },
  { id: 4, title: t('hebbian.tabs.recognition'), value: 'recognition', component: HebbianRecognition },
];

const { activeTab, setActiveTab } = useTabs();
</script>

<template>
  <VContainer size="lg">
    <VTabs :items="tabsPages" v-model="activeTab" @update:modelValue="setActiveTab" default-value="generation" />
  </VContainer>
</template>

<style scoped lang="scss"></style>
