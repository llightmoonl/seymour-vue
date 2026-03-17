export interface InputProps {
  required?: boolean;
  title?: string;
  icon?: string;
  name: string;
  placeholder?: string;
  variant?: 'outline' | 'soft' | 'subtle' | 'ghost';
  color?: 'primary' | 'secondary' | 'neutral' | 'destructive';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  type?: 'text' | 'email' | 'search' | 'tel' | 'url' | 'password' | 'number';
  inputmode?: 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
  error?: string;
}

export type SearchInputProps = Omit<InputProps, 'required' | 'type' | 'inputmode' | 'error'> & {
  type?: 'text' | 'search';
  inputmode?: 'text' | 'search';
};

export interface InputEmits {
  (e: 'update:modelValue', value: string): void;
}
