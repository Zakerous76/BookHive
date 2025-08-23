require("dotenv").config()

let environment

process.env.NODE_ENV === "production"
  ? (environment = "production")
  : (environment = "development")

const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT

const JWT_SECRET = process.env.JWT_SECRET
const GUTENDEX_API = process.env.GUTENDEX_API

const VITE_FRONTEND_URL = process.env.VITE_FRONTEND_URL

module.exports = {
  MONGODB_URI,
  PORT,
  JWT_SECRET,
  GUTENDEX_API,
  VITE_FRONTEND_URL,
}
