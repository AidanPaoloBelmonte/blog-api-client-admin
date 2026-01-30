import { useState, useEffect } from "react";
import { Link } from "react-router";
import axios from "axios";

import "../res/blogOverview.css";

export default function Blogs() {
  const [blogs, setBlogs] = useState({});

  useEffect(() => {
    async function getBlogs() {
      setBlogs({});
      const response = await axios.get("http://localhost:3000/blogs");

      setBlogs(response.data);
    }

    getBlogs();
  }, []);

  function onTogglePublish(index, id) {
    return async () => {
      const response = await axios.post(`http://localhost:3000/blogs/${id}`, {
        withCredentials: true,
      });

      if (!response?.data?.error) {
        const newState = { ...blogs };
        newState.blogs[index].published = response?.data?.published;
        setBlogs(newState);
      }
    };
  }

  function onDelete(index, id) {
    return async () => {
      const response = await axios.delete(`http://localhost:3000/blogs/${id}`, {
        withCredentials: true,
      });

      console.log(response);

      if (!response?.data?.error) {
        const newState = { ...blogs };
        console.log(newState);
        newState.blogs.splice(index, 1);
        setBlogs(newState);
      }
    };
  }

  function generateBlogEntry(index, { id, title, creationDate, published }) {
    return (
      <div key={id} className="blogEntry">
        <Link className="blogDetails" to={`/blogs/${id}`} viewTransition>
          <p className="blogTitle">{title}</p>
          <p className="publishDate">{new Date(creationDate).toDateString()}</p>
        </Link>
        <div className="buttons">
          <button
            className={published ? "negative" : ""}
            type="button"
            onClick={onTogglePublish(index, id)}
          >
            {published ? "Unpublish" : "Publish"}
          </button>
          <button className="negative" onClick={onDelete(index, id)}>
            Delete
          </button>
        </div>
      </div>
    );
  }

  function displayBlogs() {
    if (blogs?.blogs) {
      const formattedBlogs = blogs.blogs.map((blog, index) => {
        return generateBlogEntry(index, blog);
      });
      return <div className="blogList">{formattedBlogs}</div>;
    } else if (blogs?.error) {
      return <p>blogs.error</p>;
    } else {
      return <p>Fetching...</p>;
    }
  }

  return (
    <>
      <section className="baseSection blogSection">
        <div className="flex row apart middle">
          <h2>Recent Posts</h2>
          <Link className="asButton" to="/new" viewTransition>
            New Post
          </Link>
        </div>
        {displayBlogs()}
      </section>
    </>
  );
}
