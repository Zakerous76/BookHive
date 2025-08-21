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
import Card from "@mui/material/Card"

import { Link as MuiLink, TextareaAutosize, useTheme } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { hoverTransition } from "../shared-theme/themePrimitives"

const ReviewsSection = ({ book, dispatch, setActiveBook, userToken }) => {
  const [newReview, setNewReview] = useState("")
  const [rating, setRating] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const theme = useTheme()

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
          <Box mb={4}>
            <TextareaAutosize
              minRows={3}
              maxRows={6}
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Write a review..."
              style={{
                width: "100%",
                padding: "16.5px",
                fontSize: "1rem",
                fontFamily: "inherit",
                backgroundColor: "hsla(0, 0%, 91%, 0.08)", // 👈 same as Card
                border: `1px solid ${theme.palette.divider}`, // 👈 matches TextField
                borderRadius: theme.shape.borderRadius, // 👈 your theme’s radius
                resize: "none", // optional: prevent dragging
                boxSizing: "border-box",
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
          <Card sx={{ mb: 4 }}>
            <Typography component="p" variant="body1">
              Please{" "}
              <MuiLink
                component={RouterLink}
                to="/sign-in"
                underline="hover"
                sx={{ ...hoverTransition, textDecoration: "underline" }}
              >
                Sign In
              </MuiLink>{" "}
              to add or edit a review!
            </Typography>
          </Card>
        )}
      </Box>
    </Box>
  )
}

export default ReviewsSection
