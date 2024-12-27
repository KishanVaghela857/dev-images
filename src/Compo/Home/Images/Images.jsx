import React, { useState, useEffect } from 'react';
import './ImgCss.css';
import { FaDownload } from 'react-icons/fa';
import LoaderHome from '../../LoaderHome'; // Import LoaderHome component

const Images = ({ searchQuery }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(20);

  const likes = JSON.parse((localStorage.getItem('likes')));

  const fetchImages = async (query) => {
    try {
      setLoading(true); // Show loader when fetching images
      const response = await fetch(
        `https://pixabay.com/api/?key=47626805-dca4344928b047ff72f011d62&q=${query}&image_type=photo&pretty=true`
      );
      const data = await response.json();
      setImages(data.hits);
      setLoading(false); // Hide loader once images are fetched
    
    } catch (error) {
      console.error('Error fetching images:', error);
      setLoading(false); // Hide loader if there is an error
    }
  };


  const openImageDetailsPage = (image) => {
    const detailsPage = window.open('', '_blank');
    const currentLikes = JSON.parse(localStorage.getItem(`likes-${image.id}`)) || image.likes;

    const detailsHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Image Details</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f4f4f4;
          }
          .image-container {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .image-container img {
            max-width: 700px;
            max-height: 500px;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          }
          .details-container {
            flex: 1;
            padding: 20px;
            background: white;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
          }
          .details-container h1 {
            margin-bottom: 20px;
            color: #333;
          }
          .details-container p {
            margin: 10px 0;
            font-size: 18px;
            color: #555;
          }
          .details-container .likes {
            color: red;
          }
          .like-btn, .download-btn {
            display: inline-block;
            margin-top: 10px;
            padding: 10px 20px;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
          }
          .like-btn {
            background-color: #ff5757;
          }
          .like-btn:hover {
            background-color: #ff3a3a;
          }
          .download-btn {
            background-color: #4caf50;
          }
          .download-btn:hover {
            background-color: #45a049;
          }
        </style>
      </head>
      <body>
        <div class="image-container">
          <img src="${image.largeImageURL}" alt="${image.tags}" />
        </div>
        <div class="details-container">
          <h1>Image Details</h1>
          <p><strong>Tags:</strong> ${image.tags}</p>
          <p><strong>Resolution:</strong> ${image.imageWidth} x ${image.imageHeight}</p>
          <p><strong>Views:</strong> ${image.views}</p>
          <p><strong>Likes:</strong> <span id="likes-count" class="likes">❤️ ${currentLikes}</span></p>
          <p><strong>Downloads:</strong> ${image.downloads}</p>
          <button id="like-btn" class="like-btn">Like</button>
          <button id="download-btn" class="download-btn">Download</button>
        </div>
        <script>
          const likeButton = document.getElementById('like-btn');
          const likesCount = document.getElementById('likes-count');
          const downloadButton = document.getElementById('download-btn');
          let likes = ${currentLikes};
          const imageId = ${image.id};

          likeButton.addEventListener('click', () => {
            const isLiked = JSON.parse(localStorage.getItem('liked-' + imageId)) || false;
            if (!isLiked) {
              likes += 1;
              likesCount.textContent = '❤️ ' + likes;
              localStorage.setItem('likes-' + imageId, JSON.stringify(likes));
              localStorage.setItem('liked-' + imageId, JSON.stringify(true));
              likeButton.disabled = true;
              likeButton.textContent = 'Liked';
            }
          });

          downloadButton.addEventListener('click', () => {
            const link = document.createElement('a');
            link.href = '${image.largeImageURL}';
            link.download = 'downloaded-image.jpg';
            link.click();
          });
        </script>
      </body>
      </html>
    `;
    detailsPage.document.write(detailsHTML);
    detailsPage.document.close();
  };




  useEffect(() => {
    fetchImages(searchQuery);
  }, [searchQuery]);

  return (
    <div className="image-grid-container">
      <h1 className="text-center">Your Favorite Images, Ready to Download</h1>
      {loading ? (
        <LoaderHome />
      ) : images.length > 0 ? (
        <div className="image-grid" loading="lazy">
          {images.slice(0, visibleCount).map((image, index) => (
            <div className="card" key={index}>
              <img src={image.webformatURL} alt={image.tags} style={{height: '300px'}}/>
              <div className="overlay">❤️ {image.likes}</div>
              <i className="download-icon" onClick={() => openImageDetailsPage(image)}>
                <FaDownload />
              </i>
            </div>
            ))}
          </div>
        ) : (
          <div className="text-center">No images found matching the search query.</div>
        )}
    </div>
  );
};

export default Images;
