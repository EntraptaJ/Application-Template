// Web/UI/Routes/Home/index.tsx
import React, { useState, useCallback, useMemo } from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'UI/Components/Styles/Link';
import BaseButtonCore from 'UI/Components/Styles/Button/BaseButton/BaseButtonCore';
import { useSession } from 'UI/Components/Providers/Session/SessionProvider';
import { UserRole } from 'UI/GraphQL/graphqlTypes.gen';
import { useToken } from 'UI/Components/Providers/Session/useToken';
import { useIsAuthorized } from 'UI/Components/Providers/Session/useIsAuthorized';

export default function HomeRoute(): React.ReactElement {
  const [enabled, setEnabled] = useState<boolean>(false);
  const { deleteToken } = useToken();

  const handleToggle = useCallback(() => setEnabled((state) => !state), [
    setEnabled,
  ]);

  const isAuthorized = useIsAuthorized([UserRole.Admin]);

  const AuthText = useMemo(() => (isAuthorized ? 'Authed' : 'Not Authed'), [
    isAuthorized,
  ]);

  return (
    <>
      <Typography variant='h4'>Home Route</Typography>
      <Typography>{AuthText}</Typography>
      <BaseButtonCore
        label={enabled ? 'Disable' : 'Enable'}
        onClick={deleteToken}
      />
      <Link to='/Test' label='Testing' preloadOnHover={enabled} />
      <Link to='/Example' label='Example' preloadOnHover={enabled} />
    </>
  );
}
