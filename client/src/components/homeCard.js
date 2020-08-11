import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Button, Card } from "react-bootstrap";
import {
  GET_ALL_FAVOURITE_MOVIES,
  ADD_FAVOURITE_MOVIE,
  GET_ALL_TV_SERIES,
  ADD_FAVOURITE_TV_SERIES
} from "../queryFavourite";
import Swal from "sweetalert2";

export default (props) => {
  const { title, poster_path, overview, popularity, tags, _id } = props.el;
  const {data:favouriteTv} = useQuery( GET_ALL_TV_SERIES)
  const { data: favouriteMoviesData } = useQuery(GET_ALL_FAVOURITE_MOVIES);
  const [addTv, {data:addTvFav}] = useMutation(ADD_FAVOURITE_TV_SERIES)
  const [add, { data: addMovieFav }] = useMutation(ADD_FAVOURITE_MOVIE);

  const addFavouriteMovie = () => {
    let { favouriteMovies } = favouriteMoviesData;
    let result = favouriteMovies.find((el) => {
      return el._id === _id;
    });
    if (result) {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "You already have one",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      add({
        variables: {
          _id,
          overview,
          popularity,
          poster_path,
          tags,
          title,
        },
      });
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Your have added a new favourite movie",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const addFavouriteTvSeries = () => {
    let { favouriteTvSeries } = favouriteTv;
    let result = favouriteTvSeries.find((el) => {
      return el._id === _id;
    });
    if (result) {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "You already have one",
        showConfirmButton: false,
        timer: 1500,
      });
    }else{

      addTv({
        variables: {
          _id,
          overview,
          popularity,
          poster_path,
          tags,
          title,
        },
      });
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Your have added a new favourite TvSeries",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      
        <Card style={{ width: '18rem', backgroundColor: 'black', margin: 20 }}>
          <Card.Img variant="top" src={poster_path} height="400" />
          <Card.Body>
            <Card.Title style={{ fontWeight: "bolder", color: 'white' }}>{title}</Card.Title>
            {/* <Card.Text style={{ fontWeight: "bolder", color: 'white' }}>{title}</Card.Text> */}
            {props.movies && (<Button className="fa fa-heart" variant="danger" onClick={() => { addFavouriteMovie();}}></Button>)}
            {props.tvSeries && (<Button className="fa fa-heart" variant="danger" onClick={() => { addFavouriteTvSeries(); }}></Button>)}
          </Card.Body>
        </Card>
    </>
  );
};
