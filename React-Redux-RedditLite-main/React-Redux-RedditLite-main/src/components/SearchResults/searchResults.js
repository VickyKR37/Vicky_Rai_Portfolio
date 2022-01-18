import React from "react";
import { selectArticles } from "../searchBarAndButton/searchBarandButtonSlice";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectComments,
  setPermalink,
  loadComments,
  selectPermalink,
} from "../comments/commentsSlice";

export default function SearchResults() {
  const articles = useSelector(selectArticles);
  const dispatch = useDispatch();
  const comments = useSelector(selectComments);
  let permalink = useSelector(selectPermalink);
  const { keyword } = useParams();
  const history = useHistory();

  function clickArticle(e) {
    history.push('/comments' + e.target.closest(".article").id);
    dispatch(setPermalink(e.target.closest(".article").id));
    dispatch(loadComments(e.target.closest(".article").id));
  }

  function headline() {
    if (comments.length === 0 && articles.length > 0) {
      return (
        <h4 class="headline">
          Hi! Click away for a list of associated comments!
        </h4>
      );
    }
  }

  function ArticleView(article, index) {
    // returns an article view
    return (
      <div id="container">
        <div
          class="article"
          key={index}
          id={article.data.permalink}
          onClick={clickArticle}
        >
          <h5 id="articleTitle">{article.data.title}</h5>
          <img
            class="thumbnail"
            src={article.data.thumbnail}
            alt="related to the article"
          />
          <h6>Posted By: {article.data.author}</h6>
          {/* <h6>Time posted: {getTime()}</h6> */}
          <h6>Subreddit: {article.data.subreddit}</h6>
          <h6>Comments: {article.data.num_comments}</h6>
          <h6>Up Votes: {article.data.ups}</h6>
          <h6>Down Votes: {article.data.downs}</h6>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div class="headline">{headline()}</div>
      <div id="container">{articles.map(ArticleView)}</div>
    </div>
  );
}
