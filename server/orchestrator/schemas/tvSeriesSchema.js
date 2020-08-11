const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();
const url = "http://localhost:3002/tv"
const typeDefs = gql`
  input InputTvSeries {
    _id: ID
    title: String!
    overview: String!
    popularity: Float!
    poster_path: String!
    tags: [String]!
  }

  type TvSeries {
    _id: ID
    title: String
    overview: String
    popularity: Float
    poster_path: String
    tags: [String]
  }

  extend type Query {
    tvSeries: [TvSeries]
    getOneTvSeries(_id: ID): TvSeries
  }

  extend type Mutation {
    addTvSeries(newTvSeries: InputTvSeries): TvSeries
    deleteTvSeries(_id: ID): TvSeries
    updateTvSeries(updatedTvSeries: InputTvSeries): TvSeries
  }
`;

const resolvers = {
  Query: {
    tvSeries: async () => {
      try {
        const allTvSeries = await axios.get(url);
        const getTvSeriesInRedis = await redis.get("TvSeries");
        if (getTvSeriesInRedis) {
          return JSON.parse(getTvSeriesInRedis);
        } else {
          await redis.set("TvSeries", JSON.stringify(allTvSeries.data));
          return allTvSeries.data;
        }
      } catch (err) {
        console.log(err, "from get All tv series");
      }
    },
    getOneTvSeries: async (_, args) => {
      try {
        const tvSeriesDetail = await axios.get(
          `${url}/${args._id}`
        );
        const getOneTvSeriesInRedis = await redis.get(`${args._id}_TvSeries`);
        if (getOneTvSeriesInRedis) {
          return JSON.parse(getOneTvSeriesInRedis);
        } else {
          await redis.set(
            `${args._id}_TvSeries`,
            JSON.stringify(tvSeriesDetail.data)
          );
          return tvSeriesDetail.data;
        }
      } catch (err) {
        console.log(err, "from get one tv series");
      }
    },
  },
  Mutation: {
    updateTvSeries: async (_, args) => {
      try {
       
        const updateOneTvSeries = await axios.put(
          `${url}/${args.updatedTvSeries._id}`,
          args.updatedTvSeries
        );
        await redis.del("TvSeries");
        await redis.del(`${args.updatedTvSeries._id}_TvSeries`);

        return JSON.parse(updateOneTvSeries.config.data);
      } catch (err) {
        console.log(err, "from update tv series");
      }
    },
    addTvSeries: async (_, args) => {
      try {
      
        const newTvSeries = await axios.post(
          `${url}/add`,
          args.newTvSeries
        );
        await redis.del("TvSeries");
        return JSON.parse(newTvSeries.config.data);
      } catch (err) {
        console.log(err, "from addTvSeries");
      }
    },
    deleteTvSeries: async (_, args) => {
      try {
       
        const deleteOneTvSeries = await axios.delete(
          `${url}/${args._id}`
        );
        await redis.del("TvSeries");
        await redis.del(`${args._id}_TvSeries`);
        return "You Have Successfully Deleted One Tv Series";
      } catch (err) {
        console.log(err, "from delete tv series");
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
