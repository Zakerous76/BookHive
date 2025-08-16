const app = require("./app")
const logger = require("./utils/logger")
const { PORT } = require("./utils/config")

app.listen(PORT, () => {
  logger.info(`Server running on Port ${PORT}, on http://localhost:${PORT}`)
})
