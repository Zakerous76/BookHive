const bookRouter = require("express").Router()
const Book = require("../models/book")
const axios = require("axios")
const GUTENDEX_API = require("../utils/config").GUTENDEX_API

let popularCache = null
let popularCacheTimestamp = null

const initializeBookCount = async (req, res) => {
  try {
    const count = await Book.countDocuments({})
    console.log(count, " books in the DB")
    return count
  } catch (error) {
    console.error("Error counting books:", error)
  }
}
let booksCount = initializeBookCount()
let booksCountTimestamp

bookRouter.get("/book-count", async (req, res) => {
  try {
    const isCacheValid =
      booksCountTimestamp &&
      Date.now() - booksCountTimestamp < 1000 * 60 * 60 * 24 * 29

    if (isCacheValid) {
      return res.status(200).json({ totalBooks: booksCount })
    }

    const count = await Book.countDocuments({})
    booksCount = count
    booksCountTimestamp = Date.now()
    console.log("booksCount cache is updated:", booksCount)
    return res.status(200).json({ totalBooks: count })
  } catch (error) {
    console.error("Error counting books:", error)
    return res.status(500).json({ error: "Failed to count books" })
  }
})

// Get top 100 books
bookRouter.get("/popular-books", async (req, res) => {
  try {
    const isCacheValid =
      popularCache &&
      Date.now() - popularCacheTimestamp < 1000 * 60 * 60 * 24 * 30

    if (isCacheValid) {
      return res.status(200).json(popularCache)
    }

    const books = await Book.find({}).sort({ download_count: -1 }).limit(100)
    popularCacheTimestamp = Date.now()

    popularCache = books
    return res.status(200).json(books)
  } catch (error) {
    console.error("Error fetching popular books:", error)
    return res.status(500).json({ error: "Failed to fetch popular books" })
  }
})

// Get all books in the DB
bookRouter.get("/all-books", async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 50

  const skip = (page - 1) * limit

  const allBooks = await Book.find({})
    .sort({ title: 1 })
    .skip(skip)
    .limit(limit)
  return res.json(allBooks)
})

bookRouter.get("/search", async (req, res) => {
  const query = req.query.q
  if (!query) {
    return res.status(400).json({ error: "Missing search query" })
  }

  try {
    const regex = new RegExp(query, "i") // case-insensitive
    const books = await Book.find({
      $or: [
        { title: regex },
        { "authors.name": regex },
        { "translators.name": regex },
        { subjects: regex },
      ],
    }).limit(50)

    return res.status(200).json(books)
  } catch (error) {
    console.error("Error searching books:", error)
    return res.status(500).json({ error: "Failed to search books" })
  }
})

// Get the details of the book with bookId
bookRouter.get("/:bookId", async (req, res) => {
  const bookId = req.params.bookId
  try {
    const book = await Book.findOne({ bookId }).populate({
      path: "reviews",
      populate: {
        path: "userId",
        select: "username",
      },
    })
    if (book) {
      return res.status(200).json(book)
    }
    return res.status(404).json({ error: `Book with id "${bookId}" not found` })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: `An error occured`, error })
  }
})

// Updates the existing DB's entries' download_counts
// If the entry is not in the DB, it is added.
// TODO: this should run once a month
bookRouter.post("/update-db", async (req, res) => {
  try {
    let requestString = `${GUTENDEX_API}/books`
    let insertedCount = 0
    let updatedCount = 0

    while (true) {
      let response = (await axios.get(requestString)).data
      let results = response.results.map((element) => ({
        ...element,
        bookId: element.id, // must keep gutendex id under a clear field
      }))

      // Using bulkWrite for upsert (insert if not exist, update if exist)
      const ops = results.map((book) => ({
        updateOne: {
          filter: { bookId: book.bookId },
          update: { $set: book },
          upsert: true,
        },
      }))

      const bulkResult = await Book.bulkWrite(ops, { ordered: false })
      insertedCount += bulkResult.upsertedCount
      updatedCount += bulkResult.modifiedCount

      console.log(
        `Processed page: inserted ${bulkResult.upsertedCount}, updated ${bulkResult.modifiedCount}`
      )

      if (!response.next) break
      requestString = response.next
    }

    return res.status(201).json({
      message: `Inserted ${insertedCount} books, updated ${updatedCount} books`,
    })
  } catch (error) {
    console.error("Error updating DB:", error)
    return res.status(500).json({ error: "Failed to update DB" })
  }
})

// Resets DB
bookRouter.post("/initialize-db", async (req, res) => {
  let page = 1
  let pageStr = page === 1 ? "" : `?page=${page}`

  try {
    await Book.deleteMany({})

    let requestString = `${GUTENDEX_API}/books${pageStr}`
    let response = (await axios.get(requestString)).data
    let insertedCount = 0
    let updatedCount = 0

    let results

    while (true) {
      results = response.results
      results.forEach((element) => {
        element.bookId = element.id
      })
      try {
        await Book.insertMany(results)
        insertedCount += results.length
        console.log("Books added:", insertedCount)
      } catch (error) {
        console.log("bookRouter.js 76:", error)
      }

      if (!response.next) break // stop when no more pages
      requestString = response.next
      response = (await axios.get(requestString)).data
    }

    return res.status(201).json({
      message: `Inserted ${insertedCount} books, updated ${updatedCount} books`,
    })
  } catch (error) {
    console.error("Error updating DB:", error)
    return res.status(500).json({ error: "Failed to update DB" })
  }
})

module.exports = bookRouter
