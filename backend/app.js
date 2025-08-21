const path = require("path")
const express = require("express")
const connectToDb = require("./utils/connectToDb")
const reviewRouter = require("./controllers/reviewRouter")
const userRouter = require("./controllers/userRouter")
const bookRouter = require("./controllers/bookRouter")
const middleware = require("./utils/middleware")

const app = express()
connectToDb()

app.use(express.json())
app.use(express.static("dist"))
app.use(middleware.requestLogger)

// API routes
app.use("/api/review", reviewRouter)
app.use("/api/user", userRouter)
app.use("/api/book", bookRouter)

app.get("/", (req, res) => {
  return res.json({ message: "welcome!" }).end()
})

// 🔑 Catch-all handler: return index.html for React Router
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"))
})

// Error middleware
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
