import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Link from "@mui/material/Link"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
const AboutCard = () => {
  return (
    <Stack
      spacing={4}
      sx={{
        mx: "auto",
        textAlign: "center",
        px: 2,
      }}
    >
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        About
      </Typography>
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            flex: "1",

            alignContent: "center",
          }}
        >
          <Typography
            component="span"
            variant="h2"
            sx={(theme) => ({
              fontFamily: "Satisfy",
              fontWeight: "1000",
              fontSize: "4rem",
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
            {" "}
            BookHive!
          </Typography>
        </Box>
        <Box sx={{ flex: "1", textAlign: "justify" }}>
          <Typography variant="body1" sx={{ lineHeight: "1.5rem" }}>
            <strong>BookHive</strong> is your #1 stop for free e-books, powered
            by{" "}
            <Link
              href="https://www.gutenberg.org/"
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
            >
              Project Gutenberg
            </Link>{" "}
            and the Gutendex API. With a clean, minimal design, BookHive makes
            it easy to{" "}
            <em>browse, download, and enjoy thousands of classics</em> — from
            Austen and Dickens to Shakespeare and Shelley.
          </Typography>

          <Typography variant="body1" mt={"10px"}>
            Create an account to ⭐ <strong>save favorites</strong> and 💬{" "}
            <strong>leave reviews</strong>, or just dive in and start exploring
            instantly.
          </Typography>
        </Box>
      </Box>
    </Stack>
  )
}

export default AboutCard
