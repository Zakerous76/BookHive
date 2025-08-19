import { createSlice } from "@reduxjs/toolkit"
import bookServices from "../services/bookServices"

const booksSlice = createSlice({
  name: "books",
  initialState: {
    totalBooks: null,
    mostPopularBooks: null,
    activeBook: null,
    view: "grid",
  },
  reducers: {
    setTotalBooks(state, action) {
      state.totalBooks = action.payload
    },
    setMostPopularBooks(state, action) {
      state.mostPopularBooks = action.payload
    },
    setBooks(state, action) {
      return action.payload
    },
    setActiveBookAction(state, action) {
      state.activeBook = action.payload
    },
    setView(state, action) {
      state.view = action.payload
    },
  },
})

export const {
  setTotalBooks,
  setBooks,
  setMostPopularBooks,
  setActiveBookAction,
  setView,
} = booksSlice.actions

export const initializeBooks = () => {
  return async (dispatch) => {
    const totalBooks = (await bookServices.getBookCount()).totalBooks
    const mostPopularBooks = await bookServices.getPopularBooks()
    dispatch(setBooks({ totalBooks, mostPopularBooks }))
  }
}

export const setActiveBook = (bookId) => {
  return async (dispatch) => {
    const book = await bookServices.getBook(bookId)
    dispatch(setActiveBookAction(book))
  }
}

export default booksSlice.reducer
