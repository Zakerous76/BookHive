const userRouter = require("express").Router()
const bcrypt = require("bcrypt")
const User = require("../models/user")

const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../utils/config")
const decodeToken = require("../utils/jwtVerification")

userRouter.post("/login", async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ username })
      .populate("reviews")
      .populate("favorites")
    if (!user) {
      return res.status(404).json({ error: `"${username}" not found` })
    }
    const passwordHash = user.passwordHash

    const isPasswordCorrect = await bcrypt.compare(password, passwordHash)
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: `Provided password is not correct` })
    }
    const userForToken = { username, userId: user.id, email: user.email }
    const token = jwt.sign(userForToken, JWT_SECRET)
    console.log(`Welcome, ${username}!`)
    return res.status(200).json({ user, token })
  } catch (error) {
    return res.status(404).json({ error: `${error}` })
  }
})

userRouter.get("/", async (req, res) => {
  const decodedToken = decodeToken(req)
  if (!decodedToken) {
    return res.status(401).json({ error: "token invalid" })
  }
  try {
    const user = await User.findById(decodedToken.userId)
      .populate("reviews")
      .populate("favorites")
    if (!user) {
      return res.status(400).json({ error: "userId missing or invalid" })
    }

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

userRouter.post("/add-favorite", async (req, res) => {
  const { book_id, userId } = req.body
  try {
    const user = await User.findByIdAndUpdate(userId, {
      $addToSet: { favorites: book_id },
    })

    res
      .status(201)
      .json({ message: "Favorite added.", favorites: user.favorites })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to add favorite." })
  }
})

userRouter.post("/remove-favorite", async (req, res) => {
  const { book_id, userId } = req.body

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { favorites: book_id },
      },
      { new: true }
    )

    res
      .status(201)
      .json({ message: "Favorite removed.", favorites: user.favorites })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to remove favorite." })
  }
})

// For debug
// userRouter.get("/", async (req, res) => {
//   const users = await User.find({}).populate("reviews")
//   return res.status(200).json(users)
// })

// userRouter.get("/:id", async (req, res) => {
//   const userId = req.params.id
//   try {
//     const user = await User.find({ _id: userId }).populate("reviews")
//     return res.status(200).json(user)
//   } catch (error) {
//     return res.status(404).json(error)
//   }
// })

module.exports = userRouter
