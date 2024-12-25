import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
// import Navbar from './Navbar/Sidebar1';
import Hero from './Hero/Hero';
import Images from './Images/Images';
import Catogary from './Catogery/catogary';
// import CategoryPage from './Catogery/CategoryPage'; // Import CategoryPage component
import Footer from './Navbar/Footer/Footer';
// import AI from './AI.jsx/AI'
import UserStar from './UserRew/UserRew'
import UserPro from './UserProfile/UserPro';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      {/* <Navbar /> */}
      <Hero onSearch={handleSearch} />
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Catogary />} />

        {/* Dynamic Category Page */}
{/* <Route path="/category/" element={<CategoryPage />} /> */}
      </Routes>
      <Images searchQuery={searchQuery} />
      <Routes>

      <Route path='./UserProfile' element={<UserPro/>}/> 
      </Routes>

      {/* Render Images Component only on specific routes */}
      {/* <AI/> */}
      <UserStar/>
      <Footer />
    </div>
  );
};

export default Home;
