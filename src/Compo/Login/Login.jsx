import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LoginCss.css'

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState({ loginSuccess: null });
    const navigate = useNavigate();

    const toggleBodyScroll = (disableScroll) => {
        if (disableScroll) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    };

    const handleLogin = (event) => {
        event.preventDefault();

        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

        if (!storedUser.email || !storedUser.password) {
            alert('No user found! Please register first.');
            return;
        }

        if (
            formData.email === storedUser.email &&
            formData.password === storedUser.password
        ) {
            setError({ loginSuccess: true }); // Successful login
            toggleBodyScroll(true);
            setTimeout(() => {
                setError({ loginSuccess: null }); // Clear success message
                toggleBodyScroll(false);
            }, 1500);
            localStorage.setItem('loggedin', true);
            setTimeout(() => {
                navigate('/'); // Redirect to home page
            }, 2000);
        } else {
            setError({ loginSuccess: false }); // Invalid credentials
            toggleBodyScroll(true);
            setTimeout(() => {
                setError({ loginSuccess: null }); // Clear error message
                toggleBodyScroll(false);
            }, 1700);
        }
    };

    return (
        <>
            {error.loginSuccess === true && (
                <div
                    className="alert alert-success"
                    role="alert"
                    style={{
                        position: 'fixed',
                        top: '20px',
                        justifyContent: 'center',
                        display: 'flex',
                        right: '20px',
                        zIndex: '1000',
                        background: '#d4edda',
                        color: '#155724',
                        padding: '15px',
                        borderRadius: '5px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                        width: '300px',
                    }}
                >
                    Logged in successfully! Redirecting...
                </div>
            )}
            {error.loginSuccess === false && (
                <div
                    className="alert alert-danger"
                    role="alert"
                    style={{
                        position: 'fixed',
                        top: '20px',
                        justifyContent: 'center',
                        display: 'flex',
                        right: '20px',
                        zIndex: '1000',
                        background: '#f8d7da',
                        color: '#721c24',
                        padding: '15px',
                        borderRadius: '5px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                        width: '300px',
                    }}
                >
                    Invalid credentials! Please try again.
                </div>
            )}

            <div className="container-all">
                <div className="left-container">
                    <div className="left-container-text">
                        <h1 className='Logo'>Login</h1>
                        <h3>Hi, there!</h3>
                        <p>
                        Login to access your account and explore your favorite images. Manage your collection and discover more personalized content! 
                        </p>
                        <Link to="/register">
                            <button className="btn">Register</button>
                        </Link>
                    </div>
                </div>

                <div className="login-container">


                    <form onSubmit={handleLogin} className="login-form">
                        <h2 className='Logo'>Login</h2>
                        <label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="Enter Email"
                                required
                            />
                        </label>

                        <label className="relative-label">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder="Enter Password"
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle-button"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </label>

                        <input type="submit" value="Log In" id="Submit" />
                        <span>
                            Don't have an account? <Link to="/register">Register</Link> here!
                        </span>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
