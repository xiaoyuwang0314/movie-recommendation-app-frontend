import "../styles/HomePage.css";

export default function HomePage() {
    return (
        <div className="home-container">
            <h1>Welcome to Movie Recommendation App</h1>

            <div className="features">
                <div className="feature-card">
                    <h2>🎬 Discover Movies</h2>
                    <p>
                        Homepage currently has no interactive UI. Once logged in, you can search movies by entering their numeric ID.
                    </p>
                </div>

                <div className="feature-card">
                    <h2>🔐 Secure Access</h2>
                    <p>
                        Create an account and log in to access protected features like movie search and search history.
                    </p>
                </div>

                <div className="feature-card">
                    <h2>🌟 Smart Recommendations</h2>
                    <p>
                        This feature is still under development. It will offer personalized movie suggestions based on your rating history.
                    </p>
                </div>
            </div>
        </div>
    );
}
