import axios from "axios"
import reviewServices from "./reviewServices"
const baseURL = "/api/user"

let token = null
let config = null
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
  config = {
    headers: { authorization: token },
  }
}

const login = async (credentials) => {
  try {
    const token = (await axios.post(`${baseURL}/login`, credentials)).data
    reviewServices.setToken(token.token)
    return token
  } catch (error) {
    return error
  }
}

const createUser = async (userInfo) => {
  try {
    const response = await axios.post(`${baseURL}/create`, userInfo)
    return response.data
  } catch (error) {
    if (error.response?.data?.code === 11000) {
      const keyValue = error.response.data.keyValue
      const [key, value] = Object.entries(keyValue)[0] // extract first key-value pair
      return { error: "Duplicate error", key, value }
    }
    return error
  }
}

const getUser = async (userToken) => {
  setToken(userToken)
  const response = await axios.get(baseURL, config)
  if (response.status == 200) {
    return response.data
  }
  console.log(response)
  return null
}

export default {
  login,
  createUser,
  getUser,
}
