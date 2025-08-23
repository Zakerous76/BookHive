// app.js
const path = require("path")
const express = require("express")
const connectToDb = require("./utils/connectToDb")
const reviewRouter = require("./controllers/reviewRouter")
const userRouter = require("./controllers/userRouter")
const bookRouter = require("./controllers/bookRouter")
const middleware = require("./utils/middleware")

const app = express()

// Connect to database
connectToDb()

// Use JSON parser
app.use(express.json())

// 🔹 Serve frontend static files
const DIST_PATH = path.join(process.cwd(), "dist")
// console.log("Serving frontend from:", DIST_PATH)
// app.use(express.static(DIST_PATH))

// Middleware logger
app.use(middleware.requestLogger)

// 🔹 API routes
app.use("/api/review", reviewRouter)
app.use("/api/user", userRouter)
app.use("/api/book", bookRouter)

// Optional root API endpoint
app.get("/api", (req, res) => {
  res.json({ message: "API is working!" })
})

// 🔹 Catch-all for React Router — must come after static & API
// app.get(/^\/(?!api).*/, (req, res) => {
//   res.sendFile(path.join(DIST_PATH, "index.html"))
// })

// 🔹 Error handlers
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
