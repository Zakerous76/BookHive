import { createSlice } from "@reduxjs/toolkit"
import userServices from "../services/userServices"
import { bookhiveUserToken } from "../utils/constants"

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser } = userSlice.actions

export const initializeUser = () => {
  return async (dispatch) => {
    const userToken = window.localStorage.getItem(bookhiveUserToken)
    dispatch(setUser(userToken))
  }
}

export const loginUser = (credentials) => {
  return async (dispatch) => {
    const response = await userServices.login(credentials)
    if (response.token) {
      dispatch(setUser({ ...credentials, token: response.token }))
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

export default userSlice.reducer
