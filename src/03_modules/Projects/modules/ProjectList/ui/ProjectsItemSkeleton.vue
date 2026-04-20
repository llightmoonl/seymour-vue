<script setup lang="ts">
import { VSkeleton } from '@common/components';
</script>

<template>
  <li class="projects__list-item">
    <div class="projects__list-main">
      <VSkeleton class="projects__list-information" />
      <VSkeleton class="projects__list-time" />
    </div>
  </li>
</template>

<style scoped lang="scss">
.projects__list {
  &-item {
    border-top: 1px solid var(--input);

    &:last-of-type {
      border-bottom: 1px solid var(--input);
    }
  }

  &-main {
    display: flex;
    flex-direction: column;
    row-gap: rem(8);
    padding: rem(16) rem(8);
  }

  &-information {
    max-width: rem(400);
    height: rem(18);
  }

  &-time {
    max-width: rem(150);
    height: rem(16);
  }
}
</style>
