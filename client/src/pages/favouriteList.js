import React from "react";
import { useQuery } from "@apollo/react-hooks";

import Card from "../components/homeCard";
import {GET_ALL_FAVOURITE_MOVIES, GET_ALL_TV_SERIES} from "../queryFavourite"



export default () => {
  const { data } = useQuery(GET_ALL_FAVOURITE_MOVIES);
  const { data: tvSeries } = useQuery(GET_ALL_TV_SERIES);

  return (
    <>
      { data.favouriteMovies.length !== 0 ? <h1 style={{ color: "white" }}>Favourite Movies</h1> : ''}
      <div
        style={{
          display: "flex",

          flexWrap: "wrap",
        }}
      >
        
        {data.favouriteMovies &&
          data.favouriteMovies.map((el, idx) => {
            return <Card el={el} key={idx} />;
          })}
        <div style={{ width: "100%" }}>
          {tvSeries.favouriteTvSeries.length !== 0 ?  <h1 style={{ color: "white" }}>Favourite Tv Series</h1>: ''}
        </div>
        {tvSeries.favouriteTvSeries &&
          tvSeries.favouriteTvSeries.map((el, idx) => {
            return <Card el={el} key={idx} />;
          })}
      </div>
    </>
  );
};
