import Card from "@mui/material/Card"
import ImageList from "@mui/material/ImageList"
import ImageListItem from "@mui/material/ImageListItem"
import ImageListItemBar from "@mui/material/ImageListItemBar"
import ListSubheader from "@mui/material/ListSubheader"
import React from "react"
import { Link } from "react-router-dom"

const BooksGrid = ({ booksList, target }) => {
  return (
    <Card sx={{ width: "95%", maxWidth: 1200 }}>
      <ImageList sx={{ px: 2 }} cols={3} gap={16}>
        <ImageListItem key="subheader" cols={3}>
          <ListSubheader component="div">
            This month's most downloaded books
          </ListSubheader>
        </ImageListItem>
        {booksList.map((book) => (
          <ImageListItem
            component={target ? "a" : Link}
            href={target ? `/book/${book.bookId}` : ``}
            to={target ? "" : `/book/${book.bookId}`}
            target={target}
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
  )
}

export default BooksGrid
