import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import { Link } from "react-router-dom"

const BookCard = ({
  book,
  summaryLimit = 500,
  cardHeight = "350px",
  target = null,
}) => {
  return (
    <Box>
      <Card
        component={target ? "a" : Link}
        href={target ? `/book/${book.bookId}` : ``}
        to={target ? "" : `/book/${book.bookId}`}
        target={target}
        key={book.bookId}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          height: cardHeight,
          px: 2,
          mt: 5,
          width: "100%",
          maxWidth: "1000px",
          "&:hover": {
            transform: "scale(1.05)",
            color: "gold",
          },
          transition: "transform 0.3s ease, letter-spacing 0.3s ease",
          textDecoration: "inherit",
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: { xs: "100%", sm: 200 }, objectFit: "cover" }}
          image={book.formats["image/jpeg"]}
          alt={book.title}
        />
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <CardContent>
            <Typography variant="h6">{book.title}</Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {book.authors[0]?.name || "Unknown Author"}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {book.summaries?.[0]?.slice(0, summaryLimit)}...
            </Typography>
            <Typography
              variant="caption"
              sx={{ fontStyle: "italic", color: "lightgray", mt: "15px" }}
            >
              Downloaded {book.download_count} times
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  )
}

export default BookCard
