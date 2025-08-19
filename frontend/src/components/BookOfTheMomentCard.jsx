import Box from "@mui/material/Box"

import Typography from "@mui/material/Typography"
import { useSelector } from "react-redux"
import BookCard from "./BookCard"

const BookOfTheMomentCard = () => {
  const books = useSelector(({ books }) => {
    return books.mostPopularBooks
  })
  let bookOfTheMoment

  if (books) {
    bookOfTheMoment = books[Math.floor(Math.random() * books.length)]
  }

  if (!bookOfTheMoment) {
    return <div></div>
  }

  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
      })}
    >
      <Box display={"inherit"} flexDirection={"inherit"}>
        <Typography variant="h2" sx={{ textAlign: "center" }}>
          Book of the Moment
        </Typography>
        <Box
          sx={{
            mt: "1rem",
            fontStyle: "italic",
            color: "inherit",
            textDecoration: "none",
            fontWeight: "normal",
            letterSpacing: "normal",
            transition: "transform 0.5s ease, letter-spacing 0.3s ease",
            display: "inline-block", // needed for transform to work properly
            "&:hover": {
              transform: "scale(1.05)",
              color: "gold",
            },
            textAlign: "center",
          }}
        >
          Discover Something Unexpected{" "}
        </Box>
      </Box>
      <Box
        sx={{
          textDecoration: "none",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <BookCard book={bookOfTheMoment} key={bookOfTheMoment.bookId} />
      </Box>
    </Box>
  )
}

export default BookOfTheMomentCard
