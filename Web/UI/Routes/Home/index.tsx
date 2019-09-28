// Web/UI/Routes/Home/index.tsx
import React, { useState, useCallback } from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'UI/Components/Styles/Link';
import BaseButtonCore from 'UI/Components/Styles/Button/BaseButton/BaseButtonCore';

export default function HomeRoute(): React.ReactElement {
  const [enabled, setEnabled] = useState<boolean>(false);

  const handleToggle = useCallback(() => setEnabled((state) => !state), [
    setEnabled,
  ]);

  return (
    <>
      <Typography variant='h4'>Home Route</Typography>
      <BaseButtonCore
        label={enabled ? 'Disable' : 'Enable'}
        onClick={handleToggle}
      />
      <Link to='/Test' label='Testing' preloadOnHover={enabled} />
      <Link to='/Example' label='Example' preloadOnHover={enabled} />
    </>
  );
}
