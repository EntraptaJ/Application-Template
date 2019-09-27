// Web/UI/Components/Styles/Button/BaseButton/index.tsx
import React from 'react';
import { useImport } from 'UI/Components/Providers/ImportProvider';
import { BaseButtonProps } from './BaseButtonCore';

export function BaseButton(props: BaseButtonProps): React.ReactElement {
  const Button = useImport({
    imported: import('UI/Components/Styles/Button/BaseButton/BaseButtonCore'),
    path: 'Components/Styles/Button/BaseButton/BaseButtonCore.tsx',
    Loader: () => <div>Loading</div>,
  });
  
  return <Button {...props} />;
}
