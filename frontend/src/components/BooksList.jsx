import Grid from "@mui/material/Grid"
import BookCard from "./BookCard"
import Card from "@mui/material/Card"

const BooksList = ({
  booksList,
  target = null,
  cardHeight = "350px",
  summaryLimit = 500,
}) => {
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
        <BookCard
          book={book}
          key={book.bookId}
          target={target}
          cardHeight={cardHeight}
          summaryLimit={summaryLimit}
        />
      ))}
    </Grid>
  )
}

export default BooksList
