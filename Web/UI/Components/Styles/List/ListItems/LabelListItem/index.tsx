// Web/UI/Components/Styles/List/ListItems/LabelListItem/index.tsx
import React, { PropsWithChildren, useCallback } from 'react';
import { BaseListItemProps, BaseListItem } from '../BaseListItem';
import ListItemText from '@material-ui/core/ListItemText';

interface LabelListItemText {
  primary: string;
  secondary?: string;
}

interface LabelListItemProps extends BaseListItemProps {
  preLabel?: React.ReactElement;
  label: LabelListItemText;
}

export function LabelListItem({
  children,
  preLabel,
  label,
  ...props
}: PropsWithChildren<LabelListItemProps>): React.ReactElement {
  const Label = useCallback(() => <ListItemText {...label} />, [label]);

  return (
    <BaseListItem {...props}>
      {preLabel}
      <Label />
      {children}
    </BaseListItem>
  );
}
