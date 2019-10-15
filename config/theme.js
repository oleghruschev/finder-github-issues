import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  fontFamily: {
    sansSerif: '-apple-system, "Helvetica Neue", Arial, sans-serif',
  },
  palette: {
    primary: { main: '#015965' },
    secondary: { main: '#03899C' },
    light: { main: '#5FC0CE' },
    text: { main: '#0c191b' },
  },
});

export default theme;
