import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { GET_ALL_FAVOURITE_MOVIES } from "../queryFavourite";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import MyModal from "../components/myModal";
import Swal from "sweetalert2";
import UpdateNotif from "../components/updateNotif"
const GET_ALL_MOVIES = gql`
  {
    movies {
      _id
      title
      popularity
      overview
      poster_path
      tags
    }
  }
`;
const DELETE_MOVIE = gql`
  mutation deleteTheMovie($id: ID) {
    deleteMovie(_id: $id) {
      title
    }
  }
`;
const ADD_FAVOURITE_MOVIE = gql`
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

export default () => {
  const [kondisi, setKondisi] = useState(false);
  const [updateNotif, setUpdateNotif] = useState(false)
  const { data: favouriteMoviesData } = useQuery(GET_ALL_FAVOURITE_MOVIES);
  let [obj, setObj] = useState({});
  
  const { loading, error, data, refetch } = useQuery(GET_ALL_MOVIES);
  const [deleteMovie, { data: deleteData }] = useMutation(DELETE_MOVIE);
  const [add, { data: addMovie }] = useMutation(ADD_FAVOURITE_MOVIE);
  const history = useHistory();

  const addFavouriteMovie = (value) => {
    let { favouriteMovies } = favouriteMoviesData;
    let result = favouriteMovies.find((el) => {
      return el._id === value._id;
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
          _id: value._id,
          overview: value.overview,
          popularity: value.popularity,
          poster_path: value.poster_path,
          tags: value.tags,
          title: value.title,
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

  const reRunTheQuery = () => {
    setUpdateNotif(true)
    setTimeout(() => {
      setUpdateNotif(false)
    }, 1500);
   
    refetch();
  };

  const changeId = (theID) => {
    history.push(`/movie_detail/${theID}`);
  };

  const onDelete = (movieId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        deleteMovie({
          variables: {
            id: movieId,
          },
        });
        refetch();
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const onEdit = (value) => {
    let { title, poster_path, tags, popularity, _id, overview } = value;

    let temp = {
      title,
      poster_path,
      overview,
      tags,
      _id,
      popularity,
    };

    setObj(temp);
    setKondisi(true);
  };

  if (loading) return <p style={{ color: "white" }}>Loading...</p>;
  if (error) return <p style={{ color: "white" }}>error...</p>;
  return (
    <>
      {kondisi && (
        <MyModal
          obj={obj}
          turnOffModal={() => {
            setKondisi(false);
          }}
          submitButton={() => {
            setKondisi(false);
            reRunTheQuery();
          }}
        />
      )}
     { updateNotif && <UpdateNotif/>}
      <h1 style={{ color: "white", fontWeight: "bolder", padding: 50, borderBottom: 'solid 4px crimson' }}>Movies</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {data.movies &&
          data.movies.map((el, idx) => {
            return (
              <div
                key={idx}
                style={{width: '18rem', backgroundColor: 'black', margin: 20 }}
              >
                <a href="#detail">
                  <img
                    src={el.poster_path}
                    alt="foto"
                    height="400"
                    onClick={() => {
                      changeId(el._id);
                    }}
                  ></img>
                </a>
                <p style={{ fontWeight: "bolder", color: "white" }}>{el.title}</p>
                <div
                  className="btn btn-group"
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <Button
                    className="fa fa-edit"
                    variant="success"
                    size="lg"
                    onClick={() => {
                      onEdit(el);
                    }}
                  ></Button>
                  <Button
                    className="fa fa-times"
                    variant="secondary"
                    size="lg"
                    onClick={() => {
                      onDelete(el._id);
                    }}
                  ></Button>
                <Button
                  className="fa fa-heart"
                  variant="danger"
                  onClick={() => {
                    addFavouriteMovie(el);
                  }}
                >
                </Button>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
