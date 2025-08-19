import React, { useEffect } from "react"
import { useMatch } from "react-router-dom"
import bookServices from "../services/bookServices"
import { useDispatch, useSelector } from "react-redux"
import { setActiveBook } from "../reducers/booksReducer"

const BookPage = () => {
  const bookId = useMatch("/book/:bookId").params.bookId
  const dispatch = useDispatch()

  // Get the active book from Redux
  const book = useSelector((state) => state.books.activeBook)

  // Load the book if not loaded or if the ID changed
  useEffect(() => {
    if (!book || Number(book.bookId) !== Number(bookId)) {
      dispatch(setActiveBook(bookId))
    }
  }, [bookId, book, dispatch])

  if (!book) return <div>Loading book...</div>
  console.log(book)
  return (
    <div>
      <h1>a</h1>
      <h1>{book.title}</h1>
      <p>{book.authors?.map((a) => a.name).join(", ")}</p>
      <img src={book.formats["image/jpeg"]} alt={book.title} />

      <p>{book.summaries?.[0]}</p>
    </div>
  )
}

export default BookPage
