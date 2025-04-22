import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [username, setUsername] = useState(() => localStorage.getItem("username") || "");

    const login = (name) => {
        localStorage.setItem("username", name);
        setUsername(name);
    };

    const logout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        setUsername("");
        window.location.href = "/login";
    };

    return (
        <AuthContext.Provider value={{ username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
