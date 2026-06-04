<script setup lang="ts">
import VSkeleton from '@common/components/VSkeleton/VSkeleton.vue';
</script>

<template>
  <li class="projects-item">
    <div class="projects-item__main">
      <VSkeleton class="projects-item__information" />
      <VSkeleton class="projects-item__time" />
    </div>
  </li>
</template>

<style scoped lang="scss">
.projects-item {
  border-top: 1px solid var(--border);

  &:last-of-type {
    border-bottom: 1px solid var(--border);
  }

  &__main {
    display: flex;
    flex-direction: column;
    row-gap: rem(8);
    padding: rem(16) rem(8);
  }

  &__information {
    max-width: rem(400);
    height: rem(18);
  }

  &__time {
    max-width: rem(150);
    height: rem(16);
  }
}
</style>
