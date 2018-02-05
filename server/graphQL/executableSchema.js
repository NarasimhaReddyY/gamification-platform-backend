// Imports the schema, resolvers and the model
const userSchema = require('./userGQLSchema.js');
const userResolvers = require('./userGQLResolvers.js');
const { makeExecutableSchema } = require('graphql-tools');
const merge = require('lodash/merge');

const RootQuery = `type Query {
  getUserByEmail(email: String!): User
  getUserByUserName(userName: String!): User
}`;

const RootMutaion = `type Mutation {
  createUser(email: String!, userName: String!, password: String!): User
}`;

const SchemaDefinition = `schema {
  query: Query
  mutation: Mutation
}`;

// Combine all resolvers
const RootResolver = merge({}, userResolvers);

// Uses graphQL tools to make create a proper schema
const executableSchema = makeExecutableSchema({
	typeDefs: [SchemaDefinition, RootQuery, RootMutaion, userSchema],
	resolvers: RootResolver,
});

module.exports = executableSchema;
