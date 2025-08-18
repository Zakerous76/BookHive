const userRouter = require("express").Router()
const bcrypt = require("bcrypt")
const User = require("../models/user")

userRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("reviews")
  return res.status(200).json(users)
})

userRouter.get("/:id", async (req, res) => {
  const userId = req.params.id
  try {
    const user = await User.find({ _id: userId }).populate("reviews")
    return res.status(200).json(user)
  } catch (error) {
    return res.status(404).json(error)
  }
})

userRouter.post("/create", async (req, res) => {
  const { username, email, password } = req.body

  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({
    username,
    email,
    passwordHash,
  })

  try {
    const savedUser = await user.save()
    res.status(201).json(savedUser)
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = userRouter
