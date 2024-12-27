import './App.css';
import Register from './Compo/Register/Form';
import Home from './Compo/Home/Home';
import Navbar from './Compo/Home/Navbar/Sidebar1'; // Assuming your Navbar component is in this path
import ProtectedRoute from './Compo/Services/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './Compo/Login/Login';
import Catogary from './Compo/Home/Catogery/catogary';
import CategoryImages from './Compo/Home/Catogery/CategoryImages';
import UserPro from './Compo/Home/UserProfile/UserPro';
import LoaderHome from './Compo/LoaderHome';
import { Suspense } from 'react';
import AI from './Compo/Home/AI.jsx/AI'
import Test from './Compo/Home/Test/Test'

function App() {
  const location = useLocation();

  // Define the routes where Navbar should be hidden
  const hideNavbarRoutes = ['/login', '/register'];
  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Suspense fallback={<div>{LoaderHome}</div>}>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
          <Route path="/" index element={<Home />} />
        {/* <Route element={<ProtectedRoute />}> */}
          {/* <Route path="/" index element={<LoaderHome/>}/> */}
          <Route path="/categories" element={<Catogary />} />
          <Route path="/category/:categoryName" element={<CategoryImages />} />
          <Route path="/Compo/Home/AI.jsx/AI" element={<AI/>} />
          {/* <Route path="/Compo/Home/Test/Test" element={<Test/>} /> */}
          
          <Route path='/Compo/Home/UserProfile/UserPro' element={<UserPro/>}/>
        {/* </Route> */}
      </Routes>
      </Suspense>
    </>
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