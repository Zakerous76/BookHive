import GitHubIcon from "@mui/icons-material/GitHub"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { Link } from "react-router-dom"
import IconButton from "@mui/material/IconButton"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import { useColorScheme } from "@mui/material/styles"
import { hoverTransition } from "../shared-theme/themePrimitives"

const technologies = [
  { name: "React", url: "https://reactjs.org/" },
  { name: "Redux", url: "https://redux.js.org/" },
  { name: "Node.js", url: "https://nodejs.org/" },
  { name: "Express", url: "https://expressjs.com/" },
  { name: "MongoDB", url: "https://www.mongodb.com/" },
]

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
            to="/"
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
              transition: "transform 0.1s ease, letter-spacing 0.1s ease",
            })}
          >
            BookHive
          </Typography>

          {/* Middle: Nav Links */}
          <Stack direction="row" spacing={3}>
            <Box
              component={Link}
              to="/all-books"
              sx={{
                color: "inherit",
                textDecoration: "inherit",
                ...hoverTransition,
              }}
            >
              All Books
            </Box>
            <Box
              component={Link}
              to="/popular-books"
              sx={{
                color: "inherit",
                textDecoration: "inherit",
                ...hoverTransition,
              }}
            >
              Most Popular Books
            </Box>

            <Box
              component={Link}
              to="/about"
              sx={{
                color: "inherit",
                textDecoration: "inherit",
                ...hoverTransition,
              }}
            >
              About
            </Box>
            <Box
              component={Link}
              to="/contact"
              sx={{
                color: "inherit",
                textDecoration: "inherit",
                ...hoverTransition,
              }}
            >
              Contact
            </Box>
          </Stack>

          {/* Right: Social Icons */}
          <Stack direction="row" spacing={1}>
            <IconButton
              href="https://github.com/zakerous76"
              target="_blank"
              rel="noopener"
              size="small"
            >
              <GitHubIcon fontSize="inherit" />
            </IconButton>

            <IconButton
              href="https://www.linkedin.com/in/zaker-amin/"
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
          variant="body2"
          color="text.secondary"
          textAlign="center"
          padding="1rem"
          paddingBottom="0"
        >
          Built with{" "}
          {technologies.map((tech, index) => (
            <span key={tech.name}>
              <Box
                component={"a"}
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "inherit",
                  textDecoration: "inherit",
                  fontWeight: "1000",
                  ...hoverTransition,
                }}
              >
                {tech.name}
              </Box>
              {index < technologies.length - 1 ? ", " : ", "}
            </span>
          ))}
          BookHive is a project by{" "}
          <Box
            component={"a"}
            href="https://github.com/Zakerous76"
            target="_blank"
            rel="noopener noreferrer"
            sx={(theme) => ({
              textDecoration: "inherit",
              fontWeight: "1000",
              color: "inherit",
              ...hoverTransition,
              "&:hover": {
                color: "red",
              },
            })}
          >
            <strong>zakerous76</strong>
          </Box>
          , inspired by the{" "}
          <Box
            component={"a"}
            href="https://fullstackopen.com/en/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "inherit",
              textDecoration: "inherit",
              fontWeight: "1000",
              ...hoverTransition,
            }}
          >
            <strong>FullStackOpen </strong>
          </Box>{" "}
          course and driven by a love for making literature accessible to
          everyone.
        </Typography>
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
