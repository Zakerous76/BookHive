import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { logoutUser } from "../reducers/userReducer"
import { Button, Stack, Typography } from "@mui/material"

const SignOutUser = () => {
  const dispatch = useDispatch()
  dispatch(logoutUser())

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
        Thank you for trying BookHive.
      </Typography>
      <Typography variant="h4" gutterBottom textAlign={"center"}>
        Please sign in (again)!
      </Typography>
      <Typography variant="body1" textAlign={"center"}>
        Wishing you a great life {`<3`}
      </Typography>
      <Button
        component={Link}
        to="/sign-in"
        color="primary"
        variant="outlined"
        size="large"
        sx={{ mt: "20px" }}
      >
        Sign in
      </Button>
    </Stack>
  )
}

export default SignOutUser
