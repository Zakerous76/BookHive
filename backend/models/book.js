const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
  bookId: { type: Number, required: true, unique: true },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  title: { type: String, required: true },
  authors: [
    {
      name: String,
      birth_year: Number,
      death_year: Number,
    },
  ],
  translators: [
    {
      name: String,
      birth_year: Number,
      death_year: Number,
    },
  ],
  summaries: [String],
  subjects: [String],
  bookshelves: [String],
  languages: [String],
  copyright: Boolean,
  media_type: String,
  formats: { type: mongoose.Schema.Types.Mixed }, // allows any object
  download_count: Number,
})

bookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject._id = returnedObject._id.toString()
    delete returnedObject.__v
  },
})

module.exports = mongoose.model("Book", bookSchema)
