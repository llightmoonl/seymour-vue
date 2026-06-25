<script setup lang="ts">
defineProps<{
  title: string;
  value: number;
}>();
</script>

<template>
  <div class="main-stats-item">
    <div class="main-stats-item__title">{{ title }}</div>
    <div class="main-stats-item__value">{{ value }}</div>
  </div>
</template>

<style scoped lang="scss">
.main-stats-item {
  border: 1px solid var(--border);
  padding: rem(16) rem(12);
  border-radius: rem(8);

  &__title {
    font-size: rem(13);
    color: var(--muted-foreground);
  }

  &__value {
    margin-block-start: rem(8);
    font-family: 'Times New Roman', serif;
    font-weight: 400;
    letter-spacing: -0.02em;
    font-size: rem(36);
    margin-inline-start: rem(-2);
  }
}
</style>
