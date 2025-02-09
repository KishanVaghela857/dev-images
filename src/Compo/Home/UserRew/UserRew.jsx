import React, { useState } from 'react';

function UserRew() {
  // Sample user data
  const [userStar, setStar] = useState([
    { id: 1, name: 'John Doe', rating: 4, review: 'Great experience!' },
    { id: 2, name: 'Jane Smith', rating: 5, review: 'Excellent service!' },
    { id: 3, name: 'Alice Brown', rating: 3, review: 'Good but can be better.' },
    { id: 4, name: 'krishna', rating: 5, review: 'very usefull for wallpaper.' },
  ]);

  return (
        <div className="my-3"  style={{textAlign: 'center', fontFamily: 'sans-serif',}}>
            {/* <h1 style={{ fontSize: '30px' , fontWeight: 'bolder'}}>...Rating...</h1> */}
      <div className="container d-flex" style={{maxWidth: '800px'}}>
      {userStar.map((user) => {
        const { id, name, rating, review } = user;
        return ( <div style={{display: 'flex'}}>
          <div key={id} id="rewCard" style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', borderRadius: '5px',  maxWidth: '500px'}}>
            <h3 id="username" style={{ marginBottom: '5px' }}>{name}</h3>
            <div>
              {/* Render stars dynamically based on the rating */}
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  style={{
                    fontSize: '30px',
                    color: index < rating ? '#FFD700' : '#CCCCCC',
                    cursor: 'default',
                  }}
                >
                  ★
                </span>
              ))}
            </div>
            <p id="userDe" style={{ marginTop: '10px', color: 'black' }}>{review}</p>
          </div>
          </div>
        );
    })}
    </div>
    </div>
  );
}

export default UserRew;
