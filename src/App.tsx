import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useMemo, useState } from "react";
import { createTheme, PaletteMode, Paper, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import SingleProductPage from "./pages/SingleProductPage";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";
import ColorThemeContext from "./components/contextAPI/ColorThemeContext";
import customTheme from "./components/contextAPI/theme/customTheme";
import Header from "./components/header/Header";
import AboutUs from "./pages/AboutUs";
import Footer from "./components/footer/Footer";
import store from "./redux/store";
import LoginPage from "./pages/LoginPage";
import ProtectedAdminRoute from "./components/ProtectedRoute";
import ScrollToTopButton from "./components/ScrollToTopButton";

const App = () => {
  const [themeMode, setThemeMode] = useState<PaletteMode>("light");

  const colorThemeMode = () =>
    setThemeMode((prevMode: PaletteMode) =>
      prevMode === "light" ? "dark" : "light"
    );

  const theme = useMemo(() => createTheme(customTheme(themeMode)), [themeMode]);

  return (
    <BrowserRouter>
      <Provider store={store}>
        <ColorThemeContext.Provider value={colorThemeMode}>
          <ThemeProvider theme={theme}>
            <Paper sx={{ boxShadow: "none" }}>
              <h1 style={{ display: "none" }}>Redux Toolkit</h1>
              <Header />
              <ToastContainer />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/products/:id" element={<SingleProductPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/user-profile/:id" element={<UserPage />} />
                <Route path="/shopping-cart" element={<CartPage />} />
                <Route
                  path="/admin-dashboard"
                  element={<ProtectedAdminRoute Component={AdminPage} />}
                />
              </Routes>
              <Footer />
              <ScrollToTopButton />
            </Paper>
          </ThemeProvider>
        </ColorThemeContext.Provider>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
