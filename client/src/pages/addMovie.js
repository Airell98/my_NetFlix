import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
const ADD_NEW_MOVIE = gql`
  mutation AddNewMovie($InputMovie: InputMovie) {
    addMovie(newMovie: $InputMovie) {
      title
      poster_path
      popularity
      overview
      tags
    }
  }
`;
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
export default () => {
  const history = useHistory();
  const { loading, error, data: movieData, refetch } = useQuery(GET_ALL_MOVIES);
  const [add, { data }] = useMutation(ADD_NEW_MOVIE);
  const [title, setTitle] = useState("");
  const [posterPath, setPoster] = useState("");
  const [overview, setOverview] = useState("");
  const [popularity, setPopularity] = useState(0);
  const [tags, setTags] = useState("");

  const addNewMovie = (e) => {
    e.preventDefault();
    let temp = tags.split(' ')
    console.log(temp)
    if (title === "") {
      Swal.fire("Title Required");
    } else if (posterPath === "") {
      Swal.fire("Poster Path Required");
    } else if (overview === "") {
      Swal.fire("Overview Required");
    } else if (tags === "") {
      Swal.fire("Tags Required");
    }else if(popularity === null || popularity === undefined) {
      Swal.fire("Popularity Undefined");
    }
    else {
      add({
        variables: {
          InputMovie: {
            title,
            poster_path: posterPath,
            overview,
            popularity: Number(popularity),
            tags: temp,
          },
        },
      });
      refetch()
      setTimeout(() => {
       
        Swal.fire("You Have Successfully Added A New Movie");
        history.push("/movies");
      }, 1800);
    }
  };

  return (
    <div style={{ width: "60%", margin: "auto" }}>
      <img
        src="https://www.lifewire.com/thmb/VDz8gSeItutPo9uldkhKOdkw7gA=/1167x656/smart/filters:no_upscale()/netflix-add-dvd-plan-239476fd7dbc48c398d157361b9b4dba.png"
        alt="dwayne johnson"
        width="450"
        height="350"
      ></img>
      <Form
        onSubmit={addNewMovie}
        style={{ color: "white", marginBottom: "10px" }}
      >
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Poster_Path</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Poster_Path"
            value={posterPath}
            onChange={(e) => {
              setPoster(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Overview</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            value={overview}
            onChange={(e) => {
              setOverview(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Popularity</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Popularity Rate"
            value={popularity}
            onChange={(e) => {
              setPopularity(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Tags</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Tags"
            value={tags}
            onChange={(e) => {
              setTags(e.target.value);
            }}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          onClick={(e) => {
            addNewMovie(e);
          }}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};
