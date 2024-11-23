import React, { useState, useEffect } from 'react';

function App() {
  const [posts, setPosts] = useState([]); // State to hold the posts
  const [error, setError] = useState(null); // State to hold any error messages

  useEffect(() => {
    // Function to fetch posts from the API
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts'); // API call
        if (!response.ok) { // Check if response is not ok
          throw new Error('Data fetching failed'); // Throw an error
        }
        const data = await response.json(); // Parse the JSON from the response
        setPosts(data); // Set the posts state
      } catch (error) {
        setError(error.message); // Catch and set the error message
      }
    };

    fetchPosts(); // Call the fetch function
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      <h1>Blog Posts</h1>
      {error && <h1 style={{ color: 'red' }}>{error}</h1>} {/* Display error message in h2 tags */}
      {posts.length === 0 && !error && <p>Loading posts...</p>} {/* Loading state */}
      {posts.map(post => (
        <div key={post.id} style={{ marginBottom: '20px' }}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
