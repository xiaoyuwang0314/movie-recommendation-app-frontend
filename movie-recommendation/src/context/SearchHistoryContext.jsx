import { createContext, useContext, useState, useEffect } from "react";

const SearchHistoryContext = createContext();

export function SearchHistoryProvider({ children }) {
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem("movieHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const clearHistory = () => {
    localStorage.removeItem("movieHistory");
    setSearchHistory([]);
  };

  const addToHistory = (item) => {
    const newHistory = [...searchHistory, item];
    setSearchHistory(newHistory);
    localStorage.setItem("movieHistory", JSON.stringify(newHistory));
  };

  return (
    <SearchHistoryContext.Provider value={{ searchHistory, setSearchHistory, addToHistory, clearHistory }}>
      {children}
    </SearchHistoryContext.Provider>
  );
}

export function useSearchHistory() {
  return useContext(SearchHistoryContext);
}