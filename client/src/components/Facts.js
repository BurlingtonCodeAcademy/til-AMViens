//importing dependencies from react and react-router-dom
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//function uses useEffect to fetch all posts
function Facts(props) {
    const [postNames, setPostNames] = useState([]);
  
    useEffect(() => {
      if (postNames.length === 0) {
        fetch("/api")
          .then((res) => res.json())
          .then((postList) => {
            setPostNames(postList);
          });
      }
    });
    //rendering of Posts with link to edit individual post
    return (
      <div id="main">
        <ul id="postContainer">
          {postNames.map((post, index) => {
            return (
            <div>
              <h1 key={index + "title"}>{post.title}</h1>
              <h4 key={index + "date"}>{post.date}</h4>
              <h2 key={index + "author"}>{post.author}</h2>
              <h3 key={index + "topic"}>{post.topic}</h3>
              <p key={index + "content"}>{post.content}</p>
              <Link to={"/edit/" + post._id}>
                  <button id="button">Edit</button>
              </Link>
            </div>
            );
          })}
        </ul>
      </div>
    );
  }
  
  export default Facts;