<script setup lang="ts">
import { VButton, VFormField, VInput, VModal, VSelect } from '@common/components';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const ALGORITHMS_OPTIONS = [
  { id: 0, name: t('shared.algorithms.hebbian') },
  { id: 1, name: t('shared.algorithms.delta') },
];

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
        <VFormField :title="t('research.createModal.inputs.name.title')" required>
          <v-input size="md" required name="title" :placeholder="t('research.createModal.inputs.name.placeholder')" />
        </VFormField>
        <VFormField :title="t('research.createModal.inputs.type.title')" required>
          <v-select
            v-model:value="selectedAlgorithm"
            :placeholder="t('research.createModal.inputs.type.placeholder')"
            :options="ALGORITHMS_OPTIONS" />
        </VFormField>
      </form>
    </template>

    <template #footer="{ close }">
      <div class="research-create__footer">
        <v-button variant="subtle" @click="close">{{ $t('shared.cancel') }}</v-button>
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
    margin-top: rem(28);
    display: flex;
    flex-direction: column;
    row-gap: rem(12);
  }

  &__footer {
    margin-top: rem(24);
    display: flex;
    column-gap: rem(8);
    justify-content: end;
  }
}
</style>
