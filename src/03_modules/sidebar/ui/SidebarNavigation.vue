<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import HomeIcon from '~icons/custom/home';
import DocsIcon from '~icons/custom/docs';
import CompassIcon from '~icons/custom/compass';

import MenuItem from '@common/components/MenuItem/MenuItem.vue';

import { useSidebar } from '../models/useSidebar.ts';

const { t } = useI18n();
const { expanded } = useSidebar();

const sidebarElements = [
  { id: 1, title: t('sidebar.main.home'), link: '/', icon: HomeIcon },
  { id: 2, title: t('sidebar.main.docs'), link: '/docs', icon: DocsIcon },
  { id: 3, title: t('sidebar.main.research'), link: '/research', icon: CompassIcon },
];
</script>

<template>
  <aside class="sidebar__navigation">
    <MenuItem
      v-for="element in sidebarElements"
      :key="element.id"
      :href="element.link"
      :title="element.title"
      :icon="element.icon"
      :expanded="expanded" />
  </aside>
</template>

<style scoped lang="scss">
@use '@common/styles/helpers' as *;

.sidebar__navigation {
  display: flex;
  flex-direction: column;
  gap: rem(4)
}
</style>
