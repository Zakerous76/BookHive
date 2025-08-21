import React from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logoutUser } from "../reducers/userReducer"
import { Box, Stack, Typography } from "@mui/material"

const SignOutUser = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  setTimeout(() => {
    dispatch(logoutUser())
    navigate("/sign-in")
  }, 5000)
  return (
    <Stack
      sx={{
        minHeight: "100vh", // full screen height
        mt: "200px",
        display: "flex",
        alignItems: "center", // horizontal center
        px: 2,
        maxWidth: "800px",
        mx: "auto", // center horizontally on wide screens
        textAlign: "center",
      }}
    >
      <Typography variant="h1" gutterBottom textAlign={"center"}>
        Thank you for trying BookHive!
      </Typography>
      <Typography variant="h4" gutterBottom textAlign={"center"}>
        Please sign in (again)!
      </Typography>
      <Typography variant="body1" textAlign={"center"}>
        You are going to be redirected in 5 seconds to the Sign In page.
      </Typography>
    </Stack>
  )
}

export default SignOutUser
