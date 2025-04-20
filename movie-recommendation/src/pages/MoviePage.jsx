import { useState } from "react";
import { movieService } from "../services/api";
import MovieCard from "../components/MovieCard";
import "../styles/MoviePage.css";

export default function MoviePage() {
    const [id, setId] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const updateHistory = (movie) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        const history = JSON.parse(localStorage.getItem("movieHistory") || "[]");
        // Remove if movie already exists
        const filteredHistory = history.filter(item => item.movieId !== movie.movieId);
        // Add new movie to the beginning
        filteredHistory.unshift(movie);
        // Keep only last 10 items
        const updatedHistory = filteredHistory.slice(0, 10);
        localStorage.setItem("movieHistory", JSON.stringify(updatedHistory));
    };

    const fetchMovie = async () => {
        if (!id) {
            setError("Please enter a movie ID");
            return;
        }
        setError("");
        setLoading(true);
        try {
            const data = await movieService.search(id);
            setResult(data);
            updateHistory(data);
        } catch (err) {
            setError(err.response?.data?.error || "Failed to fetch movie.");
            setResult(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="movie-container">
            <h2 className="page-title">🎬 Movie Search</h2>
            <div className="search-section">
                <div className="search-box">
                    <input
                        id="movieId"
                        name="movieId"
                        type="text"
                        placeholder="Enter movie ID..."
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && fetchMovie()}
                    />
                    <button 
                        onClick={fetchMovie} 
                        disabled={loading}
                        className={loading ? 'loading' : ''}
                    >
                        {loading ? 'Searching...' : 'Search'}
                    </button>
                </div>
                {error && <div className="error-message">⚠️ {error}</div>}
            </div>

            {result && <MovieCard movie={result} />}
        </div>
    );
}
