<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { VContainer, VSearchInput } from '@common/components';
import { CreateResearchModal, ResearchList } from '@modules/Research';
const { t } = useI18n();

useHead({
  title: t('research.title'),
});

const logger = (value: string) => {
  console.log(value);
};
</script>

<template>
  <VContainer size="md">
    <header class="research__header">
      <div class="research__header-top">
        <h2 class="research__title">{{ $t('research.title') }}</h2>
        <create-research-modal />
      </div>
      <div class="research__header-bottom">
        <form>
          <v-search-input
            variant="subtle"
            size="lg"
            name="search"
            :placeholder="t('research.search')"
            @update:model-value="logger" />
        </form>
      </div>
    </header>
    <div class="research__body">
      <research-list />
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
</style>
