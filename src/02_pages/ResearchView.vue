<script setup lang="ts">
import { VButton, VContainer, VInput } from '@common/components';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
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
          <v-input name="search" :placeholder="t('research.search')"></v-input>
        </form>
      </div>
    </header>
    <div class="research__body">
      <ul class="research__list">
        <li class="research__list-item">
          <a class="research__list-link" href="#">
            <div class="research__list-information">
              <div class="research__list-title">Title Test Item</div>
              <div class="research__list-time">Обновлено 12 часов назад</div>
            </div>
            <div class="research__list-badge">Hebbian</div>
          </a>
        </li>
        <li class="research__list-item">
          <a class="research__list-link" href="#">
            <div class="research__list-information">
              <div class="research__list-title">Title Test Item2</div>
              <div class="research__list-time">Обновлено 12 часов назад</div>
            </div>
            <div class="research__list-badge">Delta</div>
          </a>
        </li>
        <li class="research__list-item">
          <a class="research__list-link" href="#">
            <div class="research__list-information">
              <div class="research__list-title">Title Test Item</div>
              <div class="research__list-time">Обновлено 12 часов назад</div>
            </div>
            <div class="research__list-badge">Hebbian</div>
          </a>
        </li>
        <li class="research__list-item">
          <a class="research__list-link" href="#">
            <div class="research__list-information">
              <div class="research__list-title">Title Test Item</div>
              <div class="research__list-time">Обновлено 12 часов назад</div>
            </div>
            <div class="research__list-badge">Hebbian</div>
          </a>
        </li>
        <li class="research__list-item">
          <a class="research__list-link" href="#">
            <div class="research__list-information">
              <div class="research__list-title">Title Test Item</div>
              <div class="research__list-time">Обновлено 12 часов назад</div>
            </div>
            <div class="research__list-badge">Hebbian</div>
          </a>
        </li>
        <li class="research__list-item">
          <a class="research__list-link" href="#">
            <div class="research__list-information">
              <div class="research__list-title">Title Test Item</div>
              <div class="research__list-time">Обновлено 12 часов назад</div>
            </div>
            <div class="research__list-badge">Hebbian</div>
          </a>
        </li>
        <li class="research__list-item">
          <a class="research__list-link" href="#">
            <div class="research__list-information">
              <div class="research__list-title">Title Test Item</div>
              <div class="research__list-time">Обновлено 12 часов назад</div>
            </div>
            <div class="research__list-badge">Hebbian</div>
          </a>
        </li>
        <li class="research__list-item">
          <a class="research__list-link" href="#">
            <div class="research__list-information">
              <div class="research__list-title">Title Test Item</div>
              <div class="research__list-time">Обновлено 12 часов назад</div>
            </div>
            <div class="research__list-badge">Hebbian</div>
          </a>
        </li>
        <li class="research__list-item">
          <a class="research__list-link" href="#">
            <div class="research__list-information">
              <div class="research__list-title">Title Test Item</div>
              <div class="research__list-time">Обновлено 12 часов назад</div>
            </div>
            <div class="research__list-badge">Hebbian</div>
          </a>
        </li>
        <li class="research__list-item">
          <a class="research__list-link" href="#">
            <div class="research__list-information">
              <div class="research__list-title">Title Test Item</div>
              <div class="research__list-time">Обновлено 12 часов назад</div>
            </div>
            <div class="research__list-badge">Hebbian</div>
          </a>
        </li>
        <li class="research__list-item">
          <a class="research__list-link" href="#">
            <div class="research__list-information">
              <div class="research__list-title">Title Test Item</div>
              <div class="research__list-time">Обновлено 12 часов назад</div>
            </div>
            <div class="research__list-badge">Hebbian</div>
          </a>
        </li>
        <li class="research__list-item">
          <a class="research__list-link" href="#">
            <div class="research__list-information">
              <div class="research__list-title">Title Test Item</div>
              <div class="research__list-time">Обновлено 12 часов назад</div>
            </div>
            <div class="research__list-badge">Hebbian</div>
          </a>
        </li>
        <li class="research__list-item">
          <a class="research__list-link" href="#">
            <div class="research__list-information">
              <div class="research__list-title">Title Test Item</div>
              <div class="research__list-time">Обновлено 12 часов назад</div>
            </div>
            <div class="research__list-badge">Hebbian</div>
          </a>
        </li>
        <li class="research__list-item">
          <a class="research__list-link" href="#">
            <div class="research__list-information">
              <div class="research__list-title">Title Test Item</div>
              <div class="research__list-time">Обновлено 12 часов назад</div>
            </div>
            <div class="research__list-badge">Hebbian</div>
          </a>
        </li>

        <v-button class="research__list-more" variant="outline" size="md">Показать еще</v-button>
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
  padding-right: rem(12);
  padding-bottom: rem(64);

  &-item {
    border-top: 1px solid var(--input);

    &:last-child {
      border-bottom: 1px solid var(--input);
    }

    @include hover() {
      background-color: var(--surface-hover);
      border-radius: rem(8);
      border-color: transparent;
    }
  }

  &-link {
    padding: rem(16);
    display: flex;
    align-items: start;
    justify-content: space-between;
  }

  &-time {
    margin-top: rem(4);
    font-size: rem(12);
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
