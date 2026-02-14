import { ref } from 'vue';
import { useCookies } from '@vueuse/integrations/useCookies';

const cookies = useCookies(['sidebar-expanded'])
const expanded = ref(cookies.get('sidebar-expanded'));

export const useSidebar = () => {
  const toggleExpanded = () => {
    expanded.value = !expanded.value;
    cookies.set('sidebar-expanded', expanded.value);
  };

  return { expanded, toggleExpanded };
};
