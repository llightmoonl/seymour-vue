<script setup lang="ts">
import AuthTabs from './AuthTabs.vue';
import VContainer from '@common/components/VContainer/VContainer.vue';
import VLogo from '@common/components/VLogo/VLogo.vue';
</script>

<template>
  <v-container size="xs">
    <div class="auth__main">
      <div class="auth__logo">
        <VLogo />
      </div>
      <auth-tabs class="auth__tabs" />
    </div>
  </v-container>
</template>

<style scoped lang="scss">
.auth {
  &__main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    block-size: 100vh;
  }
  &__logo {
    display: flex;
    justify-content: center;
    margin-block-end: rem(20);

    &:deep(.logo) {
      width: rem(64);
      height: rem(64);
    }
  }
  &__tabs {
    &:deep(.tabs__list) {
      margin-bottom: rem(16);
    }
  }
}
</style>
