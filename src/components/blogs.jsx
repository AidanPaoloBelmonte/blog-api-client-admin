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

  function generateBlogEntry({ id, title, creationDate }) {
    return (
      <Link key={id} className="blogEntry" to={`/blogs/${id}`} viewTransition>
        <p className="blogTitle">{title}</p>
        <p className="publishDate">{new Date(creationDate).toDateString()}</p>
      </Link>
    );
  }

  function displayBlogs() {
    if (blogs?.blogs) {
      const formattedBlogs = blogs.blogs.map((blog) => {
        return generateBlogEntry(blog);
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
