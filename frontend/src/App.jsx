import React, { useEffect, useState } from "react"
import AppTheme from "./shared-theme/AppTheme"
import CssBaseline from "@mui/material/CssBaseline"
import { Route, Routes, useLocation } from "react-router-dom"
import BackgroundContainer from "./components/BackgroundContainer"
import SignInPage from "./components/SignInPage"
import SignUpPage from "./components/SignUpPage"
import HomePage from "./components/HomePage"
import AllBooksPage from "./components/AllBooksPage"
import MostPopularBooksPage from "./components/MostPopularBooksPage"
import UserPage from "./components/UserPage"
import About from "./components/About"
import NavigationBar from "./components/NavigationBar"

const App = (props) => {
  const [user, setUser] = useState(null)
  const location = useLocation()
  const hideNavbarRoutes = ["/sign-in", "/sign-up"]
  const shouldHideNavbar = !hideNavbarRoutes.includes(location.pathname)

  return (
    <AppTheme {...props}>
      {shouldHideNavbar && <NavigationBar />}
      <CssBaseline enableColorScheme />

      <BackgroundContainer>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/all-books" element={<AllBooksPage />} />
          <Route path="/popular-books" element={<MostPopularBooksPage />} />
          <Route path="/book/:id" element={<MostPopularBooksPage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BackgroundContainer>
    </AppTheme>
  )
}

export default App
