import axios from "axios"
const baseURL = "/api/user"

const login = async (credentials) => {
  try {
    const response = await axios.post(`${baseURL}/login`, credentials)
    return response.data
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

export default {
  login,
  createUser,
}
