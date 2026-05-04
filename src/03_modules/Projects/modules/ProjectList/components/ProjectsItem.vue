<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import type { ProjectsListItem } from '../../../types/projects.types';
import { timeAgo } from '@common/utils/timeAgo';

defineProps<ProjectsListItem>();
const { locale } = useI18n();
</script>

<template>
  <li class="projects-item">
    <a class="projects-item__link" :href="url">
      <div class="projects-item__information">
        <div class="projects-item__title">{{ title }}</div>
        <div class="projects-item__type">{{ $t(typeName) }}</div>
      </div>
      <div class="projects-item__time">
        {{ $t('shared.updated', { time: timeAgo(updatedAt, locale) }) }}
      </div>
    </a>
  </li>
</template>

<style scoped lang="scss">
.projects-item {
  border-top: 1px solid var(--input);

  &:last-of-type {
    border-bottom: 1px solid var(--input);
  }

  @include hover() {
    background-color: var(--surface-hover);
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
    flex-direction: column;
    row-gap: rem(4);
  }

  &__title {
    font-weight: 700;
  }

  &__time {
    font-size: rem(12);
    font-weight: 300;
  }

  &__type {
    font-size: rem(12);
    border: 1px solid var(--input);
    border-radius: rem(8);
    padding: rem(0.5) rem(8);
  }
}
</style>
