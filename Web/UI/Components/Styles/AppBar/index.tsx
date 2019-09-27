// Web/UI/Components/Styles/AppBar/index.tsx
import React, { useMemo } from 'react';
import TopAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './Styles';

export function AppBar(): React.ReactElement {
  const classes = useStyles({});

  return useMemo(
    () => (
      <>
        <TopAppBar position='fixed' className={classes.appBar}>
          <Toolbar>
            <div id='navActions'>
              <></>
            </div>
            <Typography variant='h6' className={classes.title}>
              AppName
            </Typography>
          </Toolbar>
        </TopAppBar>
        <div className={classes.toolbar} />
      </>
    ),
    [],
  );
}
