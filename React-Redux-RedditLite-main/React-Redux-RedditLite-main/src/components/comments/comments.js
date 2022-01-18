import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectComments, selectPermalink } from "../comments/commentsSlice";
import { selectArticles } from "../searchBarAndButton/searchBarandButtonSlice";
import "./comments.css";

// export function displayContainer(e) {
//   e.preventDefault();
//   var border = document.getElementById("container");
//   border.style.display = 'block';
// }

export default function Comments() {
  const articles = useSelector(selectArticles);
  const dispatch = useDispatch();
  const comments = useSelector(selectComments);
  let permalink = useSelector(selectPermalink);

  // function getTime(article) {
  //     let time = article.data.created;
  //     return time.toLocaleString();
  // }

  function displayExtraInfo() {
    const article = articles.find(
      (article) => article.data.permalink === permalink
    );
    return (
      <div>
        <h5>{article.data.title}</h5>
        <h6>Posted By: {article.data.author}</h6>
        <img className="article-img" src={article.data.url} alt="realted to the article"/>
        {/* <h6>Time posted: {getTime()}</h6> */}
        <h6>Subreddit: {article.data.subreddit}</h6>
        <h6>Comments: {article.data.num_comments}</h6>
        <h6>Up Votes: {article.data.ups}</h6>
        <h6>Down Votes: {article.data.downs}</h6>
        {comments.map((comment, i) => (
          <p key={i} class="results">
            {" "}
            <span className="commentAuthor">{comment.data.author}</span>
            {comment.data.body}{" "}
          </p>
        ))}
      </div>
    );
   }
  

  function headline() {
    if (comments.length === 0 && articles.length > 0) {
      return (
        <h4 className="headline">
          Hi! Click away for a list of associated comments!
        </h4>
      );
    }
  }

  return (
    <div>
      <div class="headline">{headline()}</div>
      <div id="container">
        { displayExtraInfo() }
      </div>
    </div>
  );
}
