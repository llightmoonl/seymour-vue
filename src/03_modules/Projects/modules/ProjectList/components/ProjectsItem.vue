<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import type { ProjectsListItem } from '../../../types/projects.types';
import { timeAgo } from '@common/utils/timeAgo';
// import VDropdown from '@common/components/VDropdown/VDropdown.vue';

defineProps<ProjectsListItem>();
const { locale } = useI18n();
</script>

<template>
  <li class="projects-item">
    <a class="projects-item__link" :href="url">
      <div class="projects-item__left">
        <div class="projects-item__title">{{ title }}</div>
        <div class="projects-item__meta">
          {{ $t(typeName) }} · {{ $t('shared.updated', { time: timeAgo(updatedAt, locale) }) }}
        </div>
      </div>
      <!--      <div class="project-item__right">-->
      <!--        <v-dropdown></v-dropdown>-->
      <!--      </div>-->
    </a>
  </li>
</template>

<style scoped lang="scss">
.projects-item {
  &:not(:first-child) {
    border-top: 1px solid var(--border);
  }

  &:last-of-type {
    border-bottom: 1px solid var(--border);
  }

  @include hover() {
    background-color: var(--accent);
    border-radius: rem(8);
    border-color: transparent;

    & + .projects-item {
      border-color: transparent;
    }
  }

  &__information {
    display: flex;
    align-items: center;
    column-gap: rem(4);
  }

  &__link {
    padding: rem(16) rem(8);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__left {
    display: flex;
    flex-direction: column;
    row-gap: rem(4);
  }

  &__title {
    font-size: rem(14);
    font-weight: 700;
  }

  &__meta {
    font-size: rem(11);
    color: var(--muted-foreground);
    font-weight: 500;
  }
}
</style>
