import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css';

const Homepage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/posts');
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="home-container">
      <div className="navbar">
        <Link to="/login">Login</Link>
        <Link to="/discussion">Discussion</Link>
        <Link to="/faq">FAQ</Link>
      </div>

      <div className="content">
        <h1>Welcome to our Discussion</h1>
        <div>
          {loading ? (
            <p>Loading posts...</p>
          ) : (
            <div>
              <h2>Recent Posts</h2>
              {posts.length === 0 ? (
                <p>No posts available.</p>
              ) : (
                posts.map((post) => (
                  <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.content.substring(0, 100)}...</p>
                    <Link to={`/posts/${post.id}`}>Read More</Link>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
        <Link to="/postform">Submit a Question/Post</Link>
      </div>
    </div>
  );
};

export default Homepage;
