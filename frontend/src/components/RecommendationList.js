import React from "react";

const RecommendationList = ({ recommendations }) => {
  if (!recommendations.length) return <p>No recommendations found.</p>;

  return (
    <table className="recommendation-table">
      <thead>
        <tr>
          <th>Movie Name</th>
          <th>Rating</th>
          <th>Genre</th>
          <th>Year</th>
        </tr>
      </thead>
      <tbody>
        {recommendations.map((rec, index) => (
          <tr key={index}>
            <td>{rec.Movie_Name}</td>
            <td>{rec.Movie_Rating}</td>
            <td>{rec.Genre}</td>
            <td>{rec.Year_of_Release}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RecommendationList;
