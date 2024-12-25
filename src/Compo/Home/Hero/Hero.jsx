import React, { useState } from 'react';
import './HeroCss.css'

function Hero({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim() !== '') {
            onSearch(searchTerm);
            // Call the parent-provided onSearch function

            setSearchTerm('');
        }
    };

    return (
        <div className="card text-center">
            <div className="card-header"></div>
            <div className="card-body uniq">
                <h2 className="card-title my-3">Search and discover your favorite photos in just one click!</h2>
                <p className="card-text">Discover stunning, high-quality images by simply entering a keyword. Whether you're looking for inspiration or the perfect picture, start your search now and explore endless possibilities!</p>
                <nav id="navbar " className='navbar-light'>
                    <div class="">
                        <form id='form'
                            onSubmit={handleSubmit}>
                            <input
                                className="form-control"
                                type="search"
                                placeholder="Search images here..."
                                aria-label="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)} />
                            <button class="btn btnall"  type="submit">Search</button>
                        </form>
                    </div>
                </nav>


            </div>
            <div className="card-footer text-muted"></div>
        </div>
    );
}

export default Hero;
