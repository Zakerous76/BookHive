import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { useSelector } from "react-redux"
import { hoverTransition } from "../shared-theme/themePrimitives"

import { Link as MuiLink } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"

const WelcomeCard = () => {
  const totalBooks = useSelector(({ books }) => books.totalBooks)
  const isLoggedIn = useSelector(({ user }) => (user ? true : false))

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        zIndex: 10,
      }}
    >
      {/* Title */}
      <Typography
        component="h1"
        variant="h1"
        sx={{ fontSize: "4rem", textAlign: "center" }}
      >
        Welcome to{" "}
        <Typography
          component="span"
          variant="h1"
          sx={(theme) => ({
            fontFamily: "Satisfy",
            fontWeight: "1000",
            fontSize: "4rem",
            color: theme.palette.mode === "dark" ? "gold" : "#ffb300ff",
            textShadow: `
            0 0 0px ${"#f2b62bff"},
            0 0 30px ${"#f6ba2b"},
            0 0 60px ${"#fac447ff"}
          `,
          })}
        >
          BookHive!
        </Typography>
      </Typography>

      {/* Tagline */}
      <Typography
        component="em"
        sx={{ mt: "0.5rem", fontSize: "1rem", fontStyle: "italic" }}
      >
        Your #1 Stop for downloading free e-books
      </Typography>

      {/* Intro paragraph */}
      <Typography
        component="p"
        variant="body1"
        sx={{
          pt: "30px",
          fontSize: "1rem",
          width: "70%",
          textAlign: "center",
        }}
      >
        Here at{" "}
        <Typography
          component="span"
          sx={(theme) => ({
            fontFamily: "Satisfy",
            fontWeight: "1000",
            color: theme.palette.mode === "dark" ? "gold" : "#ffb300ff",
            textShadow: `
            0 0 0px ${"#f2b62bff"},
            0 0 15px ${"#f6ba2b"},
            0 0 30px ${"#fac447ff"}
          `,
          })}
        >
          BookHive
        </Typography>
        , our mission is to make literature accessible to everyone. Whether
        you’re diving into epic adventures, rediscovering your favorite novels,
        or simply browsing for inspiration, thanks to{" "}
        <MuiLink
          href="https://www.gutenberg.org/"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            fontStyle: "italic",
            ...hoverTransition,
            textDecoration: "underline",
          }}
        >
          Project Gutenberg
        </MuiLink>
        , we’ve designed a space that’s simple, free, and welcoming — just like
        a buzzing hive of knowledge.
      </Typography>

      {/* Sign In prompt */}
      {!isLoggedIn && (
        <Typography component="p" variant="body1" mt={4}>
          Please{" "}
          <MuiLink
            component={RouterLink}
            to="/sign-in"
            underline="hover"
            sx={{ ...hoverTransition, textDecoration: "underline" }}
          >
            Sign In
          </MuiLink>{" "}
          to review or mark books as favorites!
        </Typography>
      )}

      {/* Total books */}
      <Typography
        component="p"
        sx={{ mt: "4rem", fontSize: "1.5rem", textAlign: "center" }}
      >
        Total books in the library{" "}
        <Typography
          component="span"
          sx={(theme) => ({
            display: "block",
            fontWeight: "1000",
            fontSize: "2rem",
            color: theme.palette.mode === "dark" ? "gold" : "#ffb300ff",
          })}
        >
          {totalBooks}
        </Typography>
      </Typography>
    </Box>
  )
}

export default WelcomeCard
