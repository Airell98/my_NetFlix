// require('dotenv').config()
// const express = require('express');
// const app = express();
// const PORT = process.env.PORT || 3000
// const routes = require('./routes')

// app.use(express.json())
// app.use(express.urlencoded({extended: true}))
// app.use("/entertainme", routes)

// app.get('/', (req, res) => {
//     res.send('testingggg orchestra')
// })

// app.listen(PORT, ()=>{
//     console.log("orchestra endpoint >>>", PORT)
// })

const { ApolloServer, gql, makeExecutableSchema } = require("apollo-server");

const movieSchema = require('./schemas/movieSchema')
const tvSeries = require('./schemas/tvSeriesSchema')
const typeDefs = gql`
    type Query
    type Mutation
`;

const schema = makeExecutableSchema({
    typeDefs: [typeDefs, tvSeries.typeDefs, movieSchema.typeDefs],
    resolvers: [movieSchema.resolvers, tvSeries.resolvers]
});

const server = new ApolloServer({
    schema,
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
