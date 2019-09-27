import React, { useState, useCallback, useMemo } from 'react';
import Typography from '@material-ui/core/Typography';

export default function ExampleRoute(): React.ReactElement {
  const [enabled, setEnabled] = useState<boolean>(false);

  const toggleEnabled = useCallback(() => setEnabled((state) => !state), []);

  return (
    <div>
      <Typography variant='h2' onClick={toggleEnabled}>
        {enabled ? 'True' : 'False'}
      </Typography>
    </div>
  );
}
