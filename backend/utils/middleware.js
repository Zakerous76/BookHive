const logger = require("./logger")

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method)
  logger.info("Path:  ", request.path)
  // logger.info("Body:  ", request.body);
  logger.info("---")
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" })
}
const errorHandler = (error, request, response, next) => {
  // Log for debugging (you can expand logger to handle stack traces)
  logger.error(error.message)

  if (error.name === "CastError") {
    return response.status(400).json({ error: "malformatted id" })
  }

  if (error.name === "ValidationError") {
    return response.status(400).json({
      error: error.message,
    })
  }

  if (error.name === "MongoServerError" && error.code === 11000) {
    // Handle duplicate key errors dynamically
    const field = Object.keys(error.keyValue)[0]
    const value = error.keyValue[field]
    return response.status(400).json({
      error: `The ${field} "${value}" is already in use.`,
    })
  }

  if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "token invalid" })
  }

  if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "token expired" })
  }

  next(error)
  // TODO: For production, remove the comments
  // Fallback for unexpected errors
  // return response.status(500).json({
  //   error: "Something went wrong, please try again later.",
  // })
}

module.exports = { requestLogger, unknownEndpoint, errorHandler }
