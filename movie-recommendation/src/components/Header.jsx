import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { systemService } from "../services/api";
import { useSearchHistory } from "../context/SearchHistoryContext";
import "../styles/Header.css";

export default function Header() {
    const [isHealthy, setIsHealthy] = useState(null);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const { searchHistory, clearHistory } = useSearchHistory();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username');
        if (token && storedUsername) {
            setUsername(storedUsername);
        } else {
            setUsername('');
        }
    }, []);

    const checkHealth = async () => {
        setLoading(true);
        try {
            const data = await systemService.healthCheck();
            const healthy = data.database === "healthy" && data.status === "OK";
            setIsHealthy(healthy);
        } catch (err) {
            setIsHealthy(false);
        } finally {
            setLoading(false);
            setTimeout(() => setIsHealthy(null), 3000);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.href = '/login';
    };

    const getHealthIcon = () => {
        if (loading) return "⏳";
        if (isHealthy === null) return "❓";
        return isHealthy ? "✅" : "❌";
    };

    return (
        <header className="header">
            <div className="header-content">
                <div className="logo">
                    <span role="img" aria-label="Movie Logo">🎬</span>
                    <span>Movie</span>
                </div>
                <nav className="main-nav">
                    <Link to="/">Home</Link>
                    <Link to="/movies">Search Movies</Link>
                    <Link to="/history">History</Link>
                    {username && (
                        <button
                            onClick={clearHistory}
                            className={`clear-history-button ${!searchHistory?.length ? 'disabled' : ''}`}
                            disabled={!searchHistory?.length}
                        >
                            Clear History
                        </button>
                    )}
                    {username ? (
                        <>
                            <span className="username">Hello, {username}</span>
                            <button onClick={handleLogout} className="logout-button">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}
                </nav>
                <button
                    className="health-check-btn"
                    onClick={checkHealth}
                    title={isHealthy === null ? "Check API Health" : (isHealthy ? "API is healthy" : "API is unhealthy")}
                    disabled={loading}
                >
                    {getHealthIcon()}
                </button>
            </div>
        </header>
    );
}