// Web/UI/App.tsx
import React from 'react';
import { ThemeProvider } from '@material-ui/styles';

import { theme } from 'UI/Components/Styles/Theme';
import AppRouter from './Components/Router';
import { CssBaseline } from '@material-ui/core';
import { NavProvider } from 'UI/Components/Providers/NavProvider';
import { useImport } from 'UI/Components/Providers/ImportProvider';
import { SessionProvider } from 'UI/Components/Providers/Session/SessionProvider';

export function App(): React.ReactElement {
  const AppBar = useImport({
    imported: import('UI/Components/Styles/AppBar/index'),
    path: 'Components/Styles/AppBar/index.tsx',
    Loader: () => <div>Loading</div>,
  });

  const NavDrawer = useImport({
    imported: import('UI/Components/Styles/NavDrawer/index'),
    path: 'Components/Styles/NavDrawer/index.tsx',
    Loader: () => <div>Loading</div>,
  });

  return (
    <SessionProvider>
      <ThemeProvider theme={theme}>
        <NavProvider>
          <AppBar />
          <NavDrawer />
        </NavProvider>

        <AppRouter />
        <CssBaseline />
      </ThemeProvider>
    </SessionProvider>
  );
}
