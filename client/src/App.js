import React from "react";

import "./App.css";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./config/graphql";
import Home from "./pages/home";
import MyNav from "./pages/navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TvSeries from "./pages/tvSeries";
import Movies from "./pages/movies";
import Detail from "./pages/details";
import AddMovie from "./pages/addMovie";
import FavouriteList from "./pages/favouriteList";
function App() {
  return (
    <Router>
      <MyNav />
      <div className="App container">
        <Switch>
          <ApolloProvider client={client}>
            <Route path="/" exact component={Home} />
            <Route path="/movie_detail/:id" component={Detail} />
            <Route path="/tv_series" exact component={TvSeries} />
            <Route path="/movies" component={Movies} />
            <Route path="/add_movie" component={AddMovie} />
            <Route path="/my_favourite_list" component={FavouriteList} />
          </ApolloProvider>
        </Switch>
    </div>
      </Router>
  );
}

export default App;
