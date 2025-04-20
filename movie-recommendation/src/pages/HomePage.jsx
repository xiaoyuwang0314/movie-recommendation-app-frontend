import "../styles/HomePage.css";

export default function HomePage() {
    return (
        <div className="home-container">
            <h1>Welcome to Movie Recommendation App</h1>
            <div className="features">
                <div className="feature-card">
                    <h2>🎬 Discover Movies</h2>
                    <p>Find your next favorite movie with our intelligent recommendation system.</p>
                </div>
                <div className="feature-card">
                    <h2>🔐 Secure Access</h2>
                    <p>Create an account to save your preferences and get personalized recommendations.</p>
                </div>
                <div className="feature-card">
                    <h2>🌟 Smart Recommendations</h2>
                    <p>Get movie suggestions based on your viewing history and preferences.</p>
                </div>
            </div>
        </div>
    );
} 