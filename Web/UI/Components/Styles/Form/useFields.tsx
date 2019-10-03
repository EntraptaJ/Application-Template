// Web/UI/Components/Styles/Form/useField.tsx
import React, { useMemo } from 'react';
import { useImport } from 'UI/Components/Providers/ImportProvider';
import { SelectItem } from '../Inputs/Select/BaseSelect';
import { useStyles } from './Styles';
import { Register } from './types';
import { ValidationError } from 'UI/Utils/useApolloErrors';

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

export interface SelectFieldType {
  type: FieldType.SELECT;
  items: SelectItem[];
  label: string;
  name: string;
}

export type Field = TextFieldType | SelectFieldType;

export type UseFields = React.ReactElement;

interface UseFieldsInput {
  fields: Field[];
  register: Register;
  errors?: ValidationError;
}

export function useFields({
  fields,
  register,
  errors,
}: UseFieldsInput): UseFields {
  const classes = useStyles({});
  const TextField = useImport({
    imported: import(
      'UI/Components/Styles/Inputs/TextField/BaseTextField/index'
    ),
    path: 'Components/Styles/Inputs/TextField/BaseTextField/index.tsx',
    Loader: () => <div>Loading</div>,
  });

  return useMemo(
    () => (
      <>
        {fields.map((field, i) => {
          const validState = errors && field.name === errors.field && errors;
          switch (field.type) {
            case FieldType.TEXT:
              const { inputType, ...fieldData } = field;
              return (
                <TextField
                  variant='outlined'
                  className={classes.fieldStyle}
                  inputRef={register}
                  type={inputType}
                  key={i}
                  fullWidth
                  error={!!validState}
                  helperText={validState && validState.errorMessage}
                  {...fieldData}
                />
              );
            case FieldType.SELECT:
              const { items, ...selectData } = field;
              return (
                <TextField
                  select
                  variant='outlined'
                  className={classes.fieldStyle}
                  inputRef={register}
                  SelectProps={{
                    native: true,
                  }}
                  key={i}
                  fullWidth
                  error={!!validState}
                  helperText={validState && validState.errorMessage}
                  {...selectData}
                >
                  {items.map(({ label, value = label }, i) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </TextField>
              );
          }
        })}
      </>
    ),
    [fields, TextField, errors],
  );
}
