import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import Divider from "@mui/material/Divider"
import FormLabel from "@mui/material/FormLabel"
import FormControl from "@mui/material/FormControl"
import { Link, useNavigate } from "react-router-dom"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import MuiCard from "@mui/material/Card"
import { styled } from "@mui/material/styles"
import ForgotPassword from "./ForgotPassword"
import AppTheme from "../shared-theme/AppTheme"
import { GoogleIcon, FacebookIcon, BookHiveIcon } from "./CustomIcons"
import { useState } from "react"
import ColorModeIconDropdown from "../shared-theme/ColorModeIconDropdown"
import userServices from "../services/userServices"

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}))

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}))

export default function SignUpPage(props) {
  window.scrollTo({ top: 0, behavior: "smooth" })

  const [usernameError, setUsernameError] = useState(false)
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("")
  const [emailError, setEmailError] = useState(false)
  const [emailErrorMessage, setEmailErrorMessage] = useState("")
  const [passwordError, setPasswordError] = useState(false)
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("")
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const userInfo = {
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
    }
    if (validateInputs()) {
      const response = await userServices.createUser(userInfo)
      if (response.error) {
        setPasswordError(true)
        setPasswordErrorMessage(
          `${response.key} "${response.value}" is already used...`
        )
      } else if (response.status > 399) {
        setPasswordError(true)
        setPasswordErrorMessage(`An error occured. Please try again later...`)
        console.log(response)
      } else {
        navigate("/sign-in")
      }
    }
  }

  const validateInputs = () => {
    const email = document.getElementById("email")
    const username = document.getElementById("username")
    const password = document.getElementById("password")

    let isValid = true

    if (!username.value || !/^[a-zA-Z0-9_]{3,20}$/.test(username.value)) {
      setUsernameError(true)
      setUsernameErrorMessage(
        "Please enter a valid username. \n(Must be 3-20 Characters) [numbers, letters, underscore]"
      )
      isValid = false
    } else {
      setUsernameError(false)
      setUsernameErrorMessage("")
    }

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true)
      setEmailErrorMessage("Please enter a valid email address.")
      isValid = false
    } else {
      setEmailError(false)
      setEmailErrorMessage("")
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true)
      setPasswordErrorMessage("Password must be at least 6 characters long.")
      isValid = false
    } else {
      setPasswordError(false)
      setPasswordErrorMessage("")
    }

    return isValid
  }

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignUpContainer direction="column" justifyContent="space-between">
        <ColorModeIconDropdown
          size="medium"
          sx={{ position: "fixed", top: "1rem", right: "1rem" }}
        />
        <Card variant="outlined">
          <BookHiveIcon />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Join us!
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>
              <TextField
                error={usernameError}
                helperText={usernameErrorMessage}
                id="username"
                type="text"
                name="username"
                placeholder="your_username"
                autoComplete="username"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={"primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                required
                fullWidth
                variant="outlined"
                color={emailError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>

            <ForgotPassword open={open} handleClose={handleClose} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Sign Up
            </Button>
          </Box>
          <Divider>or</Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() =>
                alert("Sign up with Google not yet implemented 🙏")
              }
              startIcon={<GoogleIcon />}
            >
              Sign up with Google{"  "}
              <Typography
                component="em"
                sx={{ width: "25%", fontSize: ".5rem", color: "gray" }}
              >
                (To be implemented)
              </Typography>
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() =>
                alert("Sign up with Google not yet implemented 🙏")
              }
              startIcon={<FacebookIcon />}
            >
              Sign up with Facebook{" "}
              <Typography
                component="em"
                sx={{ width: "25%", fontSize: ".5rem", color: "gray" }}
              >
                (To be implemented)
              </Typography>
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              You already have an account? <Link to="/sign-in">Sign in</Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  )
}
