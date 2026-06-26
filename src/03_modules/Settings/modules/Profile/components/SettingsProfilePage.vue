<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { useMutation } from '@pinia/colada';
import { useAuthStore } from '@modules/Auth/stores/useAuthStore';
import { patchProfile } from '../api/patchProfile';
import { postAvatarUpload } from '../api/postAvatarUpload';
import { postEmailVerifyRequest, postEmailVerifyConfirm } from '../api/postEmailVerify';
import VInput from '@common/components/VInput/VInput.vue';
import VPasswordInput from '@common/components/VInput/VPasswordInput.vue';
import VButton from '@common/components/VButton/VButton.vue';
import VAvatar from '@common/components/VAvatar/VAvatar.vue';
import VFormField from '@common/components/VFormField/VFormField.vue';
import VModal from '@common/components/VModal/VModal.vue';
import { ButtonSizes, ButtonVariants, ButtonTypes } from '@common/components/VButton/VButton.types';
import { AvatarSizes } from '@common/components/VAvatar/VAvatar.types';

const { t } = useI18n();
const authStore = useAuthStore();

const avatarFallback = computed(() => (authStore.user?.name ?? '?').charAt(0).toUpperCase());

// Avatar upload
const fileInputRef = ref<HTMLInputElement | null>(null);

const { mutate: uploadAvatar, isLoading: avatarIsLoading } = useMutation({
  mutation: (file: File) => postAvatarUpload(file),
  onSuccess: (profile) => {
    authStore.user = profile;
  },
});

const onFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;
  uploadAvatar(file);
  if (fileInputRef.value) fileInputRef.value.value = '';
};

// Email toggle
const showEmail = ref(false);
const maskedEmail = computed(() => {
  const email = authStore.user?.email ?? '';
  const atIndex = email.indexOf('@');
  if (atIndex <= 0) return email;
  return '*'.repeat(Math.min(atIndex, 16)) + email.slice(atIndex);
});

// Email verification
const emailVerifySent = ref(false);
const emailVerifyToken = ref('');
const emailVerifyError = ref('');

const { mutate: sendVerification, status: verifyRequestStatus } = useMutation({
  mutation: postEmailVerifyRequest,
  onSuccess: () => {
    emailVerifySent.value = true;
  },
});

const { mutate: confirmEmail, status: confirmStatus } = useMutation({
  mutation: () => postEmailVerifyConfirm(emailVerifyToken.value),
  onSuccess: () => {
    authStore.fetchProfile();
  },
  onError: () => {
    emailVerifyError.value = t('settings.profile.verify-error');
  },
});

// Name modal
const nameModalOpen = ref(false);
const nameValue = ref('');
const nameError = ref('');

const resetNameForm = () => {
  nameValue.value = authStore.user?.name ?? '';
  nameError.value = '';
};

const { mutate: saveName, isLoading: saveNameIsLoading } = useMutation({
  mutation: () => patchProfile({ name: nameValue.value }),
  onSuccess: (profile) => {
    authStore.user = profile;
    nameModalOpen.value = false;
  },
  onError: () => {
    nameError.value = t('shared.error');
  },
});

const onNameSubmit = () => {
  nameError.value = '';
  if (!nameValue.value.trim()) {
    nameError.value = t('settings.profile.name-required');
    return;
  }
  saveName();
};

// Password change
const passwordSuccess = ref(false);
const passwordServerError = ref('');

const passwordSchema = toTypedSchema(
  z
    .object({
      currentPassword: z.string().nonempty({ message: t('auth.change-password.validation.current.empty') }),
      newPassword: z
        .string()
        .nonempty({ message: t('auth.change-password.validation.new.empty') })
        .min(6, { message: t('auth.change-password.validation.new.min') }),
      confirmPassword: z.string().nonempty({ message: t('auth.change-password.validation.confirm.empty') }),
    })
    .refine((d) => d.newPassword === d.confirmPassword, {
      message: t('auth.change-password.validation.confirm.match'),
      path: ['confirmPassword'],
    }),
);

const SETTINGS_FIELDS = {
  validateOnBlur: false,
  validateOnModelUpdate: false,
  validateOnInput: false,
  validateOnChange: false,
};

const {
  errors: pwErrors,
  defineField,
  handleSubmit: handlePasswordSubmit,
  resetForm: resetPasswordForm,
} = useForm({
  validationSchema: passwordSchema,
});
const [currentPassword] = defineField('currentPassword', SETTINGS_FIELDS);
const [newPassword] = defineField('newPassword', SETTINGS_FIELDS);
const [confirmPassword] = defineField('confirmPassword', SETTINGS_FIELDS);

const { mutate: changePassword, isLoading: changePasswordIsLoading } = useMutation({
  mutation: (dto: { currentPassword: string; newPassword: string }) => authStore.changePassword(dto),
  onSuccess: () => {
    passwordSuccess.value = true;
    resetPasswordForm();
    setTimeout(() => (passwordSuccess.value = false), 4000);
  },
  onError: () => {
    passwordServerError.value = t('auth.change-password.error');
  },
});

const onPasswordSubmit = handlePasswordSubmit((values) => {
  passwordServerError.value = '';
  changePassword({ currentPassword: values.currentPassword, newPassword: values.newPassword });
});
</script>

<template>
  <div class="settings-profile">
    <h2 class="settings-profile__title">{{ $t('settings.profile.title') }}</h2>

    <div class="settings-profile__avatar-section">
      <v-avatar :src="authStore.avatarSrc" :alt="avatarFallback" :size="AvatarSizes['2XL']" />
      <div class="settings-profile__avatar-meta">
        <div class="settings-profile__avatar-name">{{ authStore.user?.name }}</div>
        <v-modal
          :title="$t('settings.profile.avatar-modal-title')"
          :description="$t('settings.profile.avatar-modal-description')">
          <v-button :variant="ButtonVariants.SOFT" :size="ButtonSizes.SM" :is-loading="avatarIsLoading">
            {{ $t('settings.profile.avatar-upload') }}
          </v-button>
          <template #content>
            <ul class="avatar-requirements">
              <li>{{ $t('settings.profile.avatar-modal-formats') }}</li>
              <li>{{ $t('settings.profile.avatar-modal-max-size') }}</li>
              <li>{{ $t('settings.profile.avatar-modal-recommended') }}</li>
            </ul>
          </template>
          <template #footer="{ close }">
            <v-button
              :size="ButtonSizes.XL"
              class="avatar-requirements__btn"
              @click="
                () => {
                  close();
                  fileInputRef?.click();
                }
              ">
              {{ $t('settings.profile.avatar-modal-select') }}
            </v-button>
          </template>
        </v-modal>
        <input
          ref="fileInputRef"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          class="settings-profile__file-input"
          @change="onFileChange" />
      </div>
    </div>

    <div class="settings-profile__card">
      <h3 class="settings-profile__card-title">{{ $t('settings.profile.account-info') }}</h3>

      <!-- Name -->
      <div class="settings-profile__row">
        <span class="settings-profile__row-label">{{ $t('settings.profile.username-label') }}</span>
        <span class="settings-profile__row-value">{{ authStore.user?.name }}</span>
        <v-modal
          v-model:open="nameModalOpen"
          :title="$t('settings.profile.change-name-title')"
          :description="$t('settings.profile.change-name-description')">
          <v-button :variant="ButtonVariants.SOFT" :size="ButtonSizes.LG" @click="resetNameForm">
            {{ $t('settings.profile.change') }}
          </v-button>
          <template #content>
            <v-form-field :title="$t('settings.profile.username-label')" :error="nameError">
              <v-input v-model="nameValue" variant="soft" size="xl" name="name" @keydown.enter="onNameSubmit" />
            </v-form-field>
          </template>
          <template #footer="{ close }">
            <div class="modal-actions">
              <v-button :variant="ButtonVariants.OUTLINE" :size="ButtonSizes.MD" @click="close">
                {{ $t('shared.cancel') }}
              </v-button>
              <v-button :size="ButtonSizes.MD" :is-loading="saveNameIsLoading" @click="onNameSubmit">
                {{ $t('shared.save') }}
              </v-button>
            </div>
          </template>
        </v-modal>
      </div>

      <!-- Email -->
      <div class="settings-profile__row">
        <span class="settings-profile__row-label">{{ $t('settings.profile.email') }}</span>
        <div class="settings-profile__row-value settings-profile__row-value--email">
          <span>{{ showEmail ? authStore.user?.email : maskedEmail }}</span>
          <button class="settings-profile__show-btn" @click="showEmail = !showEmail">
            {{ showEmail ? $t('settings.profile.hide') : $t('settings.profile.show') }}
          </button>
        </div>
        <div class="settings-profile__row-actions">
          <span v-if="authStore.user?.emailVerified" class="settings-profile__verified">
            {{ $t('settings.profile.verified') }}
          </span>
          <template v-else-if="!emailVerifySent">
            <v-button
              :variant="ButtonVariants.OUTLINE"
              :size="ButtonSizes.SM"
              :is-loading="verifyRequestStatus === 'pending'"
              @click="sendVerification()">
              {{ $t('settings.profile.verify-email') }}
            </v-button>
          </template>
          <template v-else>
            <div class="settings-profile__verify-inline">
              <v-input
                v-model="emailVerifyToken"
                variant="soft"
                size="xl"
                name="token"
                :placeholder="$t('settings.profile.confirm-token')" />
              <v-button :size="ButtonSizes.SM" :is-loading="confirmStatus === 'pending'" @click="confirmEmail()">
                {{ $t('settings.profile.confirm-submit') }}
              </v-button>
            </div>
            <p v-if="emailVerifyError" class="settings-profile__error">{{ emailVerifyError }}</p>
          </template>
        </div>
      </div>

      <!-- Password -->
      <div class="settings-profile__row">
        <span class="settings-profile__row-label">{{ $t('settings.profile.password-label') }}</span>
        <span class="settings-profile__row-value settings-profile__row-value--password">••••••••</span>
        <v-modal :title="$t('auth.change-password.title')">
          <v-button :variant="ButtonVariants.SOFT" :size="ButtonSizes.LG">
            {{ $t('settings.profile.change') }}
          </v-button>
          <template #content>
            <form class="change-password-form" novalidate @submit="onPasswordSubmit">
              <v-form-field :title="$t('auth.change-password.current')" :error="pwErrors.currentPassword">
                <v-password-input v-model="currentPassword" variant="soft" size="xl" name="currentPassword" />
              </v-form-field>
              <v-form-field :title="$t('auth.change-password.new')" :error="pwErrors.newPassword">
                <v-password-input v-model="newPassword" variant="soft" size="xl" name="newPassword" />
              </v-form-field>
              <v-form-field :title="$t('auth.change-password.confirm')" :error="pwErrors.confirmPassword">
                <v-password-input v-model="confirmPassword" variant="soft" size="xl" name="confirmPassword" />
              </v-form-field>
              <p v-if="passwordServerError" class="change-password-form__error">{{ passwordServerError }}</p>
              <p v-if="passwordSuccess" class="change-password-form__success">
                {{ $t('auth.change-password.success') }}
              </p>
              <v-button
                class="change-password-form__submit"
                :type="ButtonTypes.SUBMIT"
                :size="ButtonSizes.XL"
                :is-loading="changePasswordIsLoading">
                {{ $t('auth.change-password.submit') }}
              </v-button>
            </form>
          </template>
        </v-modal>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.settings-profile {
  &__title {
    margin-block-end: rem(24);
  }

  &__avatar-section {
    display: flex;
    align-items: center;
    gap: rem(16);
    margin-block-end: rem(48);
  }

  &__avatar-meta {
    display: flex;
    flex-direction: column;
    gap: rem(8);
  }

  &__avatar-name {
    font-size: rem(16);
    font-weight: 600;
  }

  &__file-input {
    display: none;
  }

  &__card {
    &-title {
      font-size: rem(24);
      margin-block-end: rem(20);
    }
  }

  &__row {
    display: flex;
    align-items: center;
    gap: rem(20);
    margin-block-end: rem(20);

    &:last-child {
      margin-block-end: 0;
    }

    &-label {
      font-size: rem(14);
      color: var(--foreground);
      min-inline-size: rem(160);
      flex-shrink: 0;
      flex-grow: 1;
    }

    &-value {
      font-size: rem(14);
      color: var(--foreground);

      &--email {
        display: flex;
        align-items: center;
        gap: rem(8);
      }

      &--password {
        letter-spacing: rem(2);
        color: var(--muted-foreground);
      }
    }

    &-actions {
      display: flex;
      flex-direction: column;
      gap: rem(6);
      align-items: flex-start;
    }
  }

  &__show-btn {
    font-size: rem(13);
    color: var(--primary);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;

    @include hover {
      text-decoration: underline;
    }
  }

  &__verified {
    font-size: rem(13);
    color: var(--success, #7bc47f);
    font-weight: 500;
  }

  &__verify-inline {
    display: flex;
    gap: rem(8);
    align-items: center;
  }

  &__error {
    font-size: rem(13);
    color: var(--destructive);
    font-weight: 600;
  }
}

.avatar-requirements {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: rem(6);

  li {
    font-size: rem(13);
    color: var(--muted-foreground);
    padding-inline-start: rem(16);
    position: relative;

    &::before {
      content: '—';
      position: absolute;
      inset-inline-start: 0;
    }
  }

  &__btn {
    inline-size: 100%;
  }
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: rem(8);
  margin-block-start: rem(20);
}

.change-password-form {
  display: flex;
  flex-direction: column;
  gap: rem(16);

  &__error {
    font-size: rem(13);
    color: var(--destructive);
    font-weight: 600;
  }

  &__success {
    font-size: rem(13);
    color: var(--success, #7bc47f);
  }

  &__submit {
    inline-size: 100%;
  }
}
</style>
