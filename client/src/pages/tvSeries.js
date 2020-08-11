import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Card from "../components/homeCard"

const GET_ALL_TV_SERIES = gql`
  {
    tvSeries{
        _id
        title
        popularity
        overview
        poster_path
        tags
      }
    }
    `;

export default () => {
  const { loading, error, data } = useQuery(GET_ALL_TV_SERIES);
 
  if (loading) return <p>Loading...</p>;
  if (error) return <p>error...</p>;
  return (
    <>
      <h1 style={{ color: "white", fontWeight: "bolder", padding: 50, borderBottom: 'solid 4px crimson' }}>Tv Series</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
        }}
      >
        {data.tvSeries &&
          data.tvSeries.map((el, idx) => {
            return <Card el={el} tvSeries={'tvSeries'} key={idx} />;
          })}
      </div>
    </>
  );
};
