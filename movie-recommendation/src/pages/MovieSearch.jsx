import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { movieService } from "../services/api";
import MovieDistribution from "../components/MovieTimeline";
import MovieCard from "../components/MovieCard";
import { useSearchHistory } from "../context/SearchHistoryContext";
import "../styles/MovieSearch.css";

export default function MovieSearch() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState("");
    const [inputError, setInputError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { searchHistory, addToHistory } = useSearchHistory();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!searchQuery.trim()) {
            setError("Please enter a movie ID");
            return;
        }

        if (!/^\d+$/.test(searchQuery)) {
            setInputError("Only numeric input is allowed.");
            return;
        }

        setInputError("");
        setLoading(true);
        setError("");
        setMovies([]);

        try {
            const data = await movieService.search(searchQuery);
            const results = Array.isArray(data.movies)
                ? data.movies
                : data && data.movieId
                    ? [data]
                    : [];

            if (results.length === 0) {
                setError("No movie found with this ID.");
                return;
            }

            setMovies(results);

            const first = results[0];
            let rating = first.rating ?? first.average_rating ?? null;

            if (rating === null && first.movieId) {
                try {
                    const ratingData = await movieService.getRating(first.movieId);
                    rating = ratingData?.average_rating ?? null;
                } catch (err) {
                    console.warn("⚠️ Failed to fetch rating.");
                }
            }

            const newHistoryItem = {
                id: Date.now(),
                date: new Date().toISOString(),
                title: first.title ?? "Untitled Movie",
                movieId: first.movieId ?? first.id ?? null,
                genres: first.genres ?? [],
                rating: rating,
                year: first.year ?? null,
            };

            addToHistory(newHistoryItem);
            console.log("📝 Added to history:", newHistoryItem);
        } catch (err) {
            console.error("❌ Search error:", err);
            setError(err.response?.data?.error || "Failed to fetch movie.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="movie-search-container">
            <h2>Movie Search</h2>

            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                        const value = e.target.value;
                        setSearchQuery(value);
                        if (/^\d*$/.test(value)) {
                            setInputError(""); // valid
                        } else {
                            setInputError("Only numeric input is allowed.");
                        }
                    }}
                    placeholder="Search for movies... Please enter a number (movieId)"
                    className="search-input"
                />
                <button type="submit" className="search-button" disabled={loading}>
                    {loading ? "Searching..." : "Search"}
                </button>
            </form>

            {inputError && <div className="input-error-message">⚠️ {inputError}</div>}
            {error && <div className="error-message">⚠️ {error}</div>}

            <div className="timeline-section">
                {searchHistory.length > 0 ? (
                    <MovieDistribution history={searchHistory} />
                ) : (
                    <p className="no-history">No search history yet</p>
                )}
            </div>
        </div>
    );
}
