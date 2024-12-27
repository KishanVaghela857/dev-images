import React, { useState, useEffect } from 'react';

const Albums = () => {
  const [albums, setAlbums] = useState([]); // State to hold album data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch API data
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/albums');
        if (!response.ok) {
          throw new Error('Failed to fetch albums');
        }
        const data = await response.json();
        setAlbums(data); // Save data to state
      } catch (err) {
        setError(err.message); // Save error message
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchAlbums();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Show a loading message or error if needed
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Album List</h1>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            <strong>{album.title}</strong> (ID: {album.id})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Albums;
