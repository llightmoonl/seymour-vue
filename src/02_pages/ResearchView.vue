<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { VButton, VContainer, VSearchInput } from '@common/components';

const { t } = useI18n();

useHead({
  title: t('research.title'),
});
</script>

<template>
  <VContainer size="md">
    <header class="research__header">
      <div class="research__header-top">
        <h2 class="research__title">{{ $t('research.title') }}</h2>
        <v-button class="research__create" variant="solid" size="md">
          <i-custom-plus class="research__create-plus"></i-custom-plus>
          {{ $t('research.create') }}
        </v-button>
      </div>
      <div class="research__header-bottom">
        <form>
          <v-search-input name="search" :placeholder="t('research.search')"></v-search-input>
        </form>
      </div>
    </header>
    <div class="research__body">
      <ul class="research__list">
        <li class="research__list-item">
          <a class="research__list-link" href="#">
            <div class="research__list-information">
              <div class="research__list-title">Title Test Item title test item title test item</div>
              <div class="research__list-badge">Правило Хебба</div>
            </div>
            <div class="research__list-time">
              {{ $t('shared.updated') }} {{ $t('shared.hours', 2) }} {{ $t('shared.ago') }}
            </div>
          </a>
        </li>
        <li class="research__list-item">
          <a class="research__list-link" href="#">
            <div class="research__list-information">
              <div class="research__list-title">Title Test Item</div>
              <div class="research__list-badge">Hebbian</div>
            </div>
            <div class="research__list-time">
              {{ $t('shared.updated') }} {{ $t('shared.hours', 2) }} {{ $t('shared.ago') }}
            </div>
          </a>
        </li>
        <li class="research__list-item">
          <a class="research__list-link" href="#">
            <div class="research__list-information">
              <div class="research__list-title">Title Test Item</div>
              <div class="research__list-badge">Hebbian</div>
            </div>
            <div class="research__list-time">
              {{ $t('shared.updated') }} {{ $t('shared.hours', 2) }} {{ $t('shared.ago') }}
            </div>
          </a>
        </li>
        <li class="research__list-item">
          <a class="research__list-link" href="#">
            <div class="research__list-information">
              <div class="research__list-title">Title Test Item</div>
              <div class="research__list-badge">Hebbian</div>
            </div>
            <div class="research__list-time">
              {{ $t('shared.updated') }} {{ $t('shared.hours', 2) }} {{ $t('shared.ago') }}
            </div>
          </a>
        </li>
        <li class="research__list-item">
          <a class="research__list-link" href="#">
            <div class="research__list-information">
              <div class="research__list-title">Title Test Item</div>
              <div class="research__list-badge">Hebbian</div>
            </div>
            <div class="research__list-time">
              {{ $t('shared.updated') }} {{ $t('shared.hours', 2) }} {{ $t('shared.ago') }}
            </div>
          </a>
        </li>
        <li class="research__list-item">
          <a class="research__list-link" href="#">
            <div class="research__list-information">
              <div class="research__list-title">Title Test Item</div>
              <div class="research__list-badge">Hebbian</div>
            </div>
            <div class="research__list-time">
              {{ $t('shared.updated') }} {{ $t('shared.hours', 2) }} {{ $t('shared.ago') }}
            </div>
          </a>
        </li>
        <li class="research__list-item">
          <a class="research__list-link" href="#">
            <div class="research__list-information">
              <div class="research__list-title">Title Test Item</div>
              <div class="research__list-badge">Hebbian</div>
            </div>
            <div class="research__list-time">
              {{ $t('shared.updated') }} {{ $t('shared.hours', 2) }} {{ $t('shared.ago') }}
            </div>
          </a>
        </li>
        <li class="research__list-item">
          <a class="research__list-link" href="#">
            <div class="research__list-information">
              <div class="research__list-title">Title Test Item</div>
              <div class="research__list-badge">Hebbian</div>
            </div>
            <div class="research__list-time">
              {{ $t('shared.updated') }} {{ $t('shared.hours', 2) }} {{ $t('shared.ago') }}
            </div>
          </a>
        </li>

        <v-button class="research__list-more" variant="outline" size="md">{{ $t('shared.show-more') }}</v-button>
      </ul>
    </div>
  </VContainer>
</template>

<style scoped lang="scss">
.research__header {
  margin-top: rem(64);
  display: flex;
  flex-direction: column;
  row-gap: rem(16);

  &-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.research__body {
  margin-top: rem(32);
}

.research__create {
  display: flex;
  align-items: center;
  column-gap: rem(4);

  &-plus {
    width: rem(20);
    height: rem(20);
  }
}

.research__list {
  overflow-y: auto;
  height: calc(100vh - 224px);
  padding-bottom: rem(64);

  &-item {
    border-top: 1px solid var(--input);

    &:last-of-type {
      border-bottom: 1px solid var(--input);
    }

    @include hover() {
      background-color: var(--surface-hover);
      border-radius: rem(8);
      border-color: transparent;
    }
  }

  &-information {
    display: flex;
    align-items: center;
    column-gap: rem(4);
  }

  &-link {
    padding: rem(16) rem(8);
    display: flex;
    flex-direction: column;
    row-gap: rem(4);
  }

  &-title {
    font-weight: 700;
  }

  &-time {
    font-size: rem(12);
    font-weight: 300;
  }

  &-more {
    margin-top: rem(16);
    width: 100%;
  }

  &-badge {
    font-size: rem(12);
    border: 1px solid var(--input);
    border-radius: rem(8);
    padding: rem(0.5) rem(8);
  }
}
</style>
