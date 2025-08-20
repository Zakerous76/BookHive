import React, { useEffect, useState } from "react"
import { useMatch } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setActiveBook } from "../reducers/booksReducer"
import bookServices from "../services/bookServices"

import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Stack from "@mui/material/Stack"
import DownloadLinks from "./DownloadLinks"

const BookPage = () => {
  const { bookId } = useMatch("/book/:bookId").params
  const dispatch = useDispatch()
  window.scrollTo({ top: 0, behavior: "smooth" })

  const book = useSelector((state) => state.books.activeBook)
  const [newReview, setNewReview] = useState("")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!book || Number(book.bookId) !== Number(bookId)) {
      dispatch(setActiveBook(bookId)) // assumes it fetches book + reviews
    }
  }, [bookId, book, dispatch])

  const handleAddReview = async () => {
    if (!newReview.trim()) return
    try {
      setSubmitting(true)
      await bookServices.addReview(bookId, { text: newReview })
      setNewReview("")
      // refresh book after adding review
      dispatch(setActiveBook(bookId))
    } finally {
      setSubmitting(false)
    }
  }
  console.log(book)

  if (!book || book.error)
    return <Typography variant="h4">loading...</Typography>

  return (
    <Stack
      gap={3}
      sx={{
        mt: "100px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: 2,
      }}
    >
      <Typography variant="h4">{book.title}</Typography>

      <CardMedia
        component="img"
        sx={{ width: { xs: "100%", sm: 250 }, objectFit: "cover" }}
        image={book.formats["image/jpeg"]}
        alt={book.title}
      />
      <DownloadLinks formats={book.formats} />

      {/* Book Info Card */}
      <Card sx={{ display: "flex", maxWidth: 1000, width: "100%", mb: 4 }}>
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h4">{book.title}</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {book.authors?.map((a) => a.name).join(", ") || "Unknown Author"}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, textAlign: "justify" }}>
            {book.summaries?.[0] || "No summary available."}
          </Typography>
          <Typography
            variant="caption"
            sx={{ fontStyle: "italic", color: "gray", mt: 2, display: "block" }}
          >
            Downloaded {book.download_count} times
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body2" color="text.secondary">
            Subjects: {book.subjects?.join(", ") || "—"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Languages: {book.languages?.join(", ") || "—"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Copyright: {book.copyright ? "Yes" : "No"}
          </Typography>
        </CardContent>
      </Card>

      {/* Reviews Section */}
      <Box sx={{ maxWidth: 800, width: "100%" }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Reviews
        </Typography>
        {book.reviews?.length ? (
          <List>
            {book.reviews.map((review) => (
              <ListItem
                key={review._id}
                sx={{ borderBottom: "1px solid #ddd" }}
              >
                <ListItemText primary={review.text} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No reviews yet. Be the first to add one!
          </Typography>
        )}

        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <TextField
            fullWidth
            label="Write a review..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            multiline
            minRows={2}
          />
          <Button
            variant="contained"
            onClick={handleAddReview}
            disabled={submitting}
          >
            {submitting ? "Posting..." : "Post"}
          </Button>
        </Box>
      </Box>
    </Stack>
  )
}

export default BookPage
