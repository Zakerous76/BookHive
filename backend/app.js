const express = require("express")
const connectToDb = require("./utils/connectToDb")

const app = express()
connectToDb()

app.use(express.json())

app.get("/", (req, res) => {
  return res.json({ message: "welcome!" }).end()
})

module.exports = app
