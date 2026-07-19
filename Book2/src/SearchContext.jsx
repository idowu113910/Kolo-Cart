// SearchContext.jsx
import React, { createContext, useContext, useState } from "react";

const SearchContext = createContext();

/**
 * Wrap the part of your app that needs search (Navbar + BookList)
 * with <SearchProvider> so both can read/write the same query.
 */
export function SearchProvider({ children }) {
  const [query, setQuery] = useState("");
  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
}

/** Convenience hook for components */
export function useSearch() {
  return useContext(SearchContext);
}
