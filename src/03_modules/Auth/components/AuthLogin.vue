<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';

import VInput from '@common/components/VInput/VInput.vue';
import VPasswordInput from '@common/components/VInput/VPasswordInput.vue';
import VFormField from '@common/components/VFormField/VFormField.vue';
import VButton from '@common/components/VButton/VButton.vue';
import VCheckbox from '@common/components/VCheckbox/VCheckbox.vue';

import { ButtonSizes, ButtonTypes } from '@common/components/VButton/VButton.types';

import { useAuthSchema } from '../composables/useAuthSchema';
import { useAuthStore } from '../stores/useAuthStore';

const { t } = useI18n();
const { loginSchema } = useAuthSchema(t);
const authStore = useAuthStore();
const router = useRouter();

const serverError = ref('');
const isLoading = ref(false);

const SETTINGS_FIELDS = {
  validateOnBlur: false,
  validateOnModelUpdate: false,
  validateOnInput: false,
  validateOnChange: false,
};

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: loginSchema,
  initialValues: {
    remember: false,
  },
});

const [email] = defineField('email', SETTINGS_FIELDS);
const [password] = defineField('password', SETTINGS_FIELDS);
const [remember] = defineField('remember');

const onSubmit = handleSubmit(async (values) => {
  serverError.value = '';
  isLoading.value = true;
  try {
    await authStore.login({
      email: values.email,
      password: values.password,
      rememberMe: values.remember,
    });
    router.push('/');
  } catch {
    serverError.value = t('auth.sign-in.error');
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <form class="auth-login" novalidate @submit="onSubmit">
    <h1 class="auth-login__title">{{ $t('auth.sign-in.title') }}</h1>
    <p class="auth-login__pretitle">{{ $t('auth.sign-in.pretitle') }}</p>
    <div class="auth-login__fields">
      <v-form-field size="sm" class="auth-login__input" :title="$t('auth.email.title')" :error="errors.email">
        <v-input
          v-model="email"
          variant="soft"
          size="xl"
          name="email"
          type="email"
          :placeholder="$t('auth.email.placeholder')" />
      </v-form-field>
      <v-form-field size="sm" class="auth-login__input" :title="$t('auth.password.title')" :error="errors.password">
        <v-password-input
          v-model="password"
          variant="soft"
          size="xl"
          :placeholder="$t('auth.password.placeholder')"
          name="password" />
      </v-form-field>
    </div>
    <div class="auth-login__bottom">
      <label class="auth-login__remember-me">
        <v-checkbox v-model="remember" />
        {{ $t('auth.sign-in.remember-me') }}
      </label>
      <router-link class="auth-login__forgot-password" to="#">{{ $t('auth.sign-in.forgot-password') }}</router-link>
    </div>
    <p v-if="serverError" class="auth-login__error">{{ serverError }}</p>
    <v-button :type="ButtonTypes.SUBMIT" :size="ButtonSizes.XL" class="auth-login__submit" :is-loading="isLoading">
      {{ $t('auth.sign-in.button') }}
    </v-button>
    <p class="auth-login__no-account">
      {{ $t('auth.sign-in.no-account') }}
      <router-link class="auth-login__no-account-link" to="/register">{{ $t('auth.sign-in.link') }}</router-link>
    </p>
  </form>
</template>

<style scoped lang="scss">
.auth-login {
  &__title {
    margin-block-end: rem(8);
  }

  &__pretitle {
    margin-block-end: rem(20);
    font-size: rem(13);
    line-height: 1.5;
    color: var(--muted-foreground);
  }

  &__input {
    margin-block-end: rem(16);

    &:last-child {
      margin-block-end: 0;
    }
  }

  &__submit {
    inline-size: 100%;
    margin-block-start: rem(36);
  }

  &__error {
    margin-block-start: rem(8);
    font-size: rem(13);
    color: var(--destructive);
    font-weight: 600;
  }

  &__no-account {
    text-align: center;
    font-size: rem(12);
    margin-block-start: rem(16);
    color: var(--gray-500);

    &-link {
      color: var(--muted-foreground);
      text-decoration: underline;
      text-underline-offset: 0.5px;
    }
  }

  &__bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-block-start: rem(12);
  }

  &__remember-me {
    font-size: rem(12);
    display: flex;
    align-items: center;
    column-gap: rem(8);
  }

  &__forgot-password {
    font-size: rem(12);
    color: var(--muted-foreground);
    text-decoration: underline;
    text-underline-offset: 0.5px;
  }
}
</style>
