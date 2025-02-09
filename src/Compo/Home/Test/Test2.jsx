import React, { useState, useEffect } from 'react';
import './style.css';

const Test2 = () => {
    const [apiVideo, setApiVideo] = useState([]);
    const [loader, setLoader] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const URL =
            'https://pixabay.com/api/videos/?key=48039027-3ef12513b3ed8d530db2a5135&q=india&pretty=true';
        setLoader(true);

        const fetchData = async () => {
            try {
                const response = await fetch(URL);
                const data = await response.json();
                console.log(data);
                setApiVideo(data.hits);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoader(false);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim() !== '') {
            // Fetch videos based on the search term
            const searchURL = `https://pixabay.com/api/videos/?key=48039027-3ef12513b3ed8d530db2a5135&q=${searchTerm}&pretty=true`;
            setLoader(true);

            const fetchSearchData = async () => {
                try {
                    const response = await fetch(searchURL);
                    const data = await response.json();
                    console.log(data);
                    setApiVideo(data.hits);
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    setLoader(false);
                }
            };

            fetchSearchData();
            setSearchTerm('');
        }
    };

    return (
        <>
        <form id="form" onSubmit={handleSubmit}>
                        <input
                            className="form-control"
                            type="search"
                            placeholder="Search videos here..."
                            aria-label="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="btn btn-primary" type="submit">
                            Search
                        </button>
                    </form>
                  <div id="allCenter">
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
                <div className="card-container">
                    {apiVideo.map((video, index) => (
                        <div key={index} className="card">
                            <img
                                src={video.videos.small.thumbnail || 'https://via.placeholder.com/150'}
                                className="card-img-top"
                                alt={video.tags || 'Video Thumbnail'}
                            />
                            <div className="card-body">
                                <p className="card-text">
                                    Explore this amazing video tagged with "{video.tags.slice(0, 25)}".
                                </p>
                                <a
                                    href={video.videos.medium.url}
                                    className="btn btn-primary"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    >
                                    Watch Video
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
            </>
    );
};

export default Test2;
