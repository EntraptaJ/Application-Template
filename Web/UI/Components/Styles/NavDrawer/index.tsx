// Web/UI/Components/Styles/NavDrawer/index.tsx
import React, { useMemo } from 'react';
import { useNavState } from 'UI/Components/Providers/NavProvider';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { useStyles } from 'UI/Components/Styles';
import { AppRoutes } from 'UI/Components/Router/AppRoutes';
import { generateList } from 'UI/Components/Router/generateList';

export function NavDrawer(): React.ReactElement {
  const { navOpen, toggleNav } = useNavState();
  const classes = useStyles({});

  const routes = useMemo(() => generateList(AppRoutes), [AppRoutes])

  return useMemo(
    () => (
      <SwipeableDrawer
        open={navOpen || false}
        onOpen={toggleNav}
        className={classes.drawer}
        onClose={toggleNav}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        {...routes}
      </SwipeableDrawer>
    ),
    [navOpen],
  );
}
