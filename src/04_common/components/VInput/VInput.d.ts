export interface InputProps {
  required?: boolean;
  title?: string;
  icon?: string;
  name: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'search' | 'tel' | 'url' | 'password' | 'number';
  inputmode?: 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
  error?: string;
}

export type SearchInputProps = Omit<InputProps, 'required' | 'type' | 'inputmode' | 'error'> & {
  type?: 'text' | 'search';
  inputmode?: 'text' | 'search';
};
