import type { InjectionKey, Ref } from 'vue';

export const SidebarVariants = {
  SIDEBAR: 'sidebar',
  FLOATING: 'floating',
  INSET: 'inset',
};

export const SidebarCollapsible = {
  ICON: 'icon',
  OFFCANVAS: 'offcanvas',
};

export const SidebarSide = {
  RIGHT: 'right',
  LEFT: 'left',
};

type SidebarVariant = (typeof SidebarVariants)[keyof typeof SidebarVariants];
type SidebarSide = (typeof SidebarSide)[keyof typeof SidebarSide];
type SidebarCollapsible = (typeof SidebarCollapsible)[keyof typeof SidebarCollapsible];

export interface SidebarContext {
  open: Ref<boolean>;
}

export const SidebarProviderKey: InjectionKey<SidebarContext> = Symbol('sidebar-provider');
export const SidebarKey: InjectionKey<unknown> = Symbol('sidebar');
export const SidebarMenuKey: InjectionKey<unknown> = Symbol('sidebar-menu');

export interface SidebarProviderProps {
  open?: boolean;
}

export interface SidebarProps {
  variant?: SidebarVariant;
  collapsible?: SidebarCollapsible;
  side?: SidebarSide;
}

export interface SidebarMenuItemProps {
  href: string;
  title?: string;
  icon?: string;
  opened?: boolean;
}
