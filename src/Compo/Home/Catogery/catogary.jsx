import React, { useEffect, useState } from 'react';
import './catogaryCss.css';
import { Link } from 'react-router-dom';

function Catogary() {
  const [categoryImages, setCategoryImages] = useState({});
  const [loading, setLoading] = useState(true);

  const categories = [
    { name: 'Technology', description: 'Technology refers to the application of scientific knowledge...' },
    { name: 'People', description: 'People are the driving force of society...' },
    { name: 'Abstract', description: 'Abstract represents ideas, concepts, or art...' },
    { name: 'Animals', description: 'Animals are living creatures that inhabit the earth...' },
  ];

  useEffect(() => {
    const fetchImages = async () => {
      let imagesFetched = 0;
      const totalCategories = categories.length;

      // Fetch an image for each category using the Pixabay API
      for (const category of categories) {
        try {
          const response = await fetch(`https://pixabay.com/api/?key=47626805-dca4344928b047ff72f011d62&q=${category.name}&image_type=photo&pretty=true`);
          const data = await response.json();
          
          if (data.hits && data.hits.length > 0) {
            setCategoryImages((prevImages) => ({
              ...prevImages,
              [category.name]: data.hits[0].webformatURL, // Save the first image URL for each category
            }));
          }
        } catch (error) {
          console.error('Error fetching image:', error);
        }

        // Increment counter and check if all categories have been processed
        imagesFetched += 1;
        // setLoading(true); // All categories fetched
        if (imagesFetched === totalCategories) {
          setLoading(false); // All categories fetched
        }
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <div id="video-category">
        <h2 id="category-title">Image Categories</h2>
        <ul id="category-list">
          <div id="catogary">
            {loading ? (
              <div className="loader">Loading...</div> // Add a loading message or spinner here
            ) : (
              categories.map((category, index) => (
                <div className="card" style={{ width: '18rem' }} key={index}>
                  <img
                    src={categoryImages[category.name] || 'default-image-url'} // Default image URL in case the API fails
                    className="card-img-top"
                    alt={category.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title" id="text">{category.name}</h5>
                    <p className="card-text" id="text">{category.description}</p>
                    <Link to={`/category/${category.name}`} className="btn btn-outline-danger">
                      View Images
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </ul>
      </div>
    </div>
  );
}

export default Catogary;
