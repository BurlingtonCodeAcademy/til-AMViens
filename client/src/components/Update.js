//import dependencies
import { useState, useEffect } from "react";
import "../App.css";

//function to update or remove posts
function Update(props) {
  const [posts, setPosts] = useState([]);
  let postsId = window.location.pathname.replace("/edit", "");


//use effect fetches post by id to be updated
  useEffect(() => {
    if (posts.length === 0) {
      fetch("/api" + postsId)
        .then((res) => res.json())
        .then((updateContents) => {
          setPosts(updateContents);
        });
    }
  });


  //renders form with previous content to be updated
  return (
      <div id="update-form">
          <form id="form" action={`/edit${postsId}`} method="POST">
              <input name="title" type="text" placeholder={posts.title} />
              <input name="author" type="text" placeholder={posts.author} />
              <input name="topic" type="text" placeholder={posts.topic} />
              <input name="date" type="date" placeholder={posts.date} />
              <textarea name="content" placeholder={posts.content} />
              <input type="submit"/>
          </form>
          <button id="button" onClick={() => {
              fetch("/delete" + posts.id)
          }}>Remove Post</button>
      </div>



  )
}

export default Update;
