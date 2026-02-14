import type { Component } from 'vue';

export interface TabsBaseData {
  id: number;
  title: string;
  value: string;
  component: Component;
  disabled?: boolean;
}

export interface TabsBaseProps {
    data: TabsBaseData[];
    defaultValue: string;
    orientation?: 'horizontal' | 'vertical';
}
