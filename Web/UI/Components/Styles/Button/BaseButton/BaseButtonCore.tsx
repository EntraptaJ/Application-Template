// Web/UI/Components/Styles/Button/BaseButton/BaseButtonCore.tsx
import React, { PropsWithChildren, useMemo } from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { useStyles } from './Styles';
import clsx from 'clsx';

export interface BaseButtonProps extends ButtonProps {
  label: string;
  submit?: boolean;
  mainColor?: 'red' | 'green';
}

export default function BaseButtonCore({
  submit,
  label,
  children,
  className,
  ...props
}: PropsWithChildren<BaseButtonProps>): React.ReactElement {
  const classes = useStyles(props);

  return (
    <Button
      {...props}
      type={submit ? 'submit' : props.type}
      className={clsx(classes.button, className)}
    >
      {children}
      {label}
    </Button>
  );
}
