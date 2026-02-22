export interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'solid' | 'outline' | 'soft' | 'subtle' | 'ghost' | 'link';
  color?: 'primary' | 'secondary' | 'neutral' | 'destructive';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'icon-xs' | 'icon-sm' | 'icon-md' | 'icon-lg';
  isLoading?: boolean;
  disabled?: boolean;
}
