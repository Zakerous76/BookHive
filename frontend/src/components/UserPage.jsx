import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import List from "@mui/material/List"
import ListItemText from "@mui/material/ListItemText"

import ListItem from "@mui/material/ListItem"

import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { ListSubheader, Stack } from "@mui/material"

const UserPage = () => {
  window.scrollTo({ top: 0, behavior: "smooth" })

  const userData = useSelector(({ user }) => user)
  const navigate = useNavigate()

  setTimeout(() => {
    if (!userData) {
      return (
        <Box sx={{ margin: "0 ", padding: 4, mt: "100px", maxWidth: "800px" }}>
          <Typography variant="h4" gutterBottom textAlign={"center"}>
            Please sign in.
          </Typography>
        </Box>
      )
    }
  }, 2000)

  return (
    <Stack
      sx={{
        minHeight: "100vh", // full screen height
        mt: "200px",
        display: "flex",
        alignItems: "center", // horizontal center
        px: 2,
        mx: "auto", // center horizontally on wide screens
        textAlign: "center",
      }}
    >
      <Typography variant="h1" gutterBottom>
        Profile
      </Typography>

      <Typography variant="body1">
        <b>Username:</b> {userData?.username}
      </Typography>
      <Typography variant="body1">
        <b>Email:</b> {userData?.email}
      </Typography>
      <Typography variant="body1">
        <b>Role:</b> {userData?.role}
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        <b>Total Reviews:</b> {userData?.reviews?.length || 0}
      </Typography>

      <Button
        variant="contained"
        color="error"
        sx={{ mt: 2 }}
        onClick={() => {
          navigate("/sign-out")
        }}
      >
        Sign Out
      </Button>

      <Divider sx={{ my: 4, borderBottomWidth: 4, width: "100%" }} />

      <Typography variant="h5" gutterBottom>
        Your Favorite Books
      </Typography>
      <List>
        {userData?.favorites?.length ? (
          userData?.favorites?.map((review) => (
            <ListItem key={review._id} sx={{ borderBottom: "1px solid #ddd" }}>
              <ListItemText
                primary={review.text}
                secondary={`Rating: ${review.rating} ⭐ | Book: ${
                  review.bookId?.title ?? "Unknown"
                }`}
              />
            </ListItem>
          ))
        ) : (
          <ListSubheader>No favorite books</ListSubheader>
        )}
      </List>
      <Divider sx={{ my: 4, borderBottomWidth: 4, width: "100%" }} />
      <Typography variant="h5" gutterBottom>
        Your Reviews
      </Typography>
      <List>
        {userData?.reviews?.map((review) => (
          <ListItem key={review._id} sx={{ borderBottom: "1px solid #ddd" }}>
            <ListItemText
              primary={review.text}
              secondary={`Rating: ${review.rating} ⭐ | Book: ${
                review.bookId?.title ?? "Unknown"
              }`}
            />
          </ListItem>
        ))}
      </List>
    </Stack>
  )
}

export default UserPage
