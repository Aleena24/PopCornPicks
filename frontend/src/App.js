import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [movieName, setMovieName] = useState("");
    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState("");

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
        </div>
    );
}

export default App;
