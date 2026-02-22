<script setup lang="ts">
import { AvatarImage, AvatarFallback, AvatarRoot } from 'reka-ui';
import type { AvatarProps } from './VAvatar';

defineProps<AvatarProps>();
</script>

<template>
  <AvatarRoot>
    <AvatarImage :src="src" />
    <AvatarFallback />
  </AvatarRoot>
</template>

<style scoped lang="scss">
@use '@common/styles/helpers' as *;
</style>
