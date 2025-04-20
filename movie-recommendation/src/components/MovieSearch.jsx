import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { movieService } from '../services/api';
import MovieTimeline from './MovieTimeline';
import '../styles/MovieSearch.css';

const MovieSearch = ({ searchHistory, setSearchHistory }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('MovieSearch - searchHistory:', searchHistory);
    }, [searchHistory]);

    useEffect(() => {
        // login
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setLoading(true);
        try {
            const data = await movieService.search(searchQuery);
            setMovies(data.movies || []);
            
            const newHistoryItem = {
                id: Date.now(),
                title: searchQuery,
                date: new Date().toISOString(),
                movieId: data.movies?.[0]?.id || '',
                genres: data.movies?.[0]?.genres || []
            };
            
            console.log('MovieSearch - Adding new history item:', newHistoryItem);
            setSearchHistory(prev => [...prev, newHistoryItem]);
        } catch (error) {
            console.error('Search error:', error);
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
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </form>

            <div className="timeline-section">
                <div className="timeline-header">
                    <h3>Search History</h3>
                </div>
                {searchHistory && searchHistory.length > 0 ? (
                    <MovieTimeline history={searchHistory} />
                ) : (
                    <p className="no-history">No search history yet</p>
                )}
            </div>

            <div className="movies-grid">
                {movies.map(movie => (
                    <div key={movie.id} className="movie-card">
                        <h3>{movie.title}</h3>
                        <p>Year: {movie.year}</p>
                        <p>Rating: {movie.rating}</p>
                        <p>Genres: {movie.genres?.join(', ')}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieSearch; 