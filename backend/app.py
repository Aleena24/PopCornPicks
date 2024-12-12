from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

# Load your movie dataset
movies_df = pd.read_csv('.\data\movies.csv')  # Ensure your dataset is named correctly

# Function to recommend movies based on genre
def recommend_movies(movie_name):
    movie_name = movie_name.lower()
    try:
        selected_movie = movies_df[movies_df['Movie Name'].str.lower() == movie_name].iloc[0]
        genre = selected_movie['Genre']
        recommended = movies_df[movies_df['Genre'] == genre].head(10).to_dict(orient='records')
        return recommended
    except IndexError:
        return []  # No movie found

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.json
    movie_name = data.get('movie_name', '')
    recommendations = recommend_movies(movie_name)
    if recommendations:
        return jsonify({"success": True, "data": recommendations})
    else:
        return jsonify({"success": False, "message": "Movie not found or no recommendations available."})

if __name__ == '__main__':
    app.run(debug=True)
