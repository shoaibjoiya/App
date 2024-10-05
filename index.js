

// npm i @apollo/server graphql cors bcryptjs dotenv jsonwebtoken mongoose nodemon
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import express from 'express';
import http from 'http';
import cors from 'cors';
import typeDefs from './schemaGql.js'
import resolvers from './resolvers.js'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
// Required logic for integrating with Express
const app = express();
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);
// Replace 'your_database_name' with the actual name of your database
const databaseName = 'bestdb';

// Connection string example (if using a connection string)

// Connection options example (if using options object)
const options = {
  dbName: databaseName, // Specify the database name here
};

// Connect to the MongoDB database
await mongoose.connect(process.env.MONGO_URI,options)
  .then(() => {

    console.log(`Connected to MongoDB database: ${databaseName}`);
  })
  .catch((error) => {
    console.error(`Error connecting to MongoDB: ${error.message}`);
  });


//import models here




 
// Same ApolloServer initialization as before, plus the drain plugin
// for our httpServer.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection:true,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
// Ensure we wait for our server to start // ,ApolloServerPluginLandingPageDisabled()],
await server.start();

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
  '/graphql',
  cors({
    origin: ['https://salebook.pk','https://app.salebook.pk','http://localhost:5173','https://pages.dev','https://salebook.pages.dev'], // Allow requests from this origin
    // Allow requests from this origin
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
  express.json(),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
      context: ({ req }) => {
      // Extract user ID from the request, or perform any other logic you need
      const authorization = (req && req.headers && req.headers.authorization) || '';
      
      let userId = null;
      let sellerId = null;
      let role = null;
      if (authorization) {
        try {
          const decodedToken = jwt.verify(authorization, process.env.JWT_SECRET);
          userId = decodedToken.userId;
          sellerId = decodedToken.sellerId;
          role     = decodedToken.role;
        } catch (error) {
          // Handle invalid token
          console.error('Invalid token:', error);
        }
      }
  
      // Return the context object
      return { userId ,sellerId,role};
    },
  }),
);

// Modified server startup
await new Promise((resolve) => httpServer.listen({ port: 8000 }, resolve));

console.log(`🚀 Server ready at http://localhost:8000/`);
