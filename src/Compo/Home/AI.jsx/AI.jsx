import React, { useState, useEffect } from 'react';

const Albums = () => {
  const [albums, setAlbums] = useState([]); // State to hold album data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [selectedAlbum, setSelectedAlbum] = useState(null); // State for the selected album (for popup)

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
          <li key={album.id} onClick={() => setSelectedAlbum(album)} style={{ cursor: 'pointer' }}>
            <strong>{album.title}</strong> (ID: {album.id})
          </li>
        ))}
      </ul>

      {/* Popup Modal */}
      {selectedAlbum && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <h2>Album Details</h2>
            <p><strong>Title:</strong> {selectedAlbum.title}</p>
            <p><strong>ID:</strong> {selectedAlbum.id}</p>
            <button onClick={() => setSelectedAlbum(null)} style={modalStyles.closeButton}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Basic styles for the modal
const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '300px',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: '10px',
    padding: '10px 20px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: '#fff',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Albums;
