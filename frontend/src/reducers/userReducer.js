import { createSlice } from "@reduxjs/toolkit"
import userServices from "../services/userServices"
import { bookhiveUserToken } from "../utils/constants"
import { useSelector } from "react-redux"

const userSlice = createSlice({
  name: "user",
  initialState: { user: null, token: null },
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    toggleFavoriteAction(state, action) {
      const bookId = action.payload.bookId
      const book = action.payload.book
      const isFavorite = action.payload.isFavorite
      isFavorite
        ? state.user?.favorites?.filter((b) => b.bookId !== bookId)
        : state.user?.favorites?.push(book)
    },
  },
})

export const { setUser, toggleFavoriteAction } = userSlice.actions

export const initializeUser = () => {
  return async (dispatch) => {
    const userToken = window.localStorage.getItem(bookhiveUserToken)
    const user = await userServices.getUser(userToken)

    dispatch(setUser({ user, token: userToken }))
  }
}

export const loginUser = (credentials) => {
  return async (dispatch) => {
    const response = await userServices.login(credentials)
    if (response.token) {
      dispatch(setUser(response))
      window.localStorage.setItem(bookhiveUserToken, response.token)
    }
    return response
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem(bookhiveUserToken)
    dispatch(setUser(null))
  }
}

export const toggleFavorite = (book, userId, isFavorite) => {
  return async (dispatch) => {
    const bookId = book.bookId
    dispatch(toggleFavoriteAction({ book, bookId, isFavorite }))
    isFavorite
      ? await userServices.addFavorite(book._id, userId)
      : await userServices.removeFavorite(book._id, userId)
  }
}

export default userSlice.reducer
