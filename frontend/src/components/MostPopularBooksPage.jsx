import { useState } from "react"
import Box from "@mui/material/Box"
import ImageList from "@mui/material/ImageList"
import ImageListItem from "@mui/material/ImageListItem"
import ImageListItemBar from "@mui/material/ImageListItemBar"
import ListSubheader from "@mui/material/ListSubheader"
import Stack from "@mui/material/Stack"
import IconButton from "@mui/material/IconButton"
import Card from "@mui/material/Card"
import Grid from "@mui/material/Grid"

import { useSelector } from "react-redux"
import GridViewIcon from "@mui/icons-material/GridView"
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline"
import Pagination from "@mui/material/Pagination"
import Container from "@mui/material/Container"
import BookCard from "./BookCard"
import BooksList from "./BooksList"
import BooksGrid from "./BooksGrid"

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
          <BooksGrid booksList={paginatedBooks} />
        ) : (
          <BooksList booksList={paginatedBooks} />
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
