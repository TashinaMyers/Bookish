// module that exports the typeDefs and resolvers for a GraphQL server. It is part of the setup for defining the schema and the logic that handles the queries and mutations in the GraphQL API.

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

module.exports = { typeDefs, resolvers };
