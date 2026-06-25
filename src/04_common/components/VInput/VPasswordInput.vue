<script setup lang="ts">
import { computed, ref } from 'vue';
import VInput from '@common/components/VInput/VInput.vue';
import type { PasswordInputProps } from './VInput.types';

import EyeIcon from '~icons/custom/Eye';
import Eye2Icon from '~icons/custom/Eye2';

defineProps<PasswordInputProps>();

const model = defineModel<string>();
const isVisiblePassword = ref(false);

const changeVisibilityPassword = () => {
  isVisiblePassword.value = !isVisiblePassword.value;
};

const inputType = computed(() => (isVisiblePassword.value ? 'text' : 'password'));
const iconPassword = computed(() => (isVisiblePassword.value ? EyeIcon : Eye2Icon));
</script>

<template>
  <div class="password-input__wrapper">
    <v-input
      class="password-input__field"
      v-model="model"
      :icon="SearchIcon"
      :name="name"
      :placeholder="placeholder"
      :type="inputType"
      :size="size"
      :variant="variant"
      :inputmode="inputmode"
      :id="name"
      :error="error" />
    <component
      class="password-input__visibility"
      :is="iconPassword"
      @click.prevent="changeVisibilityPassword"></component>
  </div>
</template>

<style scoped lang="scss">
.password-input {
  &__wrapper {
    position: relative;
  }

  &__visibility {
    position: absolute;
    @include abs-y();
    right: rem(10);
    color: var(--foreground);
    width: rem(20);
    height: rem(20);
  }
}
</style>
