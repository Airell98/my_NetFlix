import ApolloClient, {gql} from "apollo-boost";

export const GET_ALL_FAVOURITE_MOVIES= gql`
query{
    favouriteMovies @client{
    _id,
    title,
    overview,
    poster_path,
    popularity,
    tags
  }

 
}
`;


export const GET_ALL_TV_SERIES = gql`
  query {
    favouriteTvSeries @client {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;


 export const ADD_FAVOURITE_MOVIE = gql`
  mutation ADDFAVOURITEMOVIE(
    $_id: ID
    $title: String
    $poster_path: String
    $popularity: Float
    $overview: String
    $tags: [String]
  ) {
    addToFavouriteMovieList(
      _id: $_id
      overview: $overview
      title: $title
      poster_path: $poster_path
      tags: $tags
      popularity: $popularity
    ) @client {
      _id
      title
      overview
      popularity
      poster_path
      tags
    }
  }
`;



export const ADD_FAVOURITE_TV_SERIES = gql`
  mutation AddFavouriteTvSeries(
    $_id: ID
    $title: String
    $poster_path: String
    $popularity: Float
    $overview: String
    $tags: [String]
  ) {
    addToFavouriteTvSeriesList(
      _id: $_id
      overview: $overview
      title: $title
      poster_path: $poster_path
      tags: $tags
      popularity: $popularity
    ) @client {
      _id
      title
      overview
      popularity
      poster_path
      tags
    }
  }
`;

