export const DropdownTypes = {
  ITEM: 'item',
  SEPARATOR: 'separator',
  HEADER: 'header',
};

type DropdownType = (typeof DropdownTypes)[keyof typeof DropdownTypes];

export interface DropdownItem {
  id: number;
  type: DropdownType;
  icon?: unknown;
  label?: string;
  action?: string;
  danger?: true;
  hidden?: boolean;
  meta?: string;
  onClick?: () => void;
}

export interface DropdownProps {
  items: DropdownItem[];
  matchTriggerWidth?: boolean;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
}
