import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import bookServices from "../services/bookServices"
import Container from "@mui/material/Container"
import Pagination from "@mui/material/Pagination"
import IconButton from "@mui/material/IconButton"
import GridViewIcon from "@mui/icons-material/GridView"
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline"
import Box from "@mui/material/Box"

import BooksGrid from "./BooksGrid"
import BooksList from "./BooksList"
import { setView } from "../reducers/booksReducer"

const AllBooksPage = () => {
  const totalBooks = useSelector(({ books }) => books.totalBooks)
  const [books, setBooks] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(30)
  const [totalPages, setTotalPages] = useState()
  let view = useSelector(({ books }) => books.view)
  const dispatch = useDispatch()
  window.scrollTo({ top: 0, behavior: "smooth" })

  useEffect(() => {
    setTotalPages(Math.floor(totalBooks / limit))
  }, [totalBooks, limit])

  useEffect(() => {
    const fn = async () => {
      const newBooksList = await bookServices.getAllBooks(page, limit)
      setBooks(newBooksList)
    }
    fn()
  }, [page, limit])

  return (
    <Container
      sx={{
        mt: "100px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "inherit",
          flexDirection: "inherit",
          alignItems: "inherit",
          mb: "30px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 3,
          }}
        >
          <IconButton
            onClick={() => dispatch(setView("grid"))}
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
            onClick={() => dispatch(setView("card"))}
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
        <Pagination
          count={totalPages}
          page={page}
          onChange={(event, value) => {
            setPage(value)
          }}
        />
        {view === "grid" ? (
          <BooksGrid booksList={books} target={"_blank"} />
        ) : (
          <BooksList booksList={books} target={"_blank"} />
        )}
      </Box>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(event, value) => {
          setPage(value)
        }}
      />
    </Container>
  )
}

export default AllBooksPage
