const router = require("express").Router();
const { response } = require("express");
const { authMiddleware } = require("../../utils/auth");

router.route("/").get(authMiddleware, async (req, res) => {
  // https://localhost:3001/api/googlebooks?searchTerm=Harry%20Potter
  const { searchTerm } = req.query;
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${process.env.GOOGLE_API_KEY}`
  );
  const response = response.json();

  res.json({
    books: response.items,
  });
});
