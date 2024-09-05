import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "./components/Sidebar"; // Update import path as needed
import Header from "./components/Header"; // Update import path as needed
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminMoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true); // Adjust based on theme state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const authToken = localStorage.getItem("authToken"); // Retrieve token from localStorage

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("https://netstar.info.codesquareinfotech.com/admin/movies");
        setMovies(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    // Set theme based on localStorage or default to dark
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const handleThemeToggle = () => {
    setIsDarkMode((prev) => !prev);
    localStorage.setItem("theme", !isDarkMode ? "dark" : "light"); // Save theme to localStorage
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleDelete = async (movieId) => {
    try {
      await axios.delete(`https://netstar.info.codesquareinfotech.com/admin/movies/${movieId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`, 
        },
      });
      setMovies(movies.filter((movie) => movie._id !== movieId));
      toast.success("Movie deleted successfully!");
    } catch (error) {
      console.error("Error deleting movie:", error);
      toast.error("Failed to delete movie.");
    }
  };
  

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div
      className={`flex min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <Sidebar
        isOpen={isSidebarOpen}
        isDarkMode={isDarkMode}
        onToggle={handleSidebarToggle}
      />
      <div
        className={`flex-grow flex flex-col ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } transition-all duration-300`}
      >
        <Header
          isDarkMode={isDarkMode}
          onThemeToggle={handleThemeToggle}
          onSidebarToggle={handleSidebarToggle}
        />

        <main className="flex-grow p-4 md:p-6">
          <header className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-0">
              Manage Movies
            </h1>
            <Link
              to="/admin/movies/create"
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded text-center"
            >
              Add New Movie
            </Link>
          </header>

          <div className="overflow-x-auto">
            <table
              className={`min-w-full rounded-lg ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } ${
                isDarkMode ? "text-white" : "text-gray-900"
              } border-separate border-spacing-0`}
            >
              <thead className={isDarkMode ? "bg-gray-700" : "bg-gray-200"}>
                <tr>
                  <th className="px-3 py-2 sm:px-6 sm:py-3 border-b border-gray-700 text-left sm:text-center">
                    Title
                  </th>
                  <th className="px-3 py-2 sm:px-6 sm:py-3 border-b border-gray-700 text-left sm:text-center">
                    Genres
                  </th>
                  <th className="hidden md:table-cell px-3 py-2 sm:px-6 sm:py-3 border-b border-gray-700 text-left sm:text-center">
                    Director
                  </th>
                  <th className="px-3 py-2 sm:px-6 sm:py-3 border-b border-gray-700 text-left sm:text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie) => (
                  <tr
                    key={movie._id}
                    className={isDarkMode ? "bg-gray-800" : "bg-white"}
                  >
                    <td className="px-3 py-2 sm:px-6 sm:py-4 border-b border-gray-700 text-left sm:text-center">
                      {movie.title}
                    </td>
                    <td className="px-3 py-2 sm:px-6 sm:py-4 border-b border-gray-700 text-left sm:text-center">
                      {Array.isArray(movie.genre) ? movie.genre.join(", ") : "N/A"}
                    </td>
                    <td className="hidden md:table-cell px-3 py-2 sm:px-6 sm:py-4 border-b border-gray-700 text-left sm:text-center">
                      {movie.director}
                    </td>
                    <td className="px-3 py-2 sm:px-6 sm:py-4 border-b border-gray-700 text-left sm:text-center">
                      <Link
                        to={`/admin/movies/edit/${movie._id}`}
                        className="text-blue-400 hover:underline mr-2 sm:mr-4"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(movie._id)}
                        className="text-red-400 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>

        <footer
          className={`w-full p-4 text-center ${
            isDarkMode ? "bg-gray-800 text-gray-500" : "bg-white text-gray-900"
          }`}
        >
          <p>&copy; 2024 Movie App. All rights reserved.</p>
        </footer>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminMoviesPage;
