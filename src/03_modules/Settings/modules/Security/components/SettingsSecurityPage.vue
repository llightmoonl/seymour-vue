<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useMutation, useQuery } from '@pinia/colada';
import { useRouter } from 'vue-router';
import {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogClose,
} from 'reka-ui';
import { useAuthStore } from '@modules/Auth/stores/useAuthStore';
import { getSessions, deleteSession, deleteAllSessions } from '../../Sessions/api/sessions.api';
import { deleteAccount } from '../../DangerZone/api/deleteAccount';
import { timeAgo } from '@common/utils/timeAgo';
import VFormField from '@common/components/VFormField/VFormField.vue';
import VPasswordInput from '@common/components/VInput/VPasswordInput.vue';
import VButton from '@common/components/VButton/VButton.vue';
import VSkeleton from '@common/components/VSkeleton/VSkeleton.vue';
import { ButtonSizes, ButtonVariants } from '@common/components/VButton/VButton.types';

const { t, locale } = useI18n();
const authStore = useAuthStore();
const router = useRouter();

// Sessions
const {
  data: sessions,
  status: sessionsStatus,
  refetch,
} = useQuery({
  key: ['sessions'],
  query: getSessions,
});

const { mutate: endSession } = useMutation({
  mutation: (id: string) => deleteSession(id),
  onSuccess: () => refetch(),
});

const { mutate: endAllSessions } = useMutation({
  mutation: deleteAllSessions,
  onSuccess: () => refetch(),
});

// Delete account
const deleteOpen = ref(false);
const deletePassword = ref('');
const deleteError = ref('');

const { mutate: doDeleteAccount, status: deleteStatus } = useMutation({
  mutation: () => deleteAccount(deletePassword.value),
  onSuccess: async () => {
    deleteOpen.value = false;
    await authStore.logout();
    router.push('/login');
  },
  onError: () => {
    deleteError.value = t('settings.danger-zone.error');
  },
});

const onDeleteConfirm = () => {
  deleteError.value = '';
  if (!deletePassword.value) return;
  doDeleteAccount();
};
</script>

<template>
  <div class="settings-security">
    <div class="settings-security__block">
      <div class="settings-security__block-header">
        <h2 class="settings-security__block-title">{{ $t('settings.sessions.title') }}</h2>
        <v-button :variant="ButtonVariants.SOFT" :size="ButtonSizes.MD" @click="endAllSessions()">
          {{ $t('settings.sessions.logout-all') }}
        </v-button>
      </div>

      <template v-if="sessionsStatus === 'pending'">
        <v-skeleton v-for="i in 3" :key="i" class="settings-security__skeleton" />
      </template>

      <template v-else-if="sessionsStatus === 'success' && sessions.items?.length">
        <div v-for="session in sessions.items" :key="session.id" class="settings-security__session">
          <div class="settings-security__session-info">
            <div class="settings-security__session-device">
              {{ session.device }}
              <span v-if="session.isCurrent" class="settings-security__badge">
                {{ $t('settings.sessions.current') }}
              </span>
            </div>
            <div class="settings-security__session-meta">
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

      <p v-else-if="sessionsStatus === 'success'" class="settings-security__empty">
        {{ $t('settings.sessions.empty') }}
      </p>
    </div>

    <div class="settings-security__block">
      <div class="settings-security__block-header">
        <h2 class="settings-security__block-title settings-security__block-title--danger">
          {{ $t('settings.danger-zone.section-title') }}
        </h2>
      </div>

      <div class="settings-security__row">
        <div class="settings-security__row-info">
          <div class="settings-security__row-name">{{ $t('settings.danger-zone.title') }}</div>
          <p class="settings-security__row-description">{{ $t('settings.danger-zone.description') }}</p>
        </div>
        <dialog-root v-model:open="deleteOpen">
          <dialog-trigger as-child>
            <v-button :variant="ButtonVariants.DESTRUCTIVE" :size="ButtonSizes.LG">
              {{ $t('settings.danger-zone.button') }}
            </v-button>
          </dialog-trigger>
          <dialog-portal>
            <dialog-overlay class="danger-dialog__overlay" />
            <dialog-content class="danger-dialog__content">
              <dialog-title class="danger-dialog__title">{{ $t('settings.danger-zone.confirm-title') }}</dialog-title>
              <p class="danger-dialog__description">{{ $t('settings.danger-zone.confirm-description') }}</p>
              <v-form-field :title="$t('settings.danger-zone.password-label')">
                <v-password-input v-model="deletePassword" variant="soft" size="xl" name="deletePassword" />
              </v-form-field>
              <p v-if="deleteError" class="danger-dialog__error">{{ deleteError }}</p>
              <div class="danger-dialog__actions">
                <dialog-close as-child>
                  <v-button :variant="ButtonVariants.OUTLINE" :size="ButtonSizes.MD">
                    {{ $t('shared.cancel') }}
                  </v-button>
                </dialog-close>
                <v-button
                  :variant="ButtonVariants.DESTRUCTIVE"
                  :size="ButtonSizes.MD"
                  :is-loading="deleteStatus === 'pending'"
                  @click="onDeleteConfirm">
                  {{ $t('settings.danger-zone.confirm-button') }}
                </v-button>
              </div>
            </dialog-content>
          </dialog-portal>
        </dialog-root>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.settings-security {
  &__title {
    margin-block-end: rem(24);
  }

  &__block {
    margin-block-end: rem(48);

    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-block-end: rem(20);
    }

    &-title {
      font-size: rem(24);

      &--danger {
        color: var(--destructive);
      }
    }
  }

  &__skeleton {
    block-size: rem(64);
    border-radius: rem(8);
    margin-block-end: rem(8);
  }

  &__session {
    border: 1px solid var(--border);
    border-radius: rem(8);
    padding: rem(12) rem(16);
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-block-end: rem(8);

    &:last-child {
      margin-block-end: 0;
    }

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
      margin-block-start: rem(2);
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

  &__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: rem(16);

    &-name {
      font-size: rem(14);
      font-weight: 500;
    }

    &-description {
      font-size: rem(13);
      color: var(--muted-foreground);
      margin-block-start: rem(4);
      max-inline-size: rem(480);
    }
  }
}

.danger-dialog {
  &__overlay {
    background-color: var(--overlay);
    position: fixed;
    inset: 0;
    animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  &__content {
    border: 1px solid var(--border);
    background-color: var(--popover);
    border-radius: rem(8);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    max-width: rem(440);
    padding: rem(24);
    animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    flex-direction: column;
    gap: rem(16);

    &:focus {
      outline: none;
    }
  }

  &__title {
    font-size: rem(18);
    font-weight: 600;
  }

  &__description {
    font-size: rem(14);
    color: var(--muted-foreground);
  }

  &__error {
    font-size: rem(13);
    color: var(--destructive);
    font-weight: 600;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    gap: rem(8);
    margin-block-start: rem(4);
  }
}

@keyframes overlayShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes contentShow {
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
