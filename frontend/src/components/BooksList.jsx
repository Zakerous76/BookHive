import Grid from "@mui/material/Grid"
import React from "react"
import BookCard from "./BookCard"

const BooksList = ({ booksList, target = null }) => {
  console.log("target:", target)

  return (
    <Grid spacing={3} sx={{ px: 2, maxWidth: 1200 }}>
      {booksList.map((book) => (
        <BookCard book={book} key={book.bookId} target={target} />
      ))}
    </Grid>
  )
}

export default BooksList
