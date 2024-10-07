// sets up a connection to a MongoDB database using Mongoose, which is an Object Data Modeling (ODM) library for MongoDB and Node.js.

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/programming-thoughts');

module.exports = mongoose.connection;
