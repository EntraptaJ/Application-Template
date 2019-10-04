// Web/UI/Components/Styles/Form/useField.tsx
import React, { useMemo } from 'react';
import { useImport } from 'UI/Components/Providers/ImportProvider';
import { useStyles } from './Styles';
import { Register } from './types';
import { ValidationError } from 'UI/Utils/useApolloErrors';
import { Loader } from '../Loader';

export enum FieldType {
  TEXT = 'text',
  SELECT = 'select',
  DATE = 'date',
}

enum FieldAutoComplete {
  'password' = 'current-password',
  'username' = 'username',
  'email' = 'email',
  'text' = 'off',
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

interface SelectItem {
  label: string;
  value?: string;
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
    // TODO: TextField Skeleton Loader
    Loader,
  });

  return useMemo(
    () => (
      <>
        {fields.map((field, i) => {
          const validState = errors && field.name === errors.field && errors;

          /* eslint-disable no-case-declarations */
          switch (field.type) {
            case FieldType.TEXT:
              const { inputType, ...fieldData } = field;
              const autoComplete = FieldAutoComplete[inputType];

              return (
                <TextField
                  variant='outlined'
                  className={classes.fieldStyle}
                  inputRef={register}
                  key={i}
                  fullWidth
                  error={!!validState}
                  helperText={validState && validState.errorMessage}
                  autoComplete={autoComplete}
                  {...fieldData}
                  type={inputType}
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
          /* eslint-enable no-case-declarations */
        })}
      </>
    ),
    [fields, errors, classes.fieldStyle, register],
  );
}
