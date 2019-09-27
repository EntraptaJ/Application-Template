// Web/UI/App.tsx
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import { theme } from 'UI/Components/Styles/Theme';
import AppRouter from './Components/Router';
import { AppBar } from './Components/Styles/AppBar';
import { CssBaseline } from '@material-ui/core';
import { NavProvider } from './Components/Providers/NavProvider';
import { NavDrawer } from './Components/Styles/NavDrawer';

export function App(): React.ReactElement {
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
