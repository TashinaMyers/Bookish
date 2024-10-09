const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

const secret = 'yourSuperSecretKey'; // Replace with your actual secret key
const expiration = '2h'; // Token expiration time

// Middleware to authenticate requests
const authMiddleware = function (context) {
  const token = context.req.headers.authorization || '';

  if (token) {
    try {
      const { data } = jwt.verify(token.split(' ').pop(), secret);
      context.user = data; // Attach user data to the context
      return context;
    } catch {
      throw new AuthenticationError('Invalid token');
    }
  }

  return context;
};

// Function to sign a token
const signToken = function ({ username, email, _id }) {
  const payload = { username, email, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

module.exports = {
  authMiddleware,
  signToken,
};
