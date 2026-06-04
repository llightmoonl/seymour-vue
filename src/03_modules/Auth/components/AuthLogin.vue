<script setup lang="ts">
import VInput from '@common/components/VInput/VInput.vue';
import VFormField from '@common/components/VFormField/VFormField.vue';
import VButton from '@common/components/VButton/VButton.vue';
import VCheckbox from '@common/components/VCheckbox/VCheckbox.vue';
import { ButtonSizes } from '@common/components/VButton/VButton.types.ts';
</script>

<template>
  <form class="auth-login">
    <h1 class="auth-login__title">{{ $t('auth.sign-in.title') }}</h1>
    <p class="auth-login__pretitle">{{ $t('auth.sign-in.pretitle') }}</p>
    <div class="auth-login__fields">
      <v-form-field size="sm" class="auth-login__input" :title="$t('auth.email.title')">
        <v-input variant="soft" size="xl" :placeholder="$t('auth.email.placeholder')" name="email" type="email" />
      </v-form-field>
      <v-form-field size="sm" class="auth-login__input" :title="$t('auth.password.title')">
        <v-input
          variant="soft"
          size="xl"
          :placeholder="$t('auth.password.placeholder')"
          name="password"
          type="password" />
      </v-form-field>
    </div>
    <div class="auth-login__bottom">
      <label class="auth-login__remember-me">
        <v-checkbox />
        {{ $t('auth.sign-in.remember-me') }}
      </label>
      <router-link class="auth-login__forgot-password" to="#">{{ $t('auth.sign-in.forgot-password') }}</router-link>
    </div>
    <v-button :size="ButtonSizes.XL" class="auth-login__submit">{{ $t('auth.sign-in.button') }}</v-button>
    <p class="auth-login__no-account">
      {{ $t('auth.sign-in.no-account') }}
      <router-link class="auth-login__no-account-link" to="#">{{ $t('auth.sign-in.link') }}</router-link>
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
