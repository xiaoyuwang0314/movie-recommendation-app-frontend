import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import "../styles/HistoryPage.css";

export default function HistoryPage() {
    const [history, setHistory] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            const savedHistory = JSON.parse(localStorage.getItem("movieHistory") || "[]");
            setHistory(savedHistory);
        }
    }, [token]);

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
            {history.length === 0 ? (
                <div className="empty-history">
                    <p>No search history yet. Start searching for movies!</p>
                </div>
            ) : (
                <div className="history-list">
                    {history.map((movie, index) => (
                        <MovieCard key={index} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
} 