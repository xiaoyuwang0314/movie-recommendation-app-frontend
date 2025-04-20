import { createContext, useContext, useState } from "react";

const SearchHistoryContext = createContext();

export function SearchHistoryProvider({ children }) {
  const [searchHistory, setSearchHistory] = useState([]);
  
  const addToHistory = (item) => {
    setSearchHistory(prev => [...prev, item]);
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  return (
    <SearchHistoryContext.Provider value={{
      searchHistory,
      setSearchHistory,
      addToHistory,
      clearHistory
    }}>
      {children}
    </SearchHistoryContext.Provider>
  );
}

export function useSearchHistory() {
  const context = useContext(SearchHistoryContext);
  if (!context) {
    throw new Error("❌ useSearchHistory must be used within a SearchHistoryProvider");
  }
  return context;
}