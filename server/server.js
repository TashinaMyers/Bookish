const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const { typeDefs, resolvers } = require('../schemas'); // adjust the path based on your structure
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Create a new Apollo server instance
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// Start the Apollo server
const startServer = async () => {
    await server.start(); // Ensure the server is started

    server.applyMiddleware({ app }); // Apply middleware after the server has started

    // The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });

    // Start the Express server
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}${server.graphqlPath}`);
    });
};

// Call the startServer function to start everything
startServer().catch(err => console.error(err));
