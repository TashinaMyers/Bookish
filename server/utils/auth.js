const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');

const secret = 'AAAAAAAAh'; 
const expiration = '2h'; // Token expiration time

module.exports = function (context) {
  const token = context.req.headers.authorization || '';

  if (token) {
    try {
      const { data } = jwt.verify(token.split(' ').pop(), secret);
      return { user: data };
    } catch {
      throw new AuthenticationError('Invalid token');
    }
  }
  return { user: null };
};
