import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import axios from 'axios'
import { Link } from 'react-router-dom'



function App() {
  const [posts, setPosts] = useState(["hello"])

  const fetchPosts = () => {
    axios.get(`${process.env.REACT_APP_API}/posts`)
      .then(response => {
        // console.log(response);
        setPosts(response.data.posts)
      })
      .catch(err => alert('Error fetching posts'))
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className="container pb-5">
      <Nav />
      <br />
      <h1>MERN CRUD</h1>
      <hr />
      {
        posts.map((post, i) => (
          <div className="row" key={i} style={{ borderBottom: '1px solid silver' }} >
            <div className="col pt-3 pb-2">
              <div className="row">
                <div className="col-md-10">
                  <Link to={`/post/${post.slug}`}><h2>{post.title}</h2></Link>
                  <p className="lead">{post.content}</p>
                  <p>Author <span className="badge">{post.user}</span> Published on{' '}<span className="badge">{new Date(post.createdAt).toLocaleString()}</span></p>
                </div>
                <div className="col-md-2">
                  <Link to={`/post/update/${post.slug}`} className="btn btn-sm btn-outline-warning">
                    Update
                  </Link>
                  <button className="btn btn-sm btn-outline-danger ml-1">Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default App;
