<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import VTabs from '@common/components/VTabs/VTabs.vue';
import AuthLogin from './AuthLogin.vue';
import AuthRegistration from './AuthRegistration.vue';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const ALL_TABS = [
  { id: 1, title: `${t('auth.sign-in.tab-name')}`, value: 'sign-in', component: AuthLogin },
  { id: 2, title: `${t('auth.sign-up.tab-name')}`, value: 'sign-up', component: AuthRegistration },
];
const activeTab = computed({
  get: () => (route.name === 'register' ? 'sign-up' : 'sign-in'),
  set: (value) => router.push({ name: value === 'sign-up' ? 'register' : 'login' }),
});
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
