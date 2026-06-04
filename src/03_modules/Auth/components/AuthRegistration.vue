<script setup lang="ts">
import { ButtonSizes } from '@common/components/VButton/VButton.types.ts';
import VFormField from '@common/components/VFormField/VFormField.vue';
import VButton from '@common/components/VButton/VButton.vue';
import VInput from '@common/components/VInput/VInput.vue';
import VCheckbox from '@common/components/VCheckbox/VCheckbox.vue';
</script>

<template>
  <form class="auth-registration">
    <h1 class="auth-registration__title">{{ $t('auth.sign-up.title') }}</h1>
    <p class="auth-registration__pretitle">{{ $t('auth.sign-up.pretitle') }}</p>
    <div class="auth-registration__fields">
      <v-form-field size="sm" class="auth-registration__input" :title="$t('auth.sign-up.name-surname.title')">
        <v-input
          variant="soft"
          size="xl"
          :placeholder="$t('auth.sign-up.name-surname.placeholder')"
          name="password"
          type="password" />
      </v-form-field>
      <v-form-field size="sm" class="auth-registration__input" :title="$t('auth.email.title')">
        <v-input variant="soft" size="xl" :placeholder="$t('auth.email.placeholder')" name="email" type="email" />
      </v-form-field>
      <v-form-field size="sm" class="auth-registration__input" :title="$t('auth.password.title')">
        <v-input
          variant="soft"
          size="xl"
          :placeholder="$t('auth.password.placeholder')"
          name="password"
          type="password" />
      </v-form-field>
    </div>
    <div class="auth-registration__bottom">
      <label class="auth-registration__aggrement">
        <v-checkbox />
        <span>
          {{ $t('auth.sign-up.agreement') }}
          <router-link to="#">{{ $t('auth.sign-up.terms') }}</router-link>
          {{ $t('auth.sign-up.and') }}
          <router-link to="#">{{ $t('auth.sign-up.policy') }}</router-link>
        </span>
      </label>
    </div>
    <v-button :size="ButtonSizes.XL" class="auth-registration__submit">{{ $t('auth.sign-in.button') }}</v-button>
    <p class="auth-registration__no-account">
      {{ $t('auth.sign-up.exist-account') }}
      <router-link class="auth-registration__no-account-link" to="#">{{ $t('auth.sign-up.link') }}</router-link>
    </p>
  </form>
</template>

<style scoped lang="scss">
.auth-registration {
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

  &__aggrement {
    font-size: rem(12);
    display: flex;
    align-items: center;
    column-gap: rem(8);

    & a {
      color: var(--muted-foreground);
      text-decoration: underline;
      text-underline-offset: 0.5px;
    }
  }
}
</style>
