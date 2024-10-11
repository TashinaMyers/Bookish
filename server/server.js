const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4")
const path = require("path");
const bcrypt = require('bcrypt'); // For password hashing
const session = require('express-session'); // For session management
const { authMiddleware } = require("./utils/auth");

// Import the typeDefs and resolvers
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
const User = require("./models/User"); // Assuming you have a User model

const PORT = process.env.PORT || 3001;
const app = express();

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const startApolloServer = async () => {
  await server.start();
  
  // Middleware to parse form data
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Session middleware setup (for session-based authentication)
  app.use(session({
    secret: 'supersecretkey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // In production, use secure: true with HTTPS
  }));

  // Apollo middleware
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  // Listen on the specified port after MongoDB connection is open
  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });

// Start the Apollo Server
startApolloServer();
