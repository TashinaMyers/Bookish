const express = require('express');
const { User } = require('./models'); // Assuming you have a User model set up
const router = express.Router();

// POST /api/signup
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await User.create({ username, email, password });
    const token = Auth.signToken(newUser); // Ensure you have a method for signing tokens
    res.json({ token, user: newUser });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error creating user' });
  }
});

module.exports = router;

