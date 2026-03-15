<script setup lang="ts">
import { VInput } from '@common/components';
import { debounce } from '@common/utils/debounce';

import SearchIcon from '~icons/custom/Search';

import type { SearchInputProps } from './VInput';

defineProps<SearchInputProps>();
const model = defineModel<string>();

const debouncedInput = debounce((value: string) => (model.value = value), 1000);
</script>

<template>
  <v-input
    v-model="model"
    @update:model-value="debouncedInput"
    :icon="SearchIcon"
    :name="name"
    :placeholder="placeholder"
    :type="type"
    :inputmode="inputmode"
    :id="name" />
</template>

<style scoped lang="scss"></style>
