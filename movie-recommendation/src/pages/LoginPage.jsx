import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/api";
import { useAuth } from "../context/AuthContext"; // ✅ 引入
import "../styles/Form.css";

export default function LoginPage() {
    const [email, setEmail] = useState("");        // Email input
    const [password, setPassword] = useState("");  // Password input
    const [error, setError] = useState("");        // Error message
    const navigate = useNavigate();

    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const data = await authService.login(email, password);

            // Store token in localStorage
            localStorage.setItem("token", data.token);

            // Save username 
            const username = email.split("@")[0];
            localStorage.setItem("username", username);
            login(username);  //  context update

            // Redirect to movie search page
            navigate("/movies");
        } catch (err) {
            setError(
                err.response?.data?.message || "Login failed. Please check your credentials."
            );
        }
    };

    return (
        <div className="form-container">
            <h2>Login</h2>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Log In</button>
            </form>
        </div>
    );
}