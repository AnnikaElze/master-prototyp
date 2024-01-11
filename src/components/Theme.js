import {createTheme} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: '#606060',
      light: '#E6E6E6',
      dark: '#2E2E2E',
    },
    secondary: {
      main: '#689F38',
    },
    error: {
      main: '#D32F2F',
    },
    background: '#262626',
  },
  typography: {
    h1: {
      color: '#E6E6E6',
      fontFamily: 'UniversLTStd-BoldCn',
      fontSize: '20px',
      '@media (min-width:600px)': {
        fontSize: '28px',
      },
    },
    body1: {
      fontFamily: 'UniversLTStd-Light',
      color: '#E6E6E6',
      fontSize: '13px',
      '@media (min-width:600px)': {
        fontSize: '16px',
      },
    },
    button: {
      fontFamily: 'UniversLTStd-Light',
      color: '#E6E6E6',
      fontSize: '13px',
      '@media (min-width:600px)': {
        fontSize: '16px',
      },
    }
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: "#606060"
          }
        }
      }
    },
  }
});

export default theme;