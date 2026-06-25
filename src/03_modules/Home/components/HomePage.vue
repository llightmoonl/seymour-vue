<script setup lang="ts">
import VContainer from '@common/components/VContainer/VContainer.vue';
import { ActivityFeed } from '../modules/ActivityFeed';
import { RecentProjects } from '@modules/Home/modules/RecentProjects';
import VAvatar from '@common/components/VAvatar/VAvatar.vue';
import { ButtonSizes, ButtonVariants } from '@common/components/VButton/VButton.types.ts';
import VButton from '@common/components/VButton/VButton.vue';
import { AvatarSizes } from '@common/components/VAvatar/VAvatar.types.ts';
import { DistributionStats } from '@modules/Home/modules/DistributionStats';
import MainStats from '@modules/Home/modules/MainStats/components/MainStats.vue';
</script>

<template>
  <div class="home">
    <v-container size="lg">
      <div class="profile">
        <v-avatar
          class="profile-avatar"
          src="https://images.cybersport.ru/images/as-is/plain/23/234e7096-0e10-4ec8-b41b-7cd380bc9f67.png"
          alt="O"
          :size="AvatarSizes['3XL']" />
        <div class="profile__meta">
          <h1 class="profile__title">Олег Скворцов</h1>
          <div class="profile__gretting-message">Добро пожаловать в Seymour!</div>
        </div>
        <v-button class="profile__settings" :variant="ButtonVariants.SOFT" :size="ButtonSizes.XL">
          <i-custom-settings />
          Настройки
        </v-button>
      </div>
      <div class="home__main">
        <div class="home__left">
          <main-stats />
          <recent-projects />
        </div>
        <div class="home__right">
          <distribution-stats />
          <activity-feed />
        </div>
      </div>
    </v-container>
  </div>
</template>

<style scoped lang="scss">
.home {
  margin-block-start: rem(64);

  &__main {
    display: grid;
    grid-template-columns: 1fr 0.4fr;
    gap: rem(12);
  }

  &__left,
  &__right {
    display: flex;
    flex-direction: column;
    gap: rem(12);
  }
}

.profile {
  display: flex;
  align-items: start;
  gap: rem(16);
  margin-block-end: rem(32);

  &__settings {
    display: flex;
    align-items: center;
    gap: rem(8);

    & svg {
      width: rem(18);
      height: rem(18);
    }
  }

  &__gretting-message {
    color: var(--muted-foreground);
    font-size: rem(13);
  }

  &__meta {
    flex: 1;
    display: flex;
    flex-direction: column;
    row-gap: rem(2);
  }
}
</style>
