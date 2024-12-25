import React, { useState } from 'react';
import './Pro.css';

function UserPro() {
    const user = JSON.parse(localStorage.getItem('user')) || { username: '', email: '', phoneNumber: '' };
    const userData = JSON.parse(localStorage.getItem('userData')) || {username: '', email: '', PhoneNumber: '', Location: '', User_age: '', Logo: '' };

    const [formData, setFormData] = useState({
        username: user.username || '',
        email: user.email || '',
        PhoneNumber: userData.PhoneNumber || '',
        Location: userData.Location || '',
        User_age: userData.User_age || '',
        Logo: userData.Logo || ''
    });

    const [showEditForm, setShowEditForm] = useState(false);

    // const updateForm = {
    //     username: formData.username,
    //     email: formData.email,
        
    // }

    const handleSave = (event) => {
        event.preventDefault();
        localStorage.setItem('userData', JSON.stringify(formData));
        localStorage.setItem('user', JSON.stringify({...user, username: formData.username}));
        setShowEditForm(false);



//         if(!formData.age <= 15){
// alert('you are not allowed to')
//         }

    };

    const handleEdit = () => {
        setShowEditForm(true);
    };

    const uploadImg = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            setFormData({ ...formData, Logo: e.target.result });
        };
        reader.readAsDataURL(file);
    };

    return (
        <>
            <div id='profile-container'>
                <div id='profile-header'>
                    <img
                        id='profilePic'
                        src={formData.Logo || 'https://cdn-icons-png.flaticon.com/512/9187/9187604.png'}
                        alt="user"
                    />
                    <h1>{user.username || 'Guest User'}</h1>
                </div>
                <div id='profile-details'>
                    <h4><b>Email:</b> {user.email || 'No Email Provided'}</h4>
                    <hr />
                    <h4><b>Phone: +91 </b>{formData.PhoneNumber || '000000000'}</h4>
                    <hr />
                    <h4><b>Location: </b>{formData.Location || 'Enter Your Location'}</h4>
                    <hr />
                    <h4><b>Age: </b>{formData.User_age || 'Enter Your Age'}</h4>
                    <hr />
                    <button id='edit-button' onClick={handleEdit}>Edit Data</button>
                </div>
            </div>

            {showEditForm && (
                <div id='edit-container'>
                    <form id='edit-form' onSubmit={handleSave}>
                        <input
                            type="username"
                            name="username"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            placeholder="change username"
                            
                        />
                        <br />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="change email"
                        />
                        <br />
                        <input
                            type="number"
                            name="PhoneNumber"
                            value={formData.PhoneNumber}
                            onChange={(e) => setFormData({ ...formData, PhoneNumber: e.target.value })}
                            placeholder="Enter Phone Number"
                        />
                        <br />
                        <input
                            type="text"
                            name="Location"
                            value={formData.Location}
                            onChange={(e) => setFormData({ ...formData, Location: e.target.value })}
                            placeholder="Enter Location"
                        />
                        <br />
                        <input
                            type="number"
                            name="User_age"
                            value={formData.User_age}
                            onChange={(e) => setFormData({ ...formData, User_age: e.target.value })}
                            placeholder="Enter Age"
                        />
                        <br />
                        <label htmlFor="profile-upload">Upload Profile Picture</label>
                        <input
                            id="profile-upload"
                            type="file"
                            onChange={uploadImg}
                        />
                        <br />
                        <input type="submit" value="Save" id="save-button" />
                        <button type="button" id="cancel-button" onClick={() => setShowEditForm(false)}>Cancel</button>
                    </form>
                </div>
            )}
        </>
    );
}

export default UserPro;
