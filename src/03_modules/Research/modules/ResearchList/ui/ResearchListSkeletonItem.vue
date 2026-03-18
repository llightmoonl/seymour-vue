<script setup lang="ts">
import { VSkeleton } from '@common/components';
</script>

<template>
  <li class="research__list-item">
    <div class="research__list-main">
      <VSkeleton class="research__list-information" />
      <VSkeleton class="research__list-time" />
    </div>
  </li>
</template>

<style scoped lang="scss">
.research__list {
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
