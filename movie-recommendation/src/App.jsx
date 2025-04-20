import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MovieSearch from "./components/MovieSearch";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import "./styles/App.css";
import "./styles/global.css";
import HistoryPage from "./pages/HistoryPage";

function App() {
    const [searchHistory, setSearchHistory] = useState([]);

    useEffect(() => {
        console.log('App - searchHistory:', searchHistory);
    }, [searchHistory]);

    const clearHistory = () => {
        console.log('App - clearHistory called');
        setSearchHistory([]);
    };

    return (
        <div className="app">
            <Header searchHistory={searchHistory} clearHistory={clearHistory} />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route
                        path="/movies"
                        element={
                            <ProtectedRoute>
                                <MovieSearch searchHistory={searchHistory} setSearchHistory={setSearchHistory} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/history"
                        element={
                            <ProtectedRoute>
                                <HistoryPage searchHistory={searchHistory} />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
