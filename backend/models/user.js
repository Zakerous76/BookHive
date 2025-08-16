const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  passwordHash: String,
  role: String,
  favorites: [String], // array of bookId 's from the API
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
})

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject._id = returnedObject._id.toString()
    delete returnedObject.__v
  },
})

module.exports = mongoose.model("User", reviewSchema)
