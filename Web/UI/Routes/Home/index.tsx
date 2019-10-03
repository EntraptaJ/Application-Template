// Web/UI/Routes/Home/index.tsx
import Typography from '@material-ui/core/Typography';
import React, { useCallback, useState } from 'react';
import BaseButtonCore from 'UI/Components/Styles/Button/BaseButton/BaseButtonCore';
import { Link } from 'UI/Components/Styles/Link';

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
