<script setup lang="ts">
import type { ResearchListItem } from '../ResearchList';

defineProps<ResearchListItem>();
</script>

<template>
  <li class="research__list-item">
    <a class="research__list-link" :href="url">
      <div class="research__list-information">
        <div class="research__list-title">{{ title }}</div>
        <div class="research__list-badge">{{ type }}</div>
      </div>
      <div class="research__list-time">
        {{ $t('shared.updated') }} {{ $t('shared.hours', 2) }} {{ $t('shared.ago') }}
      </div>
    </a>
  </li>
</template>

<style scoped lang="scss"></style>
