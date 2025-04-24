// theme.js
import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
      paper: '#fff',
    },
   
  },
 
});

export const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#03fc52',
      },
      background: {
        default: '#121212',
        paper: '#1e1e1e',
      },
      text: {
        primary: '#ffffff',
        secondary: '#cccccc',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          body {
            background-color: #121212;
            color: #ffffff;
            min-height: 100vh;
          }
          :root {
            color-scheme: dark;
          }
        `
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: '#1e1e1e'
          }
        }
      }
    }
  });
  
