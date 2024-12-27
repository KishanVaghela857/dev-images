import React from 'react';
import imgLogo from './img/logo.avif';
import './sidebarCss.css';
import { Link, useNavigate } from 'react-router-dom';

function Sidebar1() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = localStorage.getItem('loggedin');
  const username = user?.username || 'Guest';
  const profileImage = user?.profileImage || 'https://via.placeholder.com/40';
  const userData = JSON.parse(localStorage.getItem('userData')) || { Logo: '' }

  const handleLogOut = () => {
    localStorage.removeItem('loggedin');
    navigate('/login');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <img src={imgLogo} className="imgLogo" alt="Logo" />
          <h3>Dev Images</h3>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/Compo/Home/Test/Test">
                  Test
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" to="/Compo/Home/AI.jsx/AI">
                  AI
                </Link>
              </li> */}
              {/* <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  More
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to="/quotes">
                      Quotes
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/category">
                      Category
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/something-else">
                      Something else here
                    </Link>
                  </li>
                </ul>
              </li> */}
            </ul>

            {/* User Profile/Logout Section */}
            <div className="nav-item dropdown ms-auto">
              {isLoggedIn ? (
                <Link
                  className="nav-link dropdown-toggle d-flex align-items-center"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >

                  {username}
                </Link>
              ) : (
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              )}
              {isLoggedIn && (
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                  <li>
                    <Link className="dropdown-item" to="/Compo/Home/UserProfile/UserPro">
                      Profile
                    </Link>
                  </li>
                  {/* <li>
                    <Link className="dropdown-item" to="/">
                      Settings
                    </Link>
                  </li> */}
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogOut}>
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
            <img
              src={userData.Logo || "https://cdn-icons-png.flaticon.com/512/9187/9187604.png"}
              alt=""
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                marginRight: '10px'
              }}
            />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar1;
