const reviewRouter = require("express").Router()
const Review = require("../models/review")

reviewRouter.get("/", async (req, res) => {
  try {
    const reviews = await Review.find({})
    return res.status(200).json(reviews)
  } catch (error) {
    return res.status(404).json(error)
  }
})

reviewRouter.post("/create", async (req, res) => {
  const payload = req.body
  const review = new Review(payload)
  try {
    const savedReview = await review.save()
    return res.status(201).json(savedReview)
  } catch (error) {
    return res.status(400).json(error)
  }
})

module.exports = reviewRouter
