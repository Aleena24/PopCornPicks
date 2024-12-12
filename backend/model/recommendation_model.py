import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer

# Load dataset
data = pd.read_csv("data/movies.csv")

def preprocess_data():
    # Combine features for similarity
    data['combined_features'] = data['Genre'] + " " + data['Stars'] + " " + data['Director']
    return data

data = preprocess_data()

def get_recommendations(movie_name, year=None, actor=None):
    if movie_name not in data['Movie Name'].values:
        raise ValueError("Movie not found in the dataset.")

    # Filter by year and actor if provided
    filtered_data = data.copy()
    if year:
        filtered_data = filtered_data[filtered_data['Year of Release'] == int(year)]
    if actor:
        filtered_data = filtered_data[filtered_data['Stars'].str.contains(actor, na=False)]

    if filtered_data.empty:
        return []

    # Vectorize combined features for similarity
    vectorizer = CountVectorizer().fit_transform(filtered_data['combined_features'])
    similarity = cosine_similarity(vectorizer)

    # Find the index of the input movie
    idx = filtered_data[filtered_data['Movie Name'] == movie_name].index[0]

    # Get similarity scores
    scores = list(enumerate(similarity[idx]))
    scores = sorted(scores, key=lambda x: x[1], reverse=True)

    # Fetch top 5 recommendations
    recommended_indices = [i[0] for i in scores[1:6]]  # Exclude the movie itself
    recommendations = filtered_data.iloc[recommended_indices][['Movie Name', 'Movie Rating', 'Genre', 'Year of Release']]

    return recommendations.to_dict(orient='records')
