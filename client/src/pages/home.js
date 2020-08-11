import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Card from "../components/homeCard";

const GET_ALL_DATA = gql`
  {
    movies {
      _id
      title
      popularity
      overview
      poster_path
      tags
    }

    tvSeries {
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
  const { loading, error, data } = useQuery(GET_ALL_DATA);
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>error...</p>;
  return (
    <>
      <h1 style={{ color: "white", fontWeight: "bolder", borderBottom: 'solid 4px crimson', padding: 50}}>Classic Movies</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {data.movies &&
          data.movies.map((el, idx) => {
            return <Card el={el} movies={'movies'} key={idx} />;
          })}
        <div style={{ width: "100%" }}>
          <h1 style={{ color: "white", fontWeight: "bolder", borderBottom: 'solid 4px crimson', padding: 50 }}>Tv Series Classics</h1>
        </div>
        {data.tvSeries &&
          data.tvSeries.map((el, idx) => {
            return <Card el={el} tvSeries={"tvSeries"} key={idx} style={{borderRadius: 10}}/>;
          })}
      </div>
    </>
  );
};
