import './App.css';
import Register from './Compo/Register/Form';
import Home from './Compo/Home/Home';
import Navbar from './Compo/Home/Navbar/Sidebar1';
import ProtectedRoute from './Compo/Services/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './Compo/Login/Login';
import Catogary from './Compo/Home/Catogery/catogary';
import CategoryImages from './Compo/Home/Catogery/CategoryImages';
import UserPro from './Compo/Home/UserProfile/UserPro';
import LoaderHome from './Compo/LoaderHome';
import { React, useState, Suspense, useEffect } from 'react';
import AI from './Compo/Home/AI.jsx/AI';
import Test from './Compo/Home/Test/Test';

function App() {
  const location = useLocation();

  const hideNavbarRoutes = ['/login', '/register'];
  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  const [loader, setLoader] = useState(true);

  useEffect(() =>{
    setLoader(true)
    setTimeout(()=>{
      setLoader(false)
    },2000)
  },[])

  return (
    <div style={{textAlign: 'center', alignContent: 'center'}}>
      {loader ? (
        <div className="spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <>
          {showNavbar && <Navbar />}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" index element={<Home />} />
            <Route path="/categories" element={<Catogary />} />
            <Route path="/category/:categoryName" element={<CategoryImages />} />
            <Route path="/ai" element={<AI />} />
            <Route path="/videos" element={<Test />} />
            <Route path="/user-profile" element={<UserPro />} />
          </Routes>
        </>
      )}
    </div>
  );
}

function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWithRouter;
