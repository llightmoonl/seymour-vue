import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTabs = defineStore('tabs', () => {
  const activeTab = ref<string | number | undefined>('generation');

  function setActiveTab(tab: number | string | undefined) {
    activeTab.value = tab;
  }

  return {
    activeTab,
    setActiveTab,
  };
});
