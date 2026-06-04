import type { Component } from 'vue';
import type { AcceptableValue } from 'reka-ui';

export const TabsVariants = {
  PILLS: 'pills',
  CHIPS: 'chips',
};

export const TabsOrientations = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
};

type TabsVariants = (typeof TabsVariants)[keyof typeof TabsVariants];
type TabsOrientation = (typeof TabsOrientations)[keyof typeof TabsOrientations];

export interface TabsItems {
  id: number;
  title: string;
  value: AcceptableValue;
  component?: Component;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabsItems[];
  defaultValue?: AcceptableValue;
  variant: TabsVariants;
  orientation: TabsOrientation;
}
