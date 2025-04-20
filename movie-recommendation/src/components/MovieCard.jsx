import { useEffect, useState } from "react";
import { movieService } from "../services/api";
import "../styles/MovieCard.css";
import '../styles/MovieSearch.css';

export default function MovieCard({ movie }) {
    const [rating, setRating] = useState(null);
    const [ratingError, setRatingError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setRating(null);
        setRatingError(null);
        setIsLoading(false);
    }, [movie]);

    useEffect(() => {
        let timeoutId;
        const fetchRating = async () => {
            setIsLoading(true);
            try {
                timeoutId = setTimeout(async () => {
                    try {
                        console.log("Fetching rating for movie:", movie.movieId);
                        const data = await movieService.getRating(movie.movieId);
                        console.log("Rating data received:", data);
                        if (data && data.average_rating !== undefined) {
                            setRating(data.average_rating);
                        } else {
                            setRatingError("No rating available");
                        }
                    } catch (err) {
                        console.error("Rating API error:", err);
                        if (err.response?.status === 404) {
                            setRatingError("No ratings found for this movie");
                        } else {
                            setRatingError(err.response?.data?.error || "Failed to fetch rating");
                        }
                    }
                }, 500);
            } catch (err) {
                console.error("Unexpected error:", err);
                setRatingError("Failed to fetch rating");
            } finally {
                setIsLoading(false);
            }
        };

        if (movie && movie.movieId) {
            fetchRating();
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [movie]);

    return (
        <div className="movie-card">
            <div className="movie-header">
                <h3 className="movie-title">{movie.title}</h3>
                <div className="movie-meta">
                    <span className="movie-id">ID: {movie.movieId}</span>
                    {isLoading ? (
                        <div className="rating-loading">Loading rating...</div>
                    ) : rating !== null ? (
                        <div className="movie-rating">
                            <span className="rating-value">{rating.toFixed(1)}</span>
                            <span className="rating-star">⭐</span>
                        </div>
                    ) : ratingError ? (
                        <div className="rating-error-small">⚠️ {ratingError}</div>
                    ) : null}
                </div>
            </div>
            <div className="movie-genres">
                <h4>Genres</h4>
                <div className="genre-tags">
                    {movie.genres.map((genre, index) => (
                        <span key={index} className="genre-tag">
                            {genre}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
} 