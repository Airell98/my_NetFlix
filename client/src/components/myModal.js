import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Button, Modal, Form } from "react-bootstrap";
import Swal from "sweetalert2";

const EDIT_MOVIE = gql`
  mutation EditMovie($InputMovie: InputMovie) {
    updateMovie(updatedMovie: $InputMovie) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export default (props) => {
  let { obj } = props;
  const [update, { data }] = useMutation(EDIT_MOVIE);
  const [id, setId] = useState(obj._id);
  const [show, setShow] = useState(true);
  const [title, setTitle] = useState(obj.title);
  const [posterPath, setPoster] = useState(obj.poster_path);
  const [overview, setOverview] = useState(obj.overview);
  const [popularity, setPopularity] = useState(obj.popularity);
  const [tags, setTags] = useState(obj.tags);
  const editMovie = () => {
    let temp = tags
    if(typeof tags === "string"){
       temp = tags.split(" ")
       
    }
    if (title === "") {
      Swal.fire("Title Required");
    } else if (posterPath === "") {
      Swal.fire("Poster Path Required");
    } else if (overview === "") {
      Swal.fire("Overview Required");
    } else if (tags === "") {
      Swal.fire("Tags Required");
    } else if (popularity === null || popularity === undefined) {
      Swal.fire("Popularity Undefined");
    } else {
      update({
        variables: {
          InputMovie: {
            _id: id,
            title,
            poster_path: posterPath,
            overview,
            tags: temp,
            popularity: Number(popularity)
          },
        },
      });
    }
  };
  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={editMovie}
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            props.turnOffModal();
          }}
        >
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            editMovie();
            props.submitButton();
          }}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
