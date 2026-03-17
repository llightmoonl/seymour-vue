<script setup lang="ts">
import { VButton, VInput, VModal, VSelect } from '@common/components';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const ALGORITHMS_OPTIONS = [
  { id: 0, name: 'Правило Хебба' },
  { id: 1, name: 'Дельта-правило' },
];

const { t } = useI18n();

const selectedAlgorithm = ref<typeof ALGORITHMS_OPTIONS>(ALGORITHMS_OPTIONS[0]);
</script>

<template>
  <v-modal class="research-create" :title="t('research.createModal.title')">
    <v-button class="research-create__trigger" variant="solid" size="md">
      <i-custom-plus class="research-create__icon-plus"></i-custom-plus>
      {{ $t('research.create') }}
    </v-button>

    <template #content>
      <form class="research-create__form">
        <v-input size="md" required name="title" :placeholder="t('research.createModal.name')"></v-input>
        <v-select
          v-model:value="selectedAlgorithm"
          size="md"
          :placeholder="t('research.createModal.type')"
          :options="ALGORITHMS_OPTIONS"></v-select>
      </form>
    </template>

    <template #footer>
      <div class="research-create__footer">
        <v-button variant="subtle">{{ $t('shared.cancel') }}</v-button>
        <v-button>{{ $t('shared.create') }}</v-button>
      </div>
    </template>
  </v-modal>
</template>

<style scoped lang="scss">
.research-create {
  &__trigger {
    display: flex;
    align-items: center;
    column-gap: rem(4);
  }

  &__icon-plus {
    width: rem(20);
    height: rem(20);
  }

  &__form {
    margin-top: rem(16);
    display: flex;
    flex-direction: column;
    row-gap: rem(8);
  }

  &__footer {
    margin-top: rem(20);
    display: flex;
    column-gap: rem(8);
    justify-content: end;
  }
}
</style>
