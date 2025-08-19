import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import React from "react"

const WelcomeCard = () => {
  return (
    <Box
      sx={{
        display: "flex",
        mt: "80px",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography component="h1" variant="h1" sx={{ fontSize: "4rem" }}>
        Welcome to
        <Typography
          component="span"
          variant="h1"
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
      </Typography>
      <Typography
        component="caption"
        variant="em"
        sx={{ fontSize: "1rem", fontStyle: "italic" }}
      >
        Your #1 Stop for downloading free e-books
      </Typography>
      <Typography
        component="caption"
        variant="p"
        sx={{ pt: "30px", fontSize: "1rem", width: "70%" }}
      >
        Here at
        <Typography
          variant="span"
          sx={(theme) => ({
            fontFamily: "Satisfy",
            fontWeight: "1000",
            color:
              theme.palette.mode === "dark"
                ? "gold" // lighter glow on dark
                : "#ffb300ff", // deeper gold on light
            textShadow: `
                  0 0 0px ${"#f2b62bff"},
                  0 0 15px ${"#f6ba2b"},
                  0 0 30px ${"#fac447ff"}
                `,
          })}
        >
          {" "}
          BookHive
        </Typography>
        , our mission is to make literature accessible to everyone. Whether
        you’re diving into epic adventures, rediscovering your favorite novels,
        or simply browsing for inspiration, thanks to{" "}
        <Typography
          component="a"
          variant="b"
          href="https://www.gutenberg.org/"
          sx={{ fontStyle: "italic" }}
        >
          Project Gutenberg
        </Typography>
        , we’ve designed a space that’s simple, free, and welcoming — just like
        a buzzing hive of knowledge.
      </Typography>
    </Box>
  )
}

export default WelcomeCard
