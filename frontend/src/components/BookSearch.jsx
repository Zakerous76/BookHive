import React, { useState } from "react"
import {
  TextField,
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  Link,
} from "@mui/material"
import bookServices from "../services/bookServices"

const BookSearch = () => {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])

  const handleSearch = async (e) => {
    const value = e.target.value
    setQuery(value)

    if (value.trim().length > 2) {
      const books = await bookServices.searchBooks(value)
      setResults(books)
    } else {
      setResults([])
    }
  }

  return (
    <Box sx={{ width: "100%", maxWidth: 600, mx: "auto", my: 4 }}>
      <TextField
        fullWidth
        label="Search books..."
        variant="outlined"
        value={query}
        onChange={handleSearch}
      />

      {results?.length > 0 && (
        <Paper sx={{ mt: 2, maxHeight: 400, overflow: "auto" }}>
          <List>
            {results.map((book) => (
              <ListItem
                component={Link}
                href={`/book/${book.bookId}`}
                color="inherit"
                key={book._id}
                divider
              >
                <ListItemText
                  primary={book.title}
                  secondary={book.authors?.map((a) => a.name).join(", ")}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  )
}

export default BookSearch
