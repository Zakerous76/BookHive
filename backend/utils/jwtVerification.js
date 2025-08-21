const jwt = require("jsonwebtoken")
const getTokenFrom = require("./getTokenFrom")
const JWT_SECRET = require("../utils/config").JWT_SECRET

const decodeToken = (request) => {
  const decodedToken = jwt.verify(getTokenFrom(request), JWT_SECRET)
  if (!decodedToken.userId) {
    return null
  }
  return decodedToken
}

module.exports = decodeToken
