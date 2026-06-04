export const DropdownTypes = {
  ITEM: 'item',
  SEPARATOR: 'separator',
};

type DropdownType = (typeof DropdownTypes)[keyof typeof DropdownTypes];

export interface DropdownItem {
  id: number;
  type: DropdownType;
  icon?: string;
  label?: string;
  action?: string;
  danger?: true;
}

export interface DropdownProps {
  items: DropdownItem[];
  matchTriggerWidth?: boolean;
}
