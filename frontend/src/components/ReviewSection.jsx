import { useState } from "react"
import reviewServices from "../services/reviewServices"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Rating from "@mui/material/Rating"
import ListSubheader from "@mui/material/ListSubheader"

const ReviewsSection = ({ book, dispatch, setActiveBook, userToken }) => {
  const [newReview, setNewReview] = useState("")
  const [rating, setRating] = useState(0)
  const [submitting, setSubmitting] = useState(false)

  const handleAddReview = async () => {
    if (!newReview.trim() || rating === 0) return // require text and rating
    try {
      setSubmitting(true)
      await reviewServices.addReview(book.bookId, newReview, rating, userToken)
      setNewReview("")
      setRating(0)
      dispatch(setActiveBook(book.bookId)) // refresh book after adding review
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Box sx={{ maxWidth: 800, width: "100%" }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Reviews
      </Typography>
      {book.reviews?.length ? (
        <List>
          {book.reviews.map((review) => (
            <ListItem key={review._id} sx={{ borderBottom: "1px solid #ddd" }}>
              <ListItemText
                primary={review.text}
                secondary={
                  <>
                    <Rating value={review.rating || 0} readOnly size="small" />
                  </>
                }
              />
              <Typography variant="caption" sx={{}}>
                by {review.userId?.username}
              </Typography>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No reviews yet. Be the first to add one!
        </Typography>
      )}

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
        {/* Star Rating */}
        <Rating
          name="new-review-rating"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue)
          }}
        />

        {/* Review Text */}
        {userToken ? (
          <Box>
            <TextField
              fullWidth
              label="Write a review..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              multiline
              sx={{
                my: "auto",
              }}
            />

            {/* Submit Button */}
            <Button
              variant="outlined"
              onClick={handleAddReview}
              disabled={submitting || rating === 0}
            >
              {submitting ? "Posting..." : "Post"}
            </Button>
          </Box>
        ) : (
          <Typography variant="body2" color="text.secondary">
            Please sign in to add a review
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default ReviewsSection
