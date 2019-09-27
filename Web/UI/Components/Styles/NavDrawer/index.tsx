// Web/UI/Components/Styles/NavDrawer/index.tsx
import React, { useMemo } from 'react';
import { useNavState } from 'UI/Components/Providers/NavProvider';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { useStyles } from 'UI/Components/Styles';

export function NavDrawer(): React.ReactElement {
  const { navOpen, toggleNav } = useNavState();
  const classes = useStyles({});

  return useMemo(
    () => (
      <SwipeableDrawer
        open={navOpen}
        onOpen={toggleNav}
        className={classes.drawer}
        onClose={toggleNav}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
      </SwipeableDrawer>
    ),
    [navOpen],
  );
}
