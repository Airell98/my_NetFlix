import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useParams } from "react-router-dom";

const GetMovieById = gql`
  query GetMovieById($id: ID) {
    getOneMovie(_id: $id) {
      title
      poster_path
      popularity
      overview
      tags
    }
  }
`;

export default () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GetMovieById, {
    variables: {
      id: id,
    },
  });
  if (loading) return <p>Loading..</p>;
if (error) return <p>Error..{JSON.stringify(error)}</p>;
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "transparent",
          marginTop: 40
        }}
      >
        <div style={{ flex: "1" }}>
          <img
            src={data.getOneMovie.poster_path}
            alt="foto"
          ></img>
        </div>
        <div style={{ flex: "3", color: "white" }}>
            <h3 style={{color:"red", fontWeight:"bolder"}}>𝗘𝗻𝘁𝗲𝗿𝘁𝗮𝗶𝗻𝗠𝗲</h3>
          <p style={{ fontSize: "50px",fontWeight:"bolder" }}>{data.getOneMovie.title}</p>
            <div style={{border: "1px solid white", width:"50%", margin:"auto"}}>
          <p style={{ fontSize: "20px", textAlign:"left", padding: "10px" }}>Overview: {data.getOneMovie.overview}</p>
          <p style={{ fontSize: "20px", textAlign:"left", padding: "10px",  }}>Popularity: <span style={{color:"yellow"}}>{data.getOneMovie.popularity}</span></p>
          <p style={{ fontSize: "20px", textAlign:"left", padding: "10px" }}>Tags: {data.getOneMovie.tags}</p>
          </div>
        </div>
      </div>
    </>
  );
};
