<template>
  <div class="skeleton"></div>
</template>

<style scoped lang="scss">
.skeleton {
  width: 100%;
  background-color: var(--muted);
  border-radius: rem(8);
  animation: pulse 1.5s infinite ease-in-out alternate;
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
