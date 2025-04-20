import { useState } from "react";
import { authService } from "../services/api";
import "../styles/Form.css";

export default function RegisterPage() {
    const [email, setEmail] = useState("");         // Email input
    const [password, setPassword] = useState("");   // Password input
    const [error, setError] = useState("");         // Error message
    const [success, setSuccess] = useState("");     // Success message

    // Handle registration form submission
    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const data = await authService.register(email, password);

            // Show success message
            setSuccess(data.message || "Registration successful!");
            setEmail("");
            setPassword("");
        } catch (err) {
            // Show error message
            setError(
                err.response?.data?.message || "Registration failed. Please try again."
            );
        }
    };

    return (
        <div className="form-container">
            <h2>Register</h2>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <form onSubmit={handleRegister}>
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
                <button type="submit">Register</button>
            </form>
        </div>
    );
}