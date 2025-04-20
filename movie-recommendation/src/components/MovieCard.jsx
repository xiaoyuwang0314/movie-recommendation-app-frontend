import { useEffect, useState } from "react";
import { movieService } from "../services/api";
import "../styles/MovieCard.css";
import { getGenreColor, getGenreTextColor } from "../utils/genreColors";


export default function MovieCard({ movie }) {
    const [rating, setRating] = useState(null);
    const [ratingError, setRatingError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!movie || !movie.movieId) return;

        console.log("🎥 [MovieCard] mounted for:", movie.title, movie.movieId);

        if (movie.rating !== undefined && movie.rating !== null) {
            console.log("✅ Using cached rating:", movie.rating);
            setRating(movie.rating);
            return;
        }

        setRating(null);
        setRatingError(null);
        setIsLoading(true);

        const timeoutId = setTimeout(async () => {
            try {
                const data = await movieService.getRating(movie.movieId);
                if (data && data.average_rating !== undefined) {
                    setRating(data.average_rating);
                } else {
                    setRatingError("No rating available");
                }
            } catch (err) {
                console.error("Rating fetch failed:", err);
                setRatingError("Rating fetch error");
            } finally {
                setIsLoading(false);
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [movie]);

    return (
        <div className="movie-card">
            <div className="movie-header">
                <h3 className="movie-title">{movie.title || "Untitled Movie"}</h3>
                <div className="movie-meta">
                    <span className="movie-id">ID: {movie.movieId}</span>

                    {isLoading ? (
                        <span className="rating-loading">Loading rating...</span>
                    ) : rating !== null ? (
                        <span className="movie-rating">
                            <strong>{rating.toFixed(1)}</strong> ⭐
                        </span>
                    ) : ratingError ? (
                        <span className="rating-error-small">⚠️ {ratingError}</span>
                    ) : null}
                </div>
            </div>

            <div className="movie-genres">
                <h4>Genres</h4>
                <div className="genre-tags">
                    {movie.genres?.map((genre, index) => {
                        const bg = getGenreColor(genre);
                        const fg = getGenreTextColor(bg);
                        return (
                            <span
                                key={index}
                                className="genre-tag"
                                style={{
                                    backgroundColor: bg,
                                    color: fg
                                }}
                            >
                                {genre}
                            </span>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}