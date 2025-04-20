import { useState } from "react";
import { movieService } from "../services/api";
import MovieCard from "../components/MovieCard";
import { useSearchHistory } from "../context/SearchHistoryContext";
import "../styles/MoviePage.css";


export default function MoviePage() {
    const [id, setId] = useState("");              // Movie ID input
    const [result, setResult] = useState(null);    // Movie search result
    const [error, setError] = useState("");        // Error message
    const [loading, setLoading] = useState(false); // Loading flag

    const { addToHistory } = useSearchHistory();   // Global search history context

    // Handle movie search by ID
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

            // Try to get rating from response or fetch separately
            let rating = data.rating || data.average_rating || null;

            if (rating === null && data.movieId) {
                try {
                    const ratingData = await movieService.getRating(data.movieId);
                    rating = ratingData?.average_rating ?? null;
                } catch (err) {
                    console.warn("⚠️ Failed to fetch rating.");
                }
            }

            // Construct and add the movie object to global history
            const movie = {
                id: Date.now(),
                date: new Date().toISOString(),
                title: data.title ?? "Untitled Movie",
                movieId: data.movieId ?? data.id ?? null,
                genres: data.genres ?? [],
                rating: rating,
                year: data.year ?? null
            };

            addToHistory(movie);
            console.log("📝 Added to history:", movie);
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
                        onKeyPress={(e) => e.key === "Enter" && fetchMovie()}
                    />
                    <button
                        onClick={fetchMovie}
                        disabled={loading}
                        className={loading ? "loading" : ""}
                    >
                        {loading ? "Searching..." : "Search"}
                    </button>
                </div>

                {error && <div className="error-message">⚠️ {error}</div>}
            </div>

            {result && <MovieCard movie={result} />}
        </div>
    );
}