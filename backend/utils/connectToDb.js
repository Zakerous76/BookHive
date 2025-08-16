const mongoose = require("mongoose")
const { MONGODB_URI } = require("./config")

const connectToDb = async () => {
  try {
    console.log("Connecting to DB...")
    await mongoose.connect(MONGODB_URI)
    console.log("Connected to DB.")
  } catch (error) {
    console.log("Failed to connect to DB:", error)
  }
}

module.exports = connectToDb
