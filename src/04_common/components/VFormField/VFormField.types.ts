export const FormFieldSizes = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
};

type FormFieldSize = (typeof FormFieldSizes)[keyof typeof FormFieldSizes];

export interface VFormFieldProps {
  required?: boolean;
  size?: FormFieldSize;
  title?: string;
  error?: string;
  hideError?: boolean;
}
