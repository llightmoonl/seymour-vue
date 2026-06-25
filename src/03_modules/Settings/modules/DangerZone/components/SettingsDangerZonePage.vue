<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useMutation } from '@pinia/colada';
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
import { deleteAccount } from '../api/deleteAccount';
import { useAuthStore } from '@modules/Auth/stores/useAuthStore';
import VFormField from '@common/components/VFormField/VFormField.vue';
import VPasswordInput from '@common/components/VInput/VPasswordInput.vue';
import VButton from '@common/components/VButton/VButton.vue';
import { ButtonSizes, ButtonVariants } from '@common/components/VButton/VButton.types';

const { t } = useI18n();
const authStore = useAuthStore();
const router = useRouter();

const password = ref('');
const serverError = ref('');
const open = ref(false);

const { mutate, status } = useMutation({
  mutation: () => deleteAccount(password.value),
  onSuccess: async () => {
    open.value = false;
    authStore.logout();
    router.push('/login');
  },
  onError: () => {
    serverError.value = t('settings.danger-zone.error');
  },
});

const onConfirm = () => {
  serverError.value = '';
  if (!password.value) return;
  mutate();
};
</script>

<template>
  <div class="settings-danger">
    <h2 class="settings-danger__title">{{ $t('settings.danger-zone.title') }}</h2>

    <div class="settings-danger__card">
      <div class="settings-danger__card-info">
        <div class="settings-danger__card-title">{{ $t('settings.danger-zone.title') }}</div>
        <p class="settings-danger__card-description">{{ $t('settings.danger-zone.description') }}</p>
      </div>

      <dialog-root v-model:open="open">
        <dialog-trigger as-child>
          <v-button :variant="ButtonVariants.DESTRUCTIVE" :size="ButtonSizes.SM">
            {{ $t('settings.danger-zone.button') }}
          </v-button>
        </dialog-trigger>
        <dialog-portal>
          <dialog-overlay class="danger-dialog__overlay" />
          <dialog-content class="danger-dialog__content">
            <dialog-title class="danger-dialog__title">{{ $t('settings.danger-zone.confirm-title') }}</dialog-title>
            <p class="danger-dialog__description">{{ $t('settings.danger-zone.confirm-description') }}</p>
            <v-form-field :title="$t('settings.danger-zone.password-label')">
              <v-password-input v-model="password" variant="soft" size="xl" name="deletePassword" />
            </v-form-field>
            <p v-if="serverError" class="danger-dialog__error">{{ serverError }}</p>
            <div class="danger-dialog__actions">
              <dialog-close as-child>
                <v-button :variant="ButtonVariants.OUTLINE" :size="ButtonSizes.MD">
                  {{ $t('shared.cancel') }}
                </v-button>
              </dialog-close>
              <v-button
                :variant="ButtonVariants.DESTRUCTIVE"
                :size="ButtonSizes.MD"
                :is-loading="status === 'pending'"
                @click="onConfirm">
                {{ $t('settings.danger-zone.confirm-button') }}
              </v-button>
            </div>
          </dialog-content>
        </dialog-portal>
      </dialog-root>
    </div>
  </div>
</template>

<style scoped lang="scss">
.settings-danger {
  &__title {
    margin-block-end: rem(24);
  }

  &__card {
    border: 1px solid var(--destructive);
    border-radius: rem(12);
    padding: rem(20);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: rem(16);

    &-title {
      font-size: rem(15);
      font-weight: 600;
      color: var(--destructive);
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
