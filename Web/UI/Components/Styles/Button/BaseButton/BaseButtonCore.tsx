// Web/UI/Components/Styles/Button/BaseButton/BaseButtonCore.tsx
import React, { PropsWithChildren, CSSProperties } from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';

export interface BaseButtonProps extends ButtonProps {
  label: string;
  mainColor?: 'red' | 'green';
  submit?: boolean;
}

export default function BaseButtonCore(
  props: PropsWithChildren<BaseButtonProps>,
): React.ReactElement {

  const { submit, children, label } = props;
  return (
    <Button
      {...props}
      type={submit ? 'submit' : undefined}
      style={{ ...props.style }}
    >
      {children}
      {label}
    </Button>
  );
}
