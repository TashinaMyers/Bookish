const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth'); // Import the auth middleware
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection'); // Import the connection

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Set up the Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware, // Pass the middleware here
});

// Apply the Apollo server to the Express app
const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
};

startServer();

// Serve static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Listen for connections once the database is open
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}${server.graphqlPath}`);
  });
});

// Ensure to handle errors when connecting to MongoDB
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});
