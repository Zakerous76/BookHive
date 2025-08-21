const getTokenFrom = (request) => {
  const authorization = request.get("authorization")
  if (authorization && authorization.startsWith("Bearer")) {
    return authorization.replace("Bearer ", "").trim()
  }
  return null
}

module.exports = getTokenFrom
