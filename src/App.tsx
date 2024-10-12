import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useMemo, useState, lazy, Suspense, useEffect } from "react";
import { createTheme, PaletteMode, Paper, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import ColorThemeContext from "./components/contextAPI/ColorThemeContext";
import customTheme from "./components/contextAPI/theme/customTheme";
import store from "./redux/store";
import LoadingPage from "./pages/LoadingPage";

import './App.css'
// Lazily load components
const Home = lazy(() => import("./pages/Home"));
const ScrollToTopButton = lazy(() => import("./components/ScrollToTopButton"));


const App = () => {
  const [themeMode, setThemeMode] = useState<PaletteMode>("light");
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    // After the transition delay, set transitioning to false
    const transitionTimeout = setTimeout(() => {
      setTransitioning(false);
    }, 300); // 300 milliseconds = 0.3 seconds

    return () => clearTimeout(transitionTimeout);
  }, [themeMode]);

  const colorThemeMode = () =>
    setThemeMode((prevMode: PaletteMode) =>
      prevMode === "light" ? "dark" : "light"
    );

  const theme = useMemo(() => createTheme(customTheme(themeMode)), [themeMode]);

  return (
    // <Home />
    <BrowserRouter>
      <Provider store={store}>
        <ColorThemeContext.Provider value={colorThemeMode}>
          <ThemeProvider theme={theme}>
            <Paper  className='site-font'
              sx={{
                minHeight: "100vh",
              }}
            >
              <ToastContainer />
              <Suspense fallback={<LoadingPage />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="*" element={<Home />} />
                </Routes>
              </Suspense>
              <ScrollToTopButton />
            </Paper>
          </ThemeProvider>
        </ColorThemeContext.Provider>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
