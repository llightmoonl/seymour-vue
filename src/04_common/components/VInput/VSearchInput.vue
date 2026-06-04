<script setup lang="ts">
import VInput from '@common/components/VInput/VInput.vue';
import { debounce } from '@common/utils/debounce';

import SearchIcon from '~icons/custom/Search';

import type { InputEmits, SearchInputProps } from './VInput.types.ts';

defineProps<SearchInputProps>();

const model = defineModel<string>();
const emit = defineEmits<InputEmits>();

const debouncedInput = debounce((value: string) => {
  model.value = value;
  emit('update:modelValue', value);
}, 1000);
</script>

<template>
  <v-input
    :model-value="model"
    @update:model-value="debouncedInput"
    :icon="SearchIcon"
    :name="name"
    :placeholder="placeholder"
    :type="type"
    :size="size"
    :variant="variant"
    :inputmode="inputmode"
    :id="name" />
</template>
