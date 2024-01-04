import {createTheme} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: '#37474F',
      dark: '#37474F',
      light: '#90A4AE',
      contrastText: '#FCFCFC',
    },
    secondary: {
      main: '#689F38',
      dark: '#33691E',
      light: '#9CCC65',
    },
    error: {
      main: '#D32F2F',
      dark: '#B71C1C',
      light: '#EF5350',
    },
    background: '#FCFCFC',
  },
  typography: {
    h1: {
      fontFamily: 'Roboto Mono',
      fontWeight: 100,
      fontSize: '20px',
      '@media (min-width:600px)': {
        fontSize: '28px',
      },
    },
    body1: {
      fontFamily: 'Roboto',
      fontWeight: 100,
      fontSize: '13px',
      '@media (min-width:600px)': {
        fontSize: '16px',
      },
    },
    body2: {
      fontFamily: 'Roboto',
      fontWeight: 100,
      fontSize: '11px',
      '@media (min-width:600px)': {
        fontSize: '14px',
      },
    },
    button: {
      fontFamily: 'Roboto',
      fontWeight: 'medium',
      fontSize: '10px',
      '@media (min-width:600px)': {
        fontSize: '13px',
      },
    }
  }
});

export default theme;