// Web/UI/Components/Styles/Theme/index.tsx
import { createMuiTheme } from '@material-ui/core/styles';
import { red, blue, indigo } from '@material-ui/core/colors';

// Create a theme instance.
export const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: indigo,
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  overrides: {
    MuiDrawer: {
      modal: {
        // @ts-ignore
        zIndex: `1200 !important` as number,
      },
    },
  },
});
