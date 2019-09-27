// Web/UI/App.tsx
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import { theme } from 'UI/Components/Styles/Theme';
import AppRouter from './Components/Router';
import { AppBar } from './Components/Styles/AppBar';
import { CssBaseline } from '@material-ui/core';

export function App(): React.ReactElement {
  return (
    <ThemeProvider theme={theme}>
      <AppBar />
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
