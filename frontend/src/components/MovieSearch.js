import React, { useState } from "react";

const MovieSearch = ({ setError, setRecommendations }) => {
  const [movieName, setMovieName] = useState("");

  const handleSearch = async () => {
    try {
      const response = await fetch("http://localhost:5000/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movie_name: movieName }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error fetching recommendations.");
      }

      const data = await response.json();
      setRecommendations(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="movie-search">
      <input
        type="text"
        value={movieName}
        onChange={(e) => setMovieName(e.target.value)}
        placeholder="Enter movie name"
      />
      <button onClick={handleSearch}>Get Recommendations</button>
    </div>
  );
};

export default MovieSearch;
