import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { movieService } from "../services/api";
import MovieTimeline from "../components/MovieTimeline";
import MovieCard from "../components/MovieCard";
import { useSearchHistory } from "../context/SearchHistoryContext";
import "../styles/MovieSearch.css";


export default function MovieSearch() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
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
        if (!searchQuery.trim()) return;

        setLoading(true);
        try {
            const data = await movieService.search(searchQuery);
            const results = Array.isArray(data.movies)
                ? data.movies
                : data && data.movieId
                    ? [data]
                    : [];

            setMovies(results);

            if (results.length > 0) {
                const first = results[0];

                // 主动获取评分
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
                    year: first.year ?? null
                };

                addToHistory(newHistoryItem);
                console.log("📝 Added to history:", newHistoryItem);
            } else {
                console.warn("⚠️ No movies found for:", searchQuery);
            }
        } catch (err) {
            console.error("❌ Search error:", err);
            setMovies([]);
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
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for movies..."
                    className="search-input"
                />
                <button type="submit" className="search-button" disabled={loading}>
                    {loading ? "Searching..." : "Search"}
                </button>
            </form>

            <div className="timeline-section">
                <div className="timeline-header">
                    <h3>Search History</h3>
                </div>
                {searchHistory.length > 0 ? (
                    <MovieTimeline history={searchHistory} />
                ) : (
                    <p className="no-history">No search history yet</p>
                )}
            </div>

            {/* <div className="movies-grid">
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.movieId || movie.id || movie.title}
                        movie={movie}
                    />
                ))}
            </div> */}
        </div>
    );
}
