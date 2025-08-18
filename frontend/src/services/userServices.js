import axios from "axios"
const baseURL = "/api/user"

const login = async (credentials) => {
  try {
    const response = await axios.post(`${baseURL}/login`, credentials)
    console.log("response.data", response.data)
    return response.data
  } catch (error) {
    console.log("error:", error)
    return error
  }
}

export default {
  login,
}
