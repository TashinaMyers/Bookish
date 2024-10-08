const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

// Import the typeDefs and resolvers
const { typeDefs, resolvers } = require('../schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

async function startApolloServer() {
  // Create an instance of ApolloServer
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });

  // Start the Apollo Server
  await server.start();

  // Apply the Apollo middleware to the Express app
  server.applyMiddleware({ app });

  // Listen on the specified port after MongoDB connection is open
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}${server.graphqlPath}`);
      console.log('Successfully connected to MongoDB');
    });
  });
}

// Start the Apollo Server
startApolloServer();
