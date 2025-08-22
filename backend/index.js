const app = require("./app")
const logger = require("./utils/logger")
const { PORT } = require("./utils/config")

const PORT_TO_USE = PORT || 3000
app.listen(PORT_TO_USE, () =>
  console.log(`Server running on port ${PORT_TO_USE}`)
)
