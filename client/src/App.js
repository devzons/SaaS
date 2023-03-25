import { Routes, Route } from "react-router-dom"
import { useMemo } from "react"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { createTheme } from "@mui/material/styles"
import { themeSettings } from "./theme"
import Navbar from "./components/Navbar"
import HomePage from "./components/pages/HomePage"
import LoginPage from "./components/pages/LoginPage"
import RegisterPage from "./components/pages/RegisterPage"

function App() {
  const theme = useMemo(() => createTheme(themeSettings()), [])
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
        </Routes>
      </ThemeProvider>
    </div>
  )
}

export default App
