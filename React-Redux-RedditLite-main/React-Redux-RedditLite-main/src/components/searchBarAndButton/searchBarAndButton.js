import React from "react";
import { useDispatch } from "react-redux";
import { searchForArticles, setKeyword } from "./searchBarandButtonSlice";
// import { displayContainer } from "../comments/comments";
import { clearResults } from "../comments/commentsSlice";
import { useHistory, useParams } from "react-router-dom";

export const SearchBarAndButton = ({ searchButton }) => {
  const dispatch = useDispatch();
  let history = useHistory();
  let { keyword } = useParams();

  function handleSubmit(e) {
    e.preventDefault();
    const keyword = document.getElementsByName("search")[0].value;
    history.push('/search/' + keyword);
    dispatch(setKeyword(keyword));
    dispatch(clearResults());
    dispatch(searchForArticles(keyword));
  }

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <input type="text" name="search" />
        <button type="submit">SEARCH RedditLite</button>
      </form>
    </div>
  );
};

export default SearchBarAndButton;
