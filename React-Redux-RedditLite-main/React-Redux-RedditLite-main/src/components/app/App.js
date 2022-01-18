import "./App.css";
import React from "react";
import SearchBarAndButton from "../searchBarAndButton/searchBarAndButton";
import Comments from "../comments/comments";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import SearchResults from "../SearchResults/searchResults";

export default function App() {
  return (
    <Router>
      <div>
        <div>
          <h1>RedditLite</h1>
          <SearchBarAndButton class="button" />
          <Switch>
            <Route path="/search/:keyword" component={SearchResults} />
            <Route path="/comments/:permalink" component={Comments} />
          </Switch>
        </div>
        <div>
          <img class="logo" src={"reddit-logo.png"} alt="Reddit Logo" />
        </div>
      </div>
    </Router>
  );
}
