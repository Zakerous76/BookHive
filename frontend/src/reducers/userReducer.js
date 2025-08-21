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
    console.log("userToken:", userToken)
    const user = await userServices.getUser(userToken)
    dispatch(setUser(user))
  }
}

export const loginUser = (credentials) => {
  return async (dispatch) => {
    const response = await userServices.login(credentials)
    console.log("response:", response)
    if (response.token) {
      console.log("credentials:", credentials)
      dispatch(setUser(response))
      window.localStorage.setItem(bookhiveUserToken, response.token)
    }
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem(bookhiveUserToken)
    dispatch(setUser(null))
  }
}

export default userSlice.reducer
