import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function CategoryImages() {
  const { categoryName } = useParams(); // Get category name from URL
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch images for the selected category
    fetch(`https://pixabay.com/api/?key=47626805-dca4344928b047ff72f011d62&q=${categoryName}&image_type=photo&pretty=true`)
      .then((response) => response.json())
      .then((data) => {
        if (data.hits && data.hits.length > 0) {
          setImages(data.hits); // Save all fetched images
        }
      })
      .catch((error) => console.error('Error fetching images:', error));
  }, [categoryName]);

  return (
    <div style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '20px' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '20px', textTransform: 'capitalize' }}>{categoryName} Images</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
        {images.map((image, index) => (
          <div
            key={index}
            style={{
              width: '300px',
              border: '1px solid #ddd',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              textAlign: 'center',
              transition: 'transform 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <img
              src={image.webformatURL}
              alt={image.tags}
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <div style={{ padding: '10px' }}>
              <p style={{ fontSize: '0.9rem', color: '#555', margin: '10px 0' }}>{image.tags}</p>
              <a
                href={image.largeImageURL}
                
                style={{
                  display: 'inline-block',
                  padding: '10px 20px',
                  backgroundColor: '#f04e30',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '5px',
                  fontSize: '0.9rem',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                }}
              >
                Download
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryImages;
