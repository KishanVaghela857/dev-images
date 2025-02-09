import React from 'react';
import './LoaderHome.css'; // Make sure to include the CSS for the loader

const LoaderHome = () => {
  return (
    <div class="loading" style={{textAlign: 'center'}}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default LoaderHome;
