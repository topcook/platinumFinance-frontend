//Your theme for the new stuff using material UI has been copied here so it doesn't conflict
import { createMuiTheme } from '@material-ui/core/styles';

const newTheme = createMuiTheme({
  palette: {
    type: 'dark',
    text: {
      primary: '#ffffff',
    },
    background: {
      default: '#121212',
      paper: 'rgb(56 56 56 / 2%)',
    },
    primary: {
      light: '#757ce8',
      main: '#ffffff',
      dark: '#8A2BE2',
      contrastText: '#000',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    action: {
      disabledBackground: '#CDCDCD',
      active: '#000',
      hover: '#000',
    },
  },
  typography: {
    color: '#ffffff',
    fontFamily: ['"Poppins"', 'sans-serif'].join(','),
  },
});

export default newTheme;
