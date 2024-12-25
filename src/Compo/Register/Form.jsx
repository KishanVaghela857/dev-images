import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './FormCss.css';

function Form() {
    const [formData, setFormData] = useState({ email: '', password: '', username: '' }); //, age: '', hobby: '', address: ''
    const [error, setError] = useState({ email: '', password: '', username: '' });  //, age: '', hobby: '', address: '' 
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validation logic
        const newError = {};
        if (!formData.username || formData.username.length < 4) {
            newError.username = "*Please enter a username with at least 4 characters";
        }
        if (!formData.email) {
            newError.email = "*Please fill out the email field";
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                newError.email = "*Please enter a valid email address";
            }
        }

        if (!formData.password || formData.password.length < 8) {

            const error = newError.password = "*Please enter a password with at least 8 characters";
            setTimeout(() => {
                setError({ ...error, password: '' });
            }, 2000);
        }

        // if (!formData.age || parseInt(formData.age, 10) < 18) {
        //     newError.age = "*Please enter an age and make sure you're 18+";
        // }

        // if (!formData.hobby) {
        //     newError.hobby = "*Please select a hobby";
        // }

        // if (!formData.address) {
        //     newError.address = "*Please enter your address";
        // }

        if (Object.keys(newError).length > 0) {
            setError(newError);
            return;
        }

        // Store data and navigate if validation passes
        localStorage.setItem('user', JSON.stringify(formData));
        alert("Logged in successfully!");
        navigate('/login'); //

        // Reset form
        setFormData({ email: '', password: '', username: '' });//, age: '', hobby: '', address: ''
        setError({});
    };

    return (
<>

            <div className="container-all">
                <div className="left-container">
                    <div className="left-container-text">
                        <h1 className='Logo'>Register</h1>
                        <h3>Hi, there!</h3>
                        <p>
                        Register to access your account and explore your favorite images. Manage your collection and discover more personalized content!
                        </p>
                        <Link to="/login">
                            <button className="btn">Log In</button>
                        </Link>
                    </div>
                </div>
       

                <div className="login-container">

                    <div className='container'>
                        <form onSubmit={handleSubmit}>

                        <h2 className='Logo'>Register</h2>

                            <label>
                                <input
                                    type="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    placeholder='Enter username'
                                />
                                {error.username && <p>{error.username}</p>}
                            </label>
                            <label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder='Enter Email'
                                />
                                {error.email && <p>{error.email}</p>}
                            </label>

                            <label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder='Enter Password'
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? "Hide" : "Show"} Password
                                </button>
                                {error.password && <p>{error.password}</p>}
                            </label>

                            {/* <label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        placeholder='Enter Age'
                    />
                    {error.age && <p>{error.age}</p>}
                </label> */}
                            {/* 
                <label>
                    Hobby:
                    <select
                        name="hobby"
                        value={formData.hobby}
                        onChange={(e) => setFormData({ ...formData, hobby: e.target.value })}
                    >
                        <option value="">Select a hobby</option>
                        <option value="reading">Reading</option>
                        <option value="painting">Painting</option>
                        <option value="coding">Coding</option>
                        <option value="other">Other</option>
                    </select>
                    {error.hobby && <p>{error.hobby}</p>}
                </label> */}
                            {/* 
                <label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder='Enter Address'
                    />
                    {error.address && <p>{error.address}</p>}
                </label> */}

                            <input type="submit" value="Register" id='Submit' />
                            {/* <span>I already have a account <Link to="/login">Log In</Link> here</span> */}
                        </form>
                    </div>
                </div>
                </div>
                </>
                );
}

                export default Form;
