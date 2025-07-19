import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MapPage from "./pages/MapPage";
import ProfilePage from "./pages/ProfilePage";
import { AppStoreProvider } from "./state/contexts/AppStoreProvider";

// 1. Create MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // MUI default blue
    },
    secondary: {
      main: "#dc004e", // MUI default pink
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});
//continue with real time functionality in section 6
function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* Normalize CSS */}
      <CssBaseline />
      {/* Router Setup */}
      <AppStoreProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<PrivateRoute />}>
            <Route path="/map" element={<MapPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </AppStoreProvider>
    </ThemeProvider>
  );
}

export default App;
