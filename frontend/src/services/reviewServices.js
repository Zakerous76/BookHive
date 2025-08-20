import axios from "axios"
const baseURL = "/api/review"

let token = null
let config = null
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
  config = {
    headers: { authorization: token },
  }
}

const addReview = async (bookId, text, rating, userToken) => {
  const newReview = {
    bookId,
    rating,
    text,
  }
  try {
    setToken(userToken)
    const response = await axios.post(`${baseURL}/create`, newReview, config)
    return response.status
  } catch (error) {
    console.log(error)
  }
}

export default {
  addReview,
  setToken,
}
