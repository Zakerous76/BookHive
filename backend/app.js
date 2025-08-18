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

app.use("/api/review", reviewRouter)
app.use("/api/user", userRouter)
app.use("/api/book", bookRouter)

app.get("/", (req, res) => {
  return res.json({ message: "welcome!" }).end()
})

// Catch the rest of the endpoints
app.use(middleware.unknownEndpoint)

// Error Handler
app.use(middleware.errorHandler)

module.exports = app
