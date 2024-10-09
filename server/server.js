const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { authMiddleware } = require("./utils/auth");

// Import the typeDefs and resolvers
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();

const cors = require('cors');

const helmet = require('helmet');

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "script-src": [
        "'self'",
        "'unsafe-inline'",
        "'unsafe-eval'",
        "https://app.satismeter.com",
        "bat.bing.com",
        "cdn.cookielaw.org",
        "cdn.segment.com",
        "connect.facebook.net",
        "edge.fullstory.com",
        "google-analytics.com",
        "googleleadservices.com",
        "js.recurly.com",
        "js.stripe.com",
        "language-server-workers.cdn.apollographql.com",
        "munchkin.marketo.net",
        "snap.licdn.com",
        "static.ads-twitter.com",
        "statismeter.com",
        "studio-ui-deployments.apollographql.com",
        "tag.clearbitscripts.com",
        "tags.srv.stackadapt.com",
        "www.apollographql.com",
        "www.clarity.ms",
        "www.google.com",
        "www.googleadservices.com",
        "www.google-analytics.com",
        "www.googletagmanager.com",
        "www.gstatic.com",
        "www.redditstatic.com",
        "googleads.g.doubleclick.net"
      ],
    },
  })
);


const corsOptions = {
  origin: 'https://studio.apollographql.com',  // Allow Apollo Studio
  credentials: true,  // Allow credentials
  allowedHeaders: ['Content-Type', 'Authorization', 'sentry-trace'],  // Include sentry-trace
  methods: ['GET', 'POST', 'OPTIONS'],  // Ensure OPTIONS is handled for preflight
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://app.satismeter.com https://cdn.segment.com https://studio.apollographql.com https://cdn.apollographql.com https://js.stripe.com https://www.googletagmanager.com https://apollo-server-landing-page.cdn.apollographql.com;" +  
    "connect-src 'self' https://studio.apollographql.com https://app.satismeter.com https://cdn.segment.com https://cdn.apollographql.com https://sentry.io;" +  
    "img-src 'self' data: https://www.google-analytics.com https://apollo-server-landing-page.cdn.apollographql.com https://*.sentry.io;" +  
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.sentry.io;" +  
    "font-src 'self' https://fonts.gstatic.com;" +  
    "object-src 'none';"
  );
  next();
});



app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
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
  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(
        `Server is running on http://localhost:${PORT}${server.graphqlPath}`
      );
      console.log("Successfully connected to MongoDB");
    });
  });
}

// Start the Apollo Server
startApolloServer();