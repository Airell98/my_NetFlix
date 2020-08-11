const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();
const url = "http://localhost:3001/movies";

const typeDefs = gql`
  input InputMovie {
    _id: ID
    title: String!
    overview: String!
    popularity: Float!
    poster_path: String!
    tags: [String]!
  }

  type Movies {
    _id: ID
    title: String
    overview: String
    popularity: Float
    poster_path: String
    tags: [String]
  }

  extend type Query {
    movies: [Movies]
    getOneMovie(_id: ID): Movies
  }

  extend type Mutation {
    addMovie(newMovie: InputMovie): Movies
    updateMovie(updatedMovie: InputMovie): Movies
    deleteMovie(_id: ID): Movies
  }
`;

const resolvers = {
  Query: {
    movies: async () => {
      try {
        const allMovies = await axios.get(url);
        const getMoviesInRedis = await redis.get("Movies");
        if (getMoviesInRedis) {
          return JSON.parse(getMoviesInRedis);
        } else {
          await redis.set("Movies", JSON.stringify(allMovies.data));
          return allMovies.data;
        }
      } catch (err) {
        console.log(err, "from movies resolver");
      }
    },
    getOneMovie: async (_, args) => {
      try {
        const getOneMovie = await axios.get(`${url}/${args._id}`)
        const setOneRedis = await redis.get(`${args._id}_Movies`)
        // console.log(getOneMovie.data.movies)
        if (setOneRedis){
          return JSON.parse(setOneRedis);
        } else {
          await redis.set(`${args._id}_Movies`, JSON.stringify(getOneMovie.data.movies));
          return getOneMovie.data.movies
        }
      } catch (err) {
        console.log(err, "from getoneMovies resolver");
      }
    },
  },
  Mutation: {
    addMovie: async (_, args) => {
      try {

        const addNewMovie = await axios.post(`${url}/add`, args.newMovie);
        await redis.del("Movies");
        return JSON.parse(addNewMovie.config.data);
      } catch (err) {
        console.log(err, "from addMovie");
      }
    },
    updateMovie: async (_, args) => {
      try {
        const updateTheMovie = await axios.put(
          `${url}/${args.updatedMovie._id}`,
          args.updatedMovie
        );
        await redis.del("Movies");
        await redis.del(`${args.updatedMovie._id}_Movies`);
        return JSON.parse(updateTheMovie.config.data);
      } catch (err) {
        console.log(err, "error from updateMovieee");
      }
    },
    deleteMovie: async (_, args) => {
      try {
        const deleteOneMovie = await axios.delete(`${url}/${args._id}`);
        await redis.del("Movies");
        await redis.del(`${args._id}_Movies`);
        return "You Have Succesfully Deleted One Movie";
      } catch (err) {
        console.log(err, "from deleteMovie");
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
