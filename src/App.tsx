
import {CssBaseline} from "@mui/material/";
import { ThemeProvider } from "@mui/material";

import './App.css'
import Home from './Page/Home'
import { useThemeContext } from './them/ThemeContextProvider'


function App() {

  const { theme } = useThemeContext();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    
      <Home />

    </ThemeProvider>
  )
}

export default App
