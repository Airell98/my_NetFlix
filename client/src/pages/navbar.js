import React from "react";
import { Navbar, Nav, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
export default () => {
  return (
    <Navbar expand="lg" style={{backgroundColor: 'crimson'}}>
        <Link style={{color: "white", margin:"3px", marginLeft:"5px", fontWeight: "bolder"}} to="/"><Image src="/em1.png" style={{height: 50, borderRadius: 10}}/></Link>
        <Link style={{color: "white", margin:"3px",  marginLeft:"5px", fontWeight: "bolder", fontSize: 40 }} to="/">EntertainMe</Link>
        {/* <Link style={{color: "white", margin:"3px",  marginLeft:"5px", fontWeight: "bolder", fontSize: 30 }} to="/">|</Link> */}
      <Navbar.Brand style={{color: "white", margin:"3px",  marginLeft:"5px", fontWeight: "bolder", fontSize: 40 }}>| </Navbar.Brand> 
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link style={{color: "white", margin:"3px",  marginLeft:"5px", fontWeight: "bolder", fontSize: 20 }} to="/movies">Movies</Link>
          <Link style={{color: "white", margin:"3px",  marginLeft:"5px", fontWeight: "bolder", fontSize: 20 }} to="/tv_series">Tv Series</Link>
        </Nav>
        <Link className="fa fa-plus-square fa-2x" style={{color: "white", margin:"3px", fontWeight: "bolder"}} to="/add_movie"></Link>
        < Navbar.Brand className="fa fa-2x" style={{color: "white", margin:"10px", fontWeight: "bolder"}}>|</Navbar.Brand>
        <Link className="fa fa-heart fa-2x" style={{color: "white", margin:"3px", fontWeight: "bolder"}} to="/my_favourite_list"></Link>
        
      </Navbar.Collapse>
    </Navbar>
  );
};
