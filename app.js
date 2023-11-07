const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");

// Load schema and resolvers
const typeDefs = require("./schema/schema");
const resolvers = require("./resolver/resolver");

// Load db methods
const mongoDataMethods = require("./api/db");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:admin123@cluster0.dyalxcm.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

const startApolloServer = async (typeDefs, resolvers) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ mongoDataMethods }),
  });

  const app = express();
  await server.start();
  server.applyMiddleware({ app });

  //connect to mongodb
  await connectDB();

  const PORT = 5000;

  app.listen({ port: PORT }, () => {
    console.log(
      `Server is listening at http://localhost:${PORT}${server.graphqlPath}`
    );
  },);
};

startApolloServer(typeDefs, resolvers);
