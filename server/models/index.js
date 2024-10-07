// simple module export file typically found in a Node.js application, particularly in projects using Mongoose to define models for MongoDB.

const User = require('./User');
const Thought = require('./Thought');

module.exports = { User, Thought };
