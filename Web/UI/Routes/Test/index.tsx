// Web/UI/Routes/TestRoute/index.tsx
import React, { useCallback } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default function TestRoute(): React.ReactElement {
  const test = 1;
  const handleClick = useCallback(() => {
    console.log(`I've been clicked\nTest: ${test}`);
  }, []);

  return (
    <>
      <Typography variant='h4'>Test Route</Typography>
      <Button variant='contained' color='primary' onClick={handleClick}>
        Click Me
      </Button>
    </>
  );
}
