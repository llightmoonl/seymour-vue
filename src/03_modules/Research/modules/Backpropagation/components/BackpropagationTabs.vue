<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { VTabs } from '@common/components';
import { BackpropagationBackward, BackpropagationForward } from '../';

const { t } = useI18n();
const ALL_TABS = [
  { id: 1, title: `${t('backpropagation.pass.forward')}`, value: 'forward', component: BackpropagationForward },
  { id: 2, title: `${t('backpropagation.pass.backward')}`, value: 'backward', component: BackpropagationBackward },
];

const activeTab = defineModel<number | string | undefined>();
</script>

<template>
  <v-tabs class="backpropagation__tabs" :items="ALL_TABS" v-model="activeTab" />
</template>
