import React, { useEffect, useState } from "react"
import AppTheme from "./shared-theme/AppTheme"
import CssBaseline from "@mui/material/CssBaseline"
import SignIn from "./components/SignIn"

const App = (props) => {
  const [user, setUser] = useState(null)

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignIn></SignIn>
    </AppTheme>
  )
}

export default App
