import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [movieName, setMovieName] = useState("");
    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState("");
    const [footerModal, setFooterModal] = useState(null); // Handle modal for About/Contact

    const fetchRecommendations = async () => {
        setError("");
        try {
            const response = await axios.post("http://127.0.0.1:5000/recommend", {
                movie_name: movieName,
            });
            if (response.data.success) {
                setRecommendations(response.data.data);
            } else {
                setError(response.data.message);
                setRecommendations([]);
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
        }
    };

    const openModal = (type) => setFooterModal(type);
    const closeModal = () => setFooterModal(null);

    return (
        <div className="App">
            <h1>PopCornPicks</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Enter a movie name..."
                    value={movieName}
                    onChange={(e) => setMovieName(e.target.value)}
                />
                <button onClick={fetchRecommendations}>Get Recommendations</button>
            </div>
            {error && <p className="error">{error}</p>}
            <div className="recommendations">
                {recommendations.map((movie, index) => (
                    <div key={index} className="movie-card">
                        <h3>{movie["Movie Name"]}</h3>
                        <p>Genre: {movie.Genre}</p>
                        <p>Year: {movie["Year of Release"]}</p>
                        <p>Rating: {movie["Movie Rating"]}</p>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <footer className="footer">
                <button onClick={() => openModal("about")}>About</button>
                <button onClick={() => openModal("contact")}>Contact</button>
            </footer>

            {/* Modal for About/Contact */}
            {footerModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()} // Prevent modal close on content click
                    >
                        <button className="close-button" onClick={closeModal}>
                            &times;
                        </button>
                        {footerModal === "about" && (
                            <>
                                <h2>About PopCornPicks</h2>
                                <p>
                                    PopCornPicks is your ultimate movie recommendation app. Discover the best movies and explore
                                    genres with ease. Built for movie enthusiasts by movie enthusiasts.
                                </p>
                            </>
                        )}
                        {footerModal === "contact" && (
                            <>
                                <h2>Contact Us</h2>
                                <p>
                                    We'd love to hear from you! Reach out to us for feedback or queries:
                                    <br />
                                    <strong>Email:</strong> support@popcornpicks.com
                                    <br />
                                    <strong>Phone:</strong> +1-800-POPCORN
                                </p>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
