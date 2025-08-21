import React from "react"
import Stack from "@mui/material/Stack"
import { styled } from "@mui/material/styles"

// Styled Container component
const Container = styled(Stack)(({ theme }) => ({
  position: "relative",
  minHeight: "100vh",

  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(40, 30%, 97%), hsl(40, 30%, 98%))",

    backgroundRepeat: "no-repeat",
    ...theme.applyStyles?.("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}))

// Main component
const BackgroundContainer = ({ children, ...props }) => {
  return <Container {...props}>{children}</Container>
}

export default BackgroundContainer
