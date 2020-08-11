import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import {GET_ALL_FAVOURITE_MOVIES, GET_ALL_TV_SERIES} from "../queryFavourite"


const cache = new InMemoryCache()
const client = new ApolloClient({
  cache,
  uri: "http://localhost:4000/",
  resolvers: {
    Mutation: {
      addToFavouriteMovieList: (_, args, context) => {
        console.log(args, 'from config')
        let newFavouriteMovie = {
          _id: args._id,
          overview: args.overview,
          title: args.title,
          popularity: args.popularity,
          tags: args.tags,
          poster_path: args.poster_path,
          __typename: "favouriteMovies"
        };

        let {favouriteMovies} = context.cache.readQuery({
         
          query: GET_ALL_FAVOURITE_MOVIES,
        });
        
        context.cache.writeData({
          data: {
            favouriteMovies: favouriteMovies.concat(newFavouriteMovie),
          },
        });
      },
      addToFavouriteTvSeriesList: (_, args, context) => {
       
        let newFavouriteTv = {
          _id: args._id,
          overview: args.overview,
          title: args.title,
          popularity: args.popularity,
          tags: args.tags,
          poster_path: args.poster_path,
          __typename: "favouriteTvSeries"
        };

        let {favouriteTvSeries} = context.cache.readQuery({
         
          query: GET_ALL_TV_SERIES,
        });
        console.log(favouriteTvSeries)
        context.cache.writeData({
          data: {
            favouriteTvSeries: favouriteTvSeries.concat(newFavouriteTv),
          },
        });
      },
    },
  },
});

cache.writeData({
  data: {
    favouriteMovies: [],
    favouriteTvSeries: [],
  },
});

export default client;
