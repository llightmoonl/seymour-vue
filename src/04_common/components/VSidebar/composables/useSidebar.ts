import { ref } from 'vue';
import { useCookies } from '@vueuse/integrations/useCookies';

const cookies = useCookies(['sidebar-expanded']);
const open = ref(cookies.get('sidebar-expanded'));

export const useSidebar = () => {
  const setOpen = () => {
    open.value = !open.value;
  };

  return { open, setOpen };
};
