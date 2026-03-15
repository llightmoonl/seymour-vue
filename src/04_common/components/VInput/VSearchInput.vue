<script setup lang="ts">
import { VInput } from '@common/components';
import SearchIcon from '~icons/custom/Search';

import type { SearchInputProps } from './VInput';

defineProps<SearchInputProps>();
const model = defineModel<string>();
</script>

<template>
  <v-input
    v-model="model"
    :icon="SearchIcon"
    :name="name"
    :placeholder="placeholder"
    :type="type"
    :inputmode="inputmode"
    :id="name"></v-input>
</template>

<style scoped lang="scss"></style>
