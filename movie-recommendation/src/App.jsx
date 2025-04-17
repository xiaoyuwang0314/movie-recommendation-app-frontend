import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import MoviePage from "./components/MoviePage";
import HealthCheck from "./components/HealthCheck";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <div className="app-container">
            <h1>Movie Recommendation App</h1>
            <nav>
                <Link to="/">Login</Link> |
                <Link to="/register">Register</Link> |
                <Link to="/movies">Search Movies</Link> |
                <Link to="/health">Health Check</Link>
            </nav>

            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/movies"
                    element={
                        <ProtectedRoute>
                            <MoviePage />
                        </ProtectedRoute>
                    }
                />
                <Route path="/health" element={<HealthCheck />} />
            </Routes>
        </div>
    );
}

export default App;
