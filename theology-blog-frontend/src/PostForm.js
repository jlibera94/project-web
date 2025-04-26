import React, { useState } from 'react';
import axios from 'axios';

function PostForm() {
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/post', { content });
      setMessage(res.data);
    } catch (err) {
      setMessage(err.response?.data || 'Post submission failed');
    }
  };

  return (
    <div>
      <h2>Submit Post</h2>
      <form onSubmit={handleSubmit}>
        <textarea name="content" placeholder="Write your post here..." onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default PostForm;
