import { createSlice } from "@reduxjs/toolkit"
import userServices from "../services/userServices"

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

export const loginUser = (credentials) => {
  return async (dispatch) => {
    console.log("Credentials: ", credentials)
    const response = await userServices.login(credentials)
    if (response.token) {
      dispatch(setUser({ ...credentials, token: response.token }))
    }
    return response
  }
}

export default userSlice.reducer
