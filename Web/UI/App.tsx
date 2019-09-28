// Web/UI/App.tsx
import React from 'react';
import { ThemeProvider } from '@material-ui/styles';

import { theme } from 'UI/Components/Styles/Theme';
import AppRouter from './Components/Router';
import { CssBaseline } from '@material-ui/core';
import { NavProvider } from './Components/Providers/NavProvider';
import { useImport } from './Components/Providers/ImportProvider';

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
    <ThemeProvider theme={theme}>
      <NavProvider>
        <AppBar />
        <NavDrawer />
      </NavProvider>

      <main
        style={{
          height: '100%',
        }}
      >
        <AppRouter />
      </main>
      <CssBaseline />
    </ThemeProvider>
  );
}
