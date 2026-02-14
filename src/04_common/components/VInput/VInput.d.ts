export interface InputProps {
  required?: boolean;
  title?: string;
  name: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'search' | 'tel' | 'url' | 'password' | 'number';
  inputmode?: 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
  error?: string;
}
