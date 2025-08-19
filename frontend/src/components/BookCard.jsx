import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import React from "react"

const BookCard = ({ book }) => {
  return (
    <Grid
      key={book.id}
      sx={{
        px: 2,
        mt: 5,
        width: "100%",
        maxWidth: "1000px",
        "&:hover": {
          transform: "scale(1.05)",
          color: "gold",
        },
        transition: "transform 0.3s ease, letter-spacing 0.3s ease",
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          height: "350px",
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
              {book.summaries?.[0]?.slice(0, 500)}...
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
    </Grid>
  )
}

export default BookCard
