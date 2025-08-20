import GitHubIcon from "@mui/icons-material/GitHub"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { Link } from "react-router-dom"
import IconButton from "@mui/material/IconButton"
import XIcon from "@mui/icons-material/X"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import { useColorScheme } from "@mui/material/styles"

const Footer = () => {
  const { mode, setMode } = useColorScheme()
  return (
    <Box
      component="footer"
      sx={(theme) => ({
        py: 2,
        mt: "auto",
        borderTop: `1px solid ${theme.palette.divider}`,
        backgroundColor: mode === "light" ? "lightgray" : "default",
      })}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          {/* Left: Logo/Name */}
          <Typography
            component={Link}
            variant="h6"
            sx={(theme) => ({
              fontFamily: "'Satisfy', cursive",
              textDecoration: "none",
              color:
                theme.palette.mode === "dark"
                  ? "gold" // lighter glow on dark
                  : "#ffb300ff", // deeper gold on light
              textShadow: `
                  0 0 0px ${"#f2b62bff"},
                  0 0 30px ${"#f6ba2b"},
                  0 0 60px ${"#fac447ff"}
                `,
              "&:hover": {
                transform: "scale(1.05)",
              },
              transition: "transform 0.3s ease, letter-spacing 0.3s ease",
            })}
          >
            BookHive
          </Typography>

          {/* Middle: Nav Links */}
          <Stack direction="row" spacing={3}>
            <Link
              ro="#"
              underline="hover"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              About
            </Link>
            <Link
              ro="#"
              underline="hover"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              Contact
            </Link>
            <Link
              ro="#"
              underline="hover"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              Privacy
            </Link>
          </Stack>

          {/* Right: Social Icons */}
          <Stack direction="row" spacing={1}>
            <IconButton
              href="https://github.com"
              target="_blank"
              rel="noopener"
              size="small"
            >
              <GitHubIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              href="https://twitter.com"
              target="_blank"
              rel="noopener"
              size="small"
            >
              <XIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              href="https://linkedin.com"
              target="_blank"
              rel="noopener"
              size="small"
            >
              <LinkedInIcon fontSize="inherit" />
            </IconButton>
          </Stack>
        </Stack>

        {/* Bottom: Copyright */}
        <Typography
          variant="caption"
          sx={{
            display: "block",
            mt: 2,
            textAlign: "center",
            fontSize: "10px",
            mr: "30px",
          }}
        >
          © {new Date().getFullYear()} BookHive. All rights reserved.
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer
