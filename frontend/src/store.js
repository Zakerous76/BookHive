import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./reducers/userReducer"
import booksReducer from "./reducers/booksReducer"

const store = configureStore({
  reducer: {
    user: userReducer,
    books: booksReducer,
  },
})

export default store
