import { Stack, Typography, Link, Box } from "@mui/material"
import { hoverTransition } from "../shared-theme/themePrimitives"

const ContactPage = () => {
  return (
    <Stack
      spacing={3}
      sx={{
        height: "100vh", // full viewport height
        px: 2,
        textAlign: "center",
        display: "flex",
        justifyContent: "center", // vertical centering
        alignItems: "center", // horizontal centering
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={(theme) => ({
          fontWeight: "1000",
          fontSize: "4rem",
        })}
      >
        Contact{" "}
        <Typography
          variant="h1"
          component="span"
          sx={(theme) => ({
            fontFamily: "Satisfy",
            fontWeight: "1000",
            fontSize: "5rem",
            color:
              theme.palette.mode === "dark"
                ? "gold" // lighter glow on dark
                : "#ffb300ff", // deeper gold on light
            textShadow: `
                  0 0 0px ${"#f2b62bff"},
                  0 0 30px ${"#f6ba2b"},
                  0 0 60px ${"#fac447ff"}
                `,
          })}
        >
          Me
        </Typography>
      </Typography>

      <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
        You can reach me through:
      </Typography>

      <Stack direction="column" spacing={1} alignItems="center">
        <Link
          href="mailto:m.z.humayoon@example.com"
          underline="hover"
          sx={{
            fontWeight: "500",
            "&:hover": {
              transform: "scale(1.05)",
              transition: "all 0.2s ease",
            },
          }}
        >
          Email
        </Link>

        <Link
          href="https://www.linkedin.com/in/zaker-amin/"
          underline="hover"
          sx={{
            fontWeight: "500",
            "&:hover": {
              transform: "scale(1.05)",
              transition: "all 0.2s ease",
            },
          }}
        >
          LinkedIn
        </Link>

        <Link
          href="https://www.instagram.com/mzakeramin"
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          sx={{
            fontWeight: "500",
            "&:hover": {
              transform: "scale(1.05)",
              transition: "all 0.2s ease",
            },
          }}
        >
          Instagram
        </Link>
      </Stack>
    </Stack>
  )
}

export default ContactPage
