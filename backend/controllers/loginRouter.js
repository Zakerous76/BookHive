const loginRouter = require("express").Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user")
const { JWT_SECRET } = require("../utils/config")

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ username })
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
    return res.status(200).json({ token })
  } catch (error) {
    return res.status(404).json({ error: `${error}` })
  }
})

module.exports = loginRouter
