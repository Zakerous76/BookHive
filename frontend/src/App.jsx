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
import NavigationBar from "./components/NavigationBar"
import { useDispatch } from "react-redux"
import { initializeUser } from "./reducers/userReducer"
import { initializeBooks } from "./reducers/booksReducer"
import BookPage from "./components/BookPage"
import { useEffect } from "react"
import Footer from "./components/Footer"
import BeesBackground from "./shared-theme/BeesBackground"
import AboutPage from "./components/AboutPage"
import ContactPage from "./components/ContactPage"

const App = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBooks())
  }, [dispatch])

  const location = useLocation()
  const hideNavbarRoutes = ["/sign-in", "/sign-up"]
  const shouldHideNavbar = !hideNavbarRoutes.includes(location.pathname)

  return (
    <AppTheme {...props}>
      {shouldHideNavbar && <NavigationBar />}
      <CssBaseline enableColorScheme />
      <BeesBackground />

      <BackgroundContainer>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/all-books" element={<AllBooksPage />} />
          <Route path="/popular-books" element={<MostPopularBooksPage />} />
          <Route path="/book/:bookId" element={<BookPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </BackgroundContainer>

      <Footer />
    </AppTheme>
  )
}

export default App
