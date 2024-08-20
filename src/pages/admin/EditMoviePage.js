import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./components/Sidebar"; // Update import path as needed
import Header from "./components/Header"; // Update import path as needed
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditMoviePage = () => {
  const { id } = useParams(); // Get movie ID from URL
  const navigate = useNavigate(); // To navigate after save
  const [movie, setMovie] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true); // Adjust based on theme state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const authToken = localStorage.getItem("authToken"); // Retrieve token from localStorage

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`https://movie-app-backend-bthx.onrender.com/admin/movies/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    fetchMovie();
  }, [id, authToken]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const handleThemeToggle = () => {
    setIsDarkMode((prev) => !prev);
    localStorage.setItem("theme", !isDarkMode ? "dark" : "light");
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`https://movie-app-backend-bthx.onrender.com/admin/movies/${id}`, movie, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      toast.success("Movie updated successfully!");
      setTimeout(() => {
        navigate("/admin/movies");
      }, 4000);
    } catch (error) {
      console.error("Error updating movie:", error);
      toast.error("Failed to update movie. Please try again.");
    }
  };

  if (!movie) {
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

        <main className="flex-grow flex items-center justify-center p-4 md:p-6">
          <div
            className={`w-full max-w-4xl bg-${isDarkMode ? 'gray-800' : 'white'} p-8 rounded-lg shadow-lg`}
          >
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
              Edit Movie
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium">Title</label>
                <input
                  type="text"
                  value={movie.title}
                  onChange={(e) => setMovie({ ...movie, title: e.target.value })}
                  className={`mt-1 p-2 border rounded w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
                  required
                />
              </div>

              {/* Genres */}
              <div>
                <label className="block text-sm font-medium">Genres<span className="text-red-500"> Ples Comma separated values</span></label>
                <input
                  type="text"
                  value={movie.genre.join(", ")}
                  onChange={(e) => setMovie({ ...movie, genres: e.target.value.split(", ").map(genre => genre.trim()) })}
                  className={`mt-1 p-2 border rounded w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
                  required
                />
              </div>

              {/* Director */}
              <div>
                <label className="block text-sm font-medium">Director</label>
                <input
                  type="text"
                  value={movie.director}
                  onChange={(e) => setMovie({ ...movie, director: e.target.value })}
                  className={`mt-1 p-2 border rounded w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
                  required
                />
              </div>

              {/* Release Date */}
              <div>
                <label className="block text-sm font-medium">Release Date</label>
                <input
                  type="date"
                  value={movie.releaseDate?.split("T")[0]} // Format date to yyyy-mm-dd
                  onChange={(e) => setMovie({ ...movie, releaseDate: e.target.value })}
                  className={`mt-1 p-2 border rounded w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  value={movie.description}
                  onChange={(e) => setMovie({ ...movie, description: e.target.value })}
                  className={`mt-1 p-2 border rounded w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
                  rows="4"
                  required
                />
              </div>

              {/* Cover Image URL */}
              <div>
                <label className="block text-sm font-medium">Cover Image URL</label>
                <input
                  type="text"
                  value={movie.coverImage}
                  onChange={(e) => setMovie({ ...movie, coverImage: e.target.value })}
                  className={`mt-1 p-2 border rounded w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
                  required
                />
              </div>

              {/* Trailer URL */}
              <div>
                <label className="block text-sm font-medium">Trailer URL</label>
                <input
                  type="text"
                  value={movie.trailerUrl}
                  onChange={(e) => setMovie({ ...movie, trailerUrl: e.target.value })}
                  className={`mt-1 p-2 border rounded w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
                  required
                />
              </div>

              {/* Video URL */}
              <div>
                <label className="block text-sm font-medium">Video URL</label>
                <input
                  type="text"
                  value={movie.videoUrl}
                  onChange={(e) => setMovie({ ...movie, videoUrl: e.target.value })}
                  className={`mt-1 p-2 border rounded w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
                  required
                />
              </div>

              {/* Story */}
              <div>
                <label className="block text-sm font-medium">Story</label>
                <textarea
                  value={movie.story}
                  onChange={(e) => setMovie({ ...movie, story: e.target.value })}
                  className={`mt-1 p-2 border rounded w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
                  rows="4"
                  required
                />
              </div>

              {/* Images */}
              <div>
                <label className="block text-sm font-medium">Images (Comma-separated URLs)</label>
                <input
                  type="text"
                  value={movie.images.join(", ")}
                  onChange={(e) => setMovie({ ...movie, images: e.target.value.split(", ").map(image => image.trim()) })}
                  className={`mt-1 p-2 border rounded w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
                  required
                />
              </div>

              {/* IMDB Rating */}
              <div>
                <label className="block text-sm font-medium">IMDB Rating</label>
                <input
                  type="number"
                  step="0.1"
                  value={movie.imdbRating}
                  onChange={(e) => setMovie({ ...movie, imdbRating: parseFloat(e.target.value) })}
                  className={`mt-1 p-2 border rounded w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
                  required
                />
              </div>

              {/* Stars */}
              <div>
                <label className="block text-sm font-medium">Stars (Comma-separated)</label>
                <input
                  type="text"
                  value={movie.stars.join(", ")}
                  onChange={(e) => setMovie({ ...movie, stars: e.target.value.split(", ").map(star => star.trim()) })}
                  className={`mt-1 p-2 border rounded w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
                  required
                />
              </div>

              {/* Language */}
              <div>
                <label className="block text-sm font-medium">Language</label>
                <input
                  type="text"
                  value={movie.language}
                  onChange={(e) => setMovie({ ...movie, language: e.target.value })}
                  className={`mt-1 p-2 border rounded w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className={`px-4 py-2 rounded ${
                    isDarkMode
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white`}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditMoviePage;
