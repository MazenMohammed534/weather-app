import { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch, loading }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setCity("");
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <svg
        className="search-icon"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
        <path
          d="M20 20L16.5 16.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <input
        className="search-input"
        type="text"
        placeholder="Search any city…"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        disabled={loading}
        required
      />
      <button type="submit" className="search-btn" disabled={loading}>
        {loading ? "…" : "Go"}
      </button>
    </form>
  );
};

export default SearchBar;
