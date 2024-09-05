import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import axios from "axios";

const SearchBar = ({ className }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (searchQuery) => {
    try {
      if (searchQuery.trim() === "") {
        setSearchResults([]);
        return;
      }

      const response = await axios.get(
        `https://netstar.info.codesquareinfotech.com/movies/search?query=${searchQuery}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    handleSearch(query); // Trigger search whenever the input changes
  };

  const handleResultClick = (movieId) => {
    navigate(`/movie/${movieId}`);
    setSearchTerm("");
    setSearchResults([]);
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange} // Corrected the onChange handler
        placeholder="Search for movies..."
        className="w-full p-2 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-red-600"
      />
      {searchResults.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white text-black mt-1 rounded-lg shadow-lg z-10">
          {searchResults.map((movie) => (
            <li
              key={movie._id}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleResultClick(movie._id)}
            >
              {movie.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
