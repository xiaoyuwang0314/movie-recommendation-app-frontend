import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { SearchHistoryProvider } from "./context/SearchHistoryContext";
import { AuthProvider } from "./context/AuthContext";

import "./styles/App.css";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SearchHistoryProvider>
          <App />
        </SearchHistoryProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
