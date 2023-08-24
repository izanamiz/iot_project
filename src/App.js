import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Main from "./pages/Main";
import { useState } from "react";
import { darkTheme, lightTheme } from "./configs";
import MenuAppBar from "./components/MenuAppBar";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />

      <MenuAppBar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      <Main />
    </ThemeProvider>
  );
}

export default App;
