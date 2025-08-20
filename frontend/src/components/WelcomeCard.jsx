import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { useSelector } from "react-redux"
import BeesBackground from "../shared-theme/BeesBackground"

const WelcomeCard = () => {
  const totalBooks = useSelector(({ books }) => books.totalBooks)
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        component="h1"
        variant="h1"
        sx={{ fontSize: "4rem", textAlign: "center" }}
      >
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
        variant="em"
        sx={{ mt: "0.5rem", fontSize: "1rem", fontStyle: "italic" }}
      >
        Your #1 Stop for downloading free e-books
      </Typography>
      <Typography
        variant="p"
        sx={{
          pt: "30px",
          fontSize: "1rem",
          width: "70%",
          textAlign: "center",
        }}
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
      <Typography
        variant="p"
        sx={{ mt: "4rem", fontSize: "1.5rem", textAlign: "center" }}
      >
        Total books in the library{" "}
        <Typography
          variant="span"
          sx={(theme) => ({
            display: "block",
            fontWeight: "1000",
            fontSize: "2rem",
            color:
              theme.palette.mode === "dark"
                ? "gold" // lighter glow on dark
                : "#ffb300ff", // deeper gold on light
          })}
        >
          {totalBooks}
        </Typography>
      </Typography>
    </Box>
  )
}

export default WelcomeCard
