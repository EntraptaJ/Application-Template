// Web/UI/Components/Styles/TextField/useTextFieldProps.ts
import { OutlinedTextFieldProps } from '@material-ui/core/TextField';

export enum FieldType {
  TEXT = 'text',
  SELECT = 'select',
  DATE = 'date',
}

export enum TextFieldInputType {
  TEXT = 'text',
  PASSWORD = 'password',
  USERNAME = 'username',
  EMAIL = 'email',
}

interface TextFieldType {
  type: FieldType.TEXT;
  label: string;
  inputType: TextFieldInputType;
  name: string;
}

interface SelectFieldType {
  type: FieldType.SELECT;
  items: SelectItem[];
  label: string;
  name: string;
}

type Field = TextFieldType | SelectFieldType;

interface UseTextFieldPropsInput {}

export function useTextFieldProps(props: unknown): OutlinedTextFieldProps {}
