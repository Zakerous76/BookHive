import axios from "axios"
const baseURL = "/api/book"

const getBookCount = async () => {
  try {
    const bookCount = (await axios.get(`${baseURL}/book-count`)).data
    return bookCount
  } catch (error) {
    console.log(error)
    return { error: "could not fetch book count:", status: error.status }
  }
}

const getPopularBooks = async () => {
  try {
    const popularBooks = (await axios.get(`${baseURL}/popular-books`)).data
    return popularBooks
  } catch (error) {
    console.log(error)
    return { error: "could not fetch popular books:", status: error.status }
  }
}

const getAllBooks = async (page = 1, limit = 25) => {
  try {
    const allBooks = (
      await axios.get(`${baseURL}/all-books?page=${page}&limit=${limit}`)
    ).data

    return allBooks
  } catch (error) {
    console.log(error)
    return { error: "could not fetch all books:", status: error.status }
  }
}

const getBook = async (bookId) => {
  try {
    const book = (await axios.get(`${baseURL}/${bookId}`)).data
    return book
  } catch (error) {
    console.log(error)
    return { error: "could not fetch book:", status: error.status }
  }
}

export default {
  getAllBooks,
  getBook,
  getBookCount,
  getPopularBooks,
}
