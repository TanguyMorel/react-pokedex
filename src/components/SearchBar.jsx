// src/components/SearchBar.jsx
import React from "react"
import "../styles/SearchBar.css"

const SearchBar = ({ onSearchChange }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Rechercher un pokémon..."
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  )
}

export default SearchBar
