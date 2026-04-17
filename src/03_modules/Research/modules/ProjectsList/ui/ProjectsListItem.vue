<script setup lang="ts">
import type { ProjectsListItem } from '../ProjectsList';

const props = defineProps<ProjectsListItem>();
</script>

<template>
  <li class="projects__list-item">
    <a class="projects__list-link" :href="props.url">
      <div class="projects__list-information">
        <div class="projects__list-title">{{ props.title }}</div>
        <div class="projects__list-badge">{{ props.type }}</div>
      </div>
      <div class="projects__list-time">
        {{ $t('shared.updated') }} {{ $t('shared.hours', 5) }} {{ $t('shared.ago') }}
      </div>
    </a>
  </li>
</template>

<style scoped lang="scss">
.projects__list {
  &-item {
    border-top: 1px solid var(--input);

    &:last-of-type {
      border-bottom: 1px solid var(--input);
    }

    @include hover() {
      background-color: var(--surface-hover);
      border-radius: rem(8);
      border-color: transparent;
    }
  }

  &-information {
    display: flex;
    align-items: center;
    column-gap: rem(4);
  }

  &-link {
    padding: rem(16) rem(8);
    display: flex;
    flex-direction: column;
    row-gap: rem(4);
  }

  &-title {
    font-weight: 700;
  }

  &-time {
    font-size: rem(12);
    font-weight: 300;
  }

  &-badge {
    font-size: rem(12);
    border: 1px solid var(--input);
    border-radius: rem(8);
    padding: rem(0.5) rem(8);
  }
}
</style>
