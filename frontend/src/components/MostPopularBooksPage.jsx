import { useState } from "react"
import Box from "@mui/material/Box"
import ImageList from "@mui/material/ImageList"
import ImageListItem from "@mui/material/ImageListItem"
import ImageListItemBar from "@mui/material/ImageListItemBar"
import ListSubheader from "@mui/material/ListSubheader"
import Stack from "@mui/material/Stack"
import IconButton from "@mui/material/IconButton"
import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"

import { useSelector } from "react-redux"
import GridViewIcon from "@mui/icons-material/GridView"
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline"
import Pagination from "@mui/material/Pagination"
import Container from "@mui/material/Container"
import BookCard from "./BookCard"

const MostPopularBooksPage = () => {
  const [view, setView] = useState("grid")
  let popularBooks = useSelector(({ books }) => books.mostPopularBooks)
  if (!popularBooks) popularBooks = []

  const [page, setPage] = useState(1)
  const itemsPerPage = view === "grid" ? 30 : 12

  const totalPages = Math.ceil(popularBooks.length / itemsPerPage)
  const paginatedBooks = popularBooks.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  return (
    <Container>
      <Stack
        sx={{
          mt: "100px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="h1" sx={{ mt: 2, mb: 2, textAlign: "center" }}>
          Most Popular Books of the Month
        </Box>

        {/* View Toggle Buttons */}
        <Box
          sx={{
            border: "1px solid #696969ff",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 3,
          }}
        >
          <IconButton
            onClick={() => setView("grid")}
            sx={(theme) => ({
              color:
                view === "grid"
                  ? theme.palette.primary.main
                  : theme.palette.default,
            })}
          >
            <GridViewIcon />
          </IconButton>
          <IconButton
            onClick={() => setView("card")}
            sx={(theme) => ({
              color:
                view === "card"
                  ? theme.palette.primary.main
                  : theme.palette.default,
            })}
          >
            <ViewHeadlineIcon />
          </IconButton>
        </Box>

        {/* Conditional Rendering for Grid or Card View */}
        {view === "grid" ? (
          <Card sx={{ width: "95%", maxWidth: 1200 }}>
            <ImageList sx={{ px: 2 }} cols={3} gap={16}>
              <ImageListItem key="subheader" cols={3}>
                <ListSubheader component="div">
                  This month's most downloaded books
                </ListSubheader>
              </ImageListItem>
              {paginatedBooks.map((book) => (
                <ImageListItem
                  key={book.bookId}
                  sx={{
                    "&:hover": {
                      transform: "scale(1.05)",
                      color: "gold",
                    },
                    transition: "transform 0.3s ease, letter-spacing 0.3s ease",
                  }}
                >
                  <img
                    srcSet={`${book.formats["image/jpeg"]}`}
                    src={`${book.formats["image/jpeg"]}`}
                    alt={book.title}
                    loading="lazy"
                  />
                  <ImageListItemBar
                    title={book.title}
                    subtitle={book.authors[0]?.name || "Unknown Author"}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Card>
        ) : (
          <Grid container spacing={3} sx={{ px: 2, maxWidth: 1200 }}>
            {paginatedBooks.map((book) => (
              <BookCard book={book} key={book.bookId} />
            ))}
          </Grid>
        )}
        <Box sx={{ mt: 4, mb: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(event, value) => setPage(value)}
            color="primary"
          />
        </Box>
      </Stack>
    </Container>
  )
}

export default MostPopularBooksPage
