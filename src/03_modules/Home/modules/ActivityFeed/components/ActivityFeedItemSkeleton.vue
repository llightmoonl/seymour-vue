<script setup lang="ts"></script>

<template>
  <div class="activity-feed-item-skeleton">
    <div class="activity-feed-item-skeleton__text"></div>
    <div class="activity-feed-item-skeleton__date"></div>
  </div>
</template>

<style scoped lang="scss">
.activity-feed-item-skeleton {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: rem(8);

  &__text {
    block-size: rem(14);
    inline-size: 65%;
    background-color: var(--muted);
    border-radius: rem(4);
    animation: pulse 1.5s infinite ease-in-out alternate;
  }

  &__date {
    block-size: rem(14);
    inline-size: 20%;
    background-color: var(--muted);
    border-radius: rem(4);
    animation: pulse 1.5s infinite ease-in-out alternate;
  }
}

@keyframes pulse {
  0% {
    opacity: 40%;
  }
  100% {
    opacity: 100%;
  }
}
</style>
