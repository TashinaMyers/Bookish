const { Schema } = require("mongoose");

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const bookSchema = new Schema({
  bookId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  authors: [
    {
      type: String,
    },
  ],
  image: {
    type: String,
  },
  link: {
    type: String,
  },
});

module.exports = bookSchema;
