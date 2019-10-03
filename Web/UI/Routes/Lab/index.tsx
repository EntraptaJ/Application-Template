// Web/UI/Routes/Lab/index.tsx
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { BaseList } from 'UI/Components/Styles/List/BaseList';
import { LabelListItem } from 'UI/Components/Styles/List/ListItems/LabelListItem';
import { Form } from 'UI/Components/Styles/Form';
import {
  FieldType,
  TextFieldInputType,
} from 'UI/Components/Styles/Form/useFields';

interface FormData {
  username: string;
}

export default function LabRoute(): React.ReactElement {
  const handleSubmit = (data: FormData) => console.log(data);

  return (
    <>
      <Typography variant='h1'>Labs</Typography>

      <BaseList subheader={{ title: 'Hello World' }}>
        <LabelListItem label={{ primary: 'Item 1' }} />
        <Form
          title={
            <Typography variant='h4' align='center'>
              Lab
            </Typography>
          }
          onSubmit={handleSubmit}
          fields={[
            {
              type: FieldType.TEXT,
              inputType: TextFieldInputType.USERNAME,
              name: 'username',
              label: 'Username',
            },
            {
              type: FieldType.SELECT,
              name: 'select',
              label: 'Testing',
              items: [
                { value: 'A1', label: 'Hello' },
                { value: 'A2', label: 'Hello2' },
              ],
            },
          ]}
        />
      </BaseList>
    </>
  );
}
