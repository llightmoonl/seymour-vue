<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useQuery, useMutation } from '@pinia/colada';
import { getSessions, deleteSession, deleteAllSessions } from '../api/sessions.api';
import { timeAgo } from '@common/utils/timeAgo';
import VButton from '@common/components/VButton/VButton.vue';
import VSkeleton from '@common/components/VSkeleton/VSkeleton.vue';
import { ButtonSizes, ButtonVariants } from '@common/components/VButton/VButton.types';

const { locale } = useI18n();

const { data, status, refetch } = useQuery({
  key: ['sessions'],
  query: getSessions,
});

const { mutate: endSession } = useMutation({
  mutation: (id: string) => deleteSession(id),
  onSuccess: () => refetch(),
});

const { mutate: endAllSessions, status: endAllStatus } = useMutation({
  mutation: deleteAllSessions,
  onSuccess: () => refetch(),
});
</script>

<template>
  <div class="settings-sessions">
    <div class="settings-sessions__header">
      <h2 class="settings-sessions__title">{{ $t('settings.sessions.title') }}</h2>
      <v-button
        :variant="ButtonVariants.OUTLINE"
        :size="ButtonSizes.SM"
        :is-loading="endAllStatus === 'pending'"
        @click="endAllSessions()">
        {{ $t('settings.sessions.logout-all') }}
      </v-button>
    </div>

    <template v-if="status === 'pending'">
      <v-skeleton v-for="i in 3" :key="i" class="settings-sessions__skeleton" />
    </template>

    <template v-else-if="status === 'success' && data?.length">
      <div v-for="session in data" :key="session.id" class="settings-sessions__item">
        <div class="settings-sessions__item-info">
          <div class="settings-sessions__item-device">
            {{ session.device }}
            <span v-if="session.isCurrent" class="settings-sessions__badge">{{ $t('settings.sessions.current') }}</span>
          </div>
          <div class="settings-sessions__item-meta">
            <span v-if="session.city">{{ session.city }} ·</span>
            {{ timeAgo(session.lastActiveAt, locale as string) }}
          </div>
        </div>
        <v-button
          v-if="!session.isCurrent"
          :variant="ButtonVariants.GHOST"
          :size="ButtonSizes.SM"
          @click="endSession(session.id)">
          {{ $t('settings.sessions.logout-one') }}
        </v-button>
      </div>
    </template>

    <p v-else-if="status === 'success'" class="settings-sessions__empty">
      {{ $t('settings.sessions.empty') }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.settings-sessions {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-block-end: rem(24);
  }

  &__title {
    // inherited h2 style
  }

  &__skeleton {
    block-size: rem(72);
    border-radius: rem(12);
    margin-block-end: rem(12);
  }

  &__item {
    border: 1px solid var(--border);
    border-radius: rem(12);
    padding: rem(16) rem(20);
    margin-block-end: rem(12);
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-device {
      font-size: rem(14);
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: rem(8);
    }

    &-meta {
      font-size: rem(13);
      color: var(--muted-foreground);
      margin-block-start: rem(4);
    }
  }

  &__badge {
    font-size: rem(11);
    font-weight: 600;
    padding: rem(2) rem(6);
    border-radius: rem(4);
    background-color: color-mix(in srgb, var(--primary) 15%, transparent);
    color: var(--primary);
  }

  &__empty {
    font-size: rem(14);
    color: var(--muted-foreground);
  }
}
</style>
