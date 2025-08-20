import Grid from "@mui/material/Grid"
import BookCard from "./BookCard"
import Card from "@mui/material/Card"

const BooksList = ({ booksList, target = null }) => {
  if (!booksList) {
    return (
      <Card
        sx={{
          width: "400px",
          maxWidth: 1200,
          display: "flex",
          justifyContent: "center",
        }}
      >
        Couldn't fetch books...
      </Card>
    )
  }

  return (
    <Grid spacing={3} sx={{ px: 2, maxWidth: 1200 }}>
      {booksList.map((book) => (
        <BookCard book={book} key={book.bookId} target={target} />
      ))}
    </Grid>
  )
}

export default BooksList
