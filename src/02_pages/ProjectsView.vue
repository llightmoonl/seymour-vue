<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { ProjectsPage } from '@modules/Research';

const { t } = useI18n();

useHead({
  title: t('research.title'),
});
</script>

<template>
  <projects-page />
</template>
