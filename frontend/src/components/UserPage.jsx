import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import List from "@mui/material/List"
import ListItemText from "@mui/material/ListItemText"

import ListItem from "@mui/material/ListItem"

import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import ListSubheader from "@mui/material/ListSubheader"
import Stack from "@mui/material/Stack"
import BooksGrid from "./BooksGrid"

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material"

const UserPage = () => {
  window.scrollTo({ top: 0, behavior: "smooth" })

  const userData = useSelector(({ user }) => user.user)
  const navigate = useNavigate()

  if (!userData) {
    return (
      <Stack
        sx={{
          minHeight: "100vh", // full screen height
          mt: "150px",
          mb: "50px",
          display: "flex",
          alignItems: "center", // horizontal center
          px: 2,
          mx: "auto", // center horizontally on wide screens
          textAlign: "center",
        }}
      >
        <Box sx={{ margin: "0 ", padding: 4, mt: "100px", maxWidth: "800px" }}>
          <Typography variant="h4" gutterBottom textAlign={"center"}>
            Please sign in.
          </Typography>
        </Box>
      </Stack>
    )
  }

  return (
    <Stack
      sx={{
        minHeight: "100vh",
        mt: "150px",
        mb: "50px",
        display: "flex",
        alignItems: "center",
        px: 2,
        mx: "auto",
        textAlign: "center",
      }}
    >
      <Typography variant="h1" gutterBottom>
        Profile
      </Typography>

      <TableContainer component={Paper} sx={{ maxWidth: 600, my: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <b>Username</b>
              </TableCell>
              <TableCell>{userData.username}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Email</b>
              </TableCell>
              <TableCell>{userData.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Role</b>
              </TableCell>
              <TableCell>{userData.role}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Total Reviews</b>
              </TableCell>
              <TableCell>{userData?.reviews?.length || 0}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Total Favorite Books</b>
              </TableCell>
              <TableCell>{userData?.favorites?.length || 0}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

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

      <Typography variant="h4" gutterBottom>
        Your Favorite Books
      </Typography>
      <List>
        {userData?.favorites?.length ? (
          <BooksGrid
            booksList={userData.favorites}
            cardHeight={"200px"}
            summaryLimit={250}
          />
        ) : (
          <ListSubheader>No favorite books</ListSubheader>
        )}
      </List>
      <Divider sx={{ my: 4, borderBottomWidth: 4, width: "100%" }} />
      <Typography variant="h4" gutterBottom>
        Your Reviews
      </Typography>
      <List>
        {userData.reviews?.length ? (
          userData?.reviews?.map((review) => (
            <ListItem key={review._id} sx={{ borderBottom: "1px solid #ddd" }}>
              <ListItemText
                primary={review.text}
                secondary={
                  <>
                    Rating: {review.rating} ⭐ |{" "}
                    <Link
                      to={`/book/${review.bookId}`}
                      style={{
                        color: "inherit",
                        fontSize: ".7rem",
                        textDecoration: "underline",
                      }}
                    >
                      Book ID: {review.bookId}
                    </Link>
                  </>
                }
              />
            </ListItem>
          ))
        ) : (
          <ListSubheader>No reviews yet</ListSubheader>
        )}
      </List>
    </Stack>
  )
}

export default UserPage
