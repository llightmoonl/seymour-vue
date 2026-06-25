<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { useMutation } from '@pinia/colada';
import { DialogRoot, DialogPortal, DialogOverlay, DialogContent, DialogTitle } from 'reka-ui';
import { postAdminUser } from '../../../api/admin.api';
import type { UserRole, UserStatus } from '../../../types/admin.types';
import VFormField from '@common/components/VFormField/VFormField.vue';
import VInput from '@common/components/VInput/VInput.vue';
import VButton from '@common/components/VButton/VButton.vue';
import { ButtonSizes, ButtonVariants, ButtonTypes } from '@common/components/VButton/VButton.types';

const emit = defineEmits<{ close: []; created: [] }>();
const { t } = useI18n();

const schema = toTypedSchema(
  z.object({
    name: z.string().nonempty({ message: 'Введите имя' }),
    email: z.string().email({ message: 'Введите корректный email' }),
    role: z.enum(['STUDENT', 'TEACHER', 'ADMIN'] as const),
    group: z.string().optional(),
    status: z.enum(['ACTIVE', 'INACTIVE', 'BLOCKED'] as const).optional(),
  }),
);

const SETTINGS = {
  validateOnBlur: false,
  validateOnModelUpdate: false,
  validateOnInput: false,
  validateOnChange: false,
};

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: { role: 'STUDENT' as UserRole, status: 'ACTIVE' as UserStatus },
});

const [name] = defineField('name', SETTINGS);
const [email] = defineField('email', SETTINGS);
const [role] = defineField('role', SETTINGS);
const [group] = defineField('group', SETTINGS);
const [status] = defineField('status', SETTINGS);

const serverError = ref('');

const { mutate, status: mutateStatus } = useMutation({
  mutation: (dto: Parameters<typeof postAdminUser>[0]) => postAdminUser(dto),
  onSuccess: () => {
    emit('created');
    emit('close');
  },
  onError: () => {
    serverError.value = t('shared.error');
  },
});

const onSubmit = handleSubmit((values) => {
  serverError.value = '';
  mutate({
    name: values.name,
    email: values.email,
    role: values.role as UserRole,
    group: values.group || undefined,
    status: (values.status as UserStatus) || undefined,
  });
});

const roleOptions: Array<{ value: UserRole; label: string }> = [
  { value: 'STUDENT', label: t('roles.STUDENT') },
  { value: 'TEACHER', label: t('roles.TEACHER') },
  { value: 'ADMIN', label: t('roles.ADMIN') },
];

const statusOptions: Array<{ value: UserStatus; label: string }> = [
  { value: 'ACTIVE', label: t('admin.status.ACTIVE') },
  { value: 'INACTIVE', label: t('admin.status.INACTIVE') },
  { value: 'BLOCKED', label: t('admin.status.BLOCKED') },
];
</script>

<template>
  <dialog-root :open="true">
    <dialog-portal>
      <dialog-overlay class="modal-overlay" @click="emit('close')" />
      <dialog-content class="create-modal">
        <dialog-title class="create-modal__title">{{ $t('admin.create-user.title') }}</dialog-title>

        <form class="create-modal__form" novalidate @submit="onSubmit">
          <v-form-field :title="$t('admin.create-user.name')" :error="errors.name">
            <v-input v-model="name" variant="soft" size="xl" name="name" />
          </v-form-field>
          <v-form-field :title="$t('admin.create-user.email')" :error="errors.email">
            <v-input v-model="email" variant="soft" size="xl" name="email" type="email" />
          </v-form-field>
          <v-form-field :title="$t('admin.create-user.role')" :error="errors.role">
            <select v-model="role" class="create-modal__select">
              <option v-for="opt in roleOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
            </select>
          </v-form-field>
          <v-form-field :title="$t('admin.create-user.group')">
            <v-input v-model="group" variant="soft" size="xl" name="group" />
          </v-form-field>
          <v-form-field :title="$t('admin.create-user.status')">
            <select v-model="status" class="create-modal__select">
              <option v-for="opt in statusOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
            </select>
          </v-form-field>

          <p v-if="serverError" class="create-modal__error">{{ serverError }}</p>

          <div class="create-modal__actions">
            <v-button :variant="ButtonVariants.OUTLINE" :size="ButtonSizes.MD" type="button" @click="emit('close')">
              {{ $t('admin.create-user.cancel') }}
            </v-button>
            <v-button :type="ButtonTypes.SUBMIT" :size="ButtonSizes.MD" :is-loading="mutateStatus === 'pending'">
              {{ $t('admin.create-user.create') }}
            </v-button>
          </div>
        </form>

        <button class="create-modal__close" @click="emit('close')">×</button>
      </dialog-content>
    </dialog-portal>
  </dialog-root>
</template>

<style scoped lang="scss">
.modal-overlay {
  background-color: var(--overlay);
  position: fixed;
  inset: 0;
  z-index: 100;
}

.create-modal {
  border: 1px solid var(--border);
  background-color: var(--popover);
  border-radius: rem(8);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: rem(480);
  max-height: 85vh;
  overflow-y: auto;
  padding: rem(24);
  z-index: 101;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);

  &:focus {
    outline: none;
  }

  &__title {
    font-size: rem(18);
    font-weight: 600;
    margin-block-end: rem(20);
    padding-inline-end: rem(32);
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: rem(16);
  }

  &__select {
    inline-size: 100%;
    padding: rem(10) rem(12);
    border: 2px solid var(--input);
    border-radius: rem(8);
    background-color: color-mix(in srgb, var(--foreground) 5%, transparent);
    color: var(--foreground);
    font-size: rem(15);
    cursor: pointer;

    &:focus {
      outline: none;
    }
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
    margin-block-start: rem(8);
  }

  &__close {
    @include reset-btn;
    position: absolute;
    top: rem(12);
    right: rem(12);
    font-size: rem(20);
    line-height: 1;
    color: var(--muted-foreground);
    cursor: pointer;
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
