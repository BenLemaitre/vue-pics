const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Importing typeDefs and resolvers
const filePath = path.join(__dirname, 'typeDefs.gql');
const typeDefs = fs.readFileSync(filePath, 'utf-8');
const resolvers = require('./resolvers');

// Importing env variables and mongoose models
require('dotenv').config({ path: 'variables.env' });
const User = require('./models/User');
const Post = require('./models/Post');

// Connect to Mongo DB
mongoose
    .connect(
        process.env.MONGO_URI,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("DB connected"))
    .catch(err => console.log(err));

// Create Apollo / GraphQL server using typeDefs, resolvers and context
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        User,
        Post
    }
});

server.listen().then(({ url }) => {
    console.log(`Server listening on ${url}`);
});