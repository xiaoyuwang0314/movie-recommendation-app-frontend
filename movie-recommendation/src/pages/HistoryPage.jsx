import { useEffect } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { useSearchHistory } from "../context/SearchHistoryContext";
import "../styles/HistoryPage.css";

export default function HistoryPage() {
    const token = localStorage.getItem("token");
    const { searchHistory } = useSearchHistory(); // ⬅ Get shared history from context

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // If not logged in, redirect to login prompt
    if (!token) {
        return (
            <div className="history-container">
                <div className="login-prompt">
                    <h2>Please Login to View History</h2>
                    <p>You need to be logged in to view your movie search history.</p>
                    <Link to="/login" className="login-button">Login</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="history-container">
            <h2 className="page-title">🎬 Search History</h2>

            {searchHistory.length === 0 ? (
                <div className="empty-history">
                    <p>No search history yet. Start searching for movies!</p>
                </div>
            ) : (
                <div className="history-list">
                    {searchHistory.map((movie, index) => (
                        <MovieCard key={index} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
}