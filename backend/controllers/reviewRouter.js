const reviewRouter = require("express").Router()
const Review = require("../models/review")
const jwt = require("jsonwebtoken")
const JWT_SECRET = require("../utils/config").JWT_SECRET
const User = require("../models/user")
const Book = require("../models/book")

const getTokenFrom = (request) => {
  const authorization = request.get("authorization")
  console.log("authorization: ", authorization)
  if (authorization && authorization.startsWith("Bearer")) {
    return authorization.replace("Bearer ", "").trim()
  }
  return null
}

reviewRouter.get("/all-reviews", async (req, res) => {
  try {
    const reviews = await Review.find({})
    return res.status(200).json(reviews)
  } catch (error) {
    return res.status(404).json(error)
  }
})

reviewRouter.get("/:bookId", async (req, res) => {
  const bookId = req.params.bookId
  if (!bookId) {
    return res.status(404).json({ error: "provide a bookId Parameter plz" })
  }
  try {
    const reviews = await Review.find({ bookId }).populate("userId", "username")
    return res.status(200).json(reviews)
  } catch (error) {
    return res.status(404).json(error)
  }
})

reviewRouter.post("/create", async (req, res) => {
  try {
    const body = req.body
    const decodedToken = jwt.verify(getTokenFrom(req), JWT_SECRET)

    if (!decodedToken.userId) {
      return res.status(401).json({ error: "token invalid" })
    }

    const user = await User.findById(decodedToken.userId)

    if (!user) {
      return res.status(400).json({ error: "userId missing or invalid" })
    }

    const newReview = {
      bookId: body.bookId,
      userId: user._id,
      rating: body.rating,
      text: body.text,
    }

    console.log("userId:", decodedToken.userId)

    const savedReview = await Review.updateOne(
      {
        userId: body.userId,
        bookId: body.bookId,
      },
      { $set: newReview },
      { upsert: true }
    )
    console.log("SavedReview:", savedReview)

    if (savedReview.upsertedId) {
      const theBook = await Book.findOne({ bookId: body.bookId })
      theBook.reviews.push(savedReview.upsertedId)
      await theBook.save()
    }
    return res.status(201).json(savedReview)
  } catch (error) {
    return res.status(400).json(error)
  }
})

module.exports = reviewRouter
