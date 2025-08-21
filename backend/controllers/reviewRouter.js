const reviewRouter = require("express").Router()
const Review = require("../models/review")
const jwt = require("jsonwebtoken")
const JWT_SECRET = require("../utils/config").JWT_SECRET
const User = require("../models/user")
const Book = require("../models/book")
const { getTokenFrom } = require("../utils/getTokenFrom")
const decodeToken = require("../utils/jwtVerification")

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

    const decodedToken = decodeToken(req)
    if (!decodedToken) {
      return res.status(401).json({ error: "token invalid" })
    }
    const user = await User.findById(decodedToken.userId)

    if (!user) {
      return res.status(400).json({ error: "userId missing or invalid" })
    }
    const userId = user._id

    const newReview = {
      bookId: body.bookId,
      userId,
      rating: body.rating,
      text: body.text,
    }

    console.log("userId:", decodedToken.userId)

    const savedReview = await Review.updateOne(
      {
        userId,
        bookId: body.bookId,
      },
      { $set: newReview },
      { upsert: true, new: true }
    )

    if (savedReview.upsertedId) {
      await Promise.all([
        Book.updateOne(
          { bookId: body.bookId },
          { $addToSet: { reviews: savedReview.upsertedId } }
        ),
        User.updateOne(
          { _id: userId },
          { $addToSet: { reviews: savedReview.upsertedId } }
        ),
      ])
    }

    return res.status(201).json(savedReview)
  } catch (error) {
    return res.status(400).json(error)
  }
})

module.exports = reviewRouter
