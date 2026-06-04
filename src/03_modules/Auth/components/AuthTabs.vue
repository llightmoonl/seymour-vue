<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import VTabs from '@common/components/VTabs/VTabs.vue';
import AuthLogin from './AuthLogin.vue';
import AuthRegistration from './AuthRegistration.vue';

const { t } = useI18n();
const ALL_TABS = [
  { id: 1, title: `${t('auth.sign-in.tab-name')}`, value: 'sign-in', component: AuthLogin },
  { id: 2, title: `${t('auth.sign-up.tab-name')}`, value: 'sign-up', component: AuthRegistration },
];
const activeTab = defineModel<number | string | undefined>();
</script>

<template>
  <v-tabs class="auth-tabs" :items="ALL_TABS" v-model="activeTab" />
</template>

<style scoped lang="scss">
.auth-tabs {
  &:deep(.tabs__list),
  &:deep(.tabs__trigger) {
    inline-size: 100%;
  }
}
</style>
