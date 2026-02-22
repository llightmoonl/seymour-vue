import type { Component } from 'vue';

export interface VTabsItems {
  id: number;
  title: string;
  value: string;
  component: Component;
  disabled?: boolean;
}

export interface VTabsProps {
    items: VTabsItems[];
    defaultValue: string;
    orientation?: 'horizontal' | 'vertical';
}
