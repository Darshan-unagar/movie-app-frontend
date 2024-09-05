import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar'; // Update import path as needed
import Header from './components/Header'; // Update import path as needed
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for react-toastify

const AdminCreateMoviePage = () => {
  const [movieData, setMovieData] = useState({
    title: '',
    description: '',
    genre: '',
    director: '',
    releaseDate: '',
    coverImage: '',
    trailerUrl: '',
    story: '',
    images: '',
    imdbRating: '',
    stars: '',
    language: '',
    videoUrl: '',
  });
  const [isDarkMode, setIsDarkMode] = useState(true); // Adjust based on theme state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Set theme based on localStorage or default to dark
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const handleThemeToggle = () => {
    setIsDarkMode((prev) => !prev);
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light'); // Save theme to localStorage
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem('authToken'); // Retrieve the token from localStorage
  
      // Prepare the new movie object
      const newMovie = {
        ...movieData,
        genre: (movieData.genre || '').split(',').map(genre => genre.trim()), // Ensure genres is a string and split
        images: (movieData.images || '').split(',').map(image => image.trim()), // Ensure images is a string and split
        imdbRating: parseFloat(movieData.imdbRating) || 0, // Default to 0 if parsing fails
        stars: (movieData.stars || '').split(',').map(star => star.trim()), // Ensure stars is a string and split
      };
  
      await axios.post(
        'https://netstar.info.codesquareinfotech.com/admin/movies/create',
        newMovie,
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Include the token in the Authorization header
          },
        }
      );
  
      toast.success('Movie created successfully!'); // Show success message
      setTimeout(() => {
        navigate("/admin/movies");
      }, 4000); 
    } catch (error) {
      console.error('Error creating movie:', error);
      toast.error('Failed to create movie. Please try again.'); // Show error message
    }
  };
  

  return (
    <div
      className={`flex min-h-screen ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
      }`}
    >
      <Sidebar
        isOpen={isSidebarOpen}
        isDarkMode={isDarkMode}
        onToggle={handleSidebarToggle}
      />
      <div
        className={`flex-grow flex flex-col ${
          isSidebarOpen ? 'ml-64' : 'ml-0'
        } transition-all duration-300`}
      >
        <Header
          isDarkMode={isDarkMode}
          onThemeToggle={handleThemeToggle}
          onSidebarToggle={handleSidebarToggle}
        />

        <main className="flex-grow p-4 md:p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">Add New Movie</h1>
          <div
            className={`bg-gray-800 p-6 rounded-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } max-w-4xl mx-auto`}
          >
            <form onSubmit={handleSubmit}>
              {Object.keys(movieData).map((key) => (
                <div className="mb-4" key={key}>
                  <label className={`block ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                  </label>
                  {key === 'story' || key === 'description' ? (
                    <textarea
                      name={key}
                      value={movieData[key]}
                      onChange={handleChange}
                      className={`w-full p-2 rounded ${
                        isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'
                      }`}
                    />
                  ) : key === 'releaseDate' ? (
                    <input
                      type="date"
                      name={key}
                      value={movieData[key]}
                      onChange={handleChange}
                      className={`w-full p-2 rounded ${
                        isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'
                      }`}
                    />
                  ) : (
                    <input
                      type={key === 'imdbRating' ? 'number' : 'text'}
                      name={key}
                      value={movieData[key]}
                      onChange={handleChange}
                      step={key === 'imdbRating' ? '0.1' : undefined}
                      className={`w-full p-2 rounded ${
                        isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'
                      }`}
                    />
                  )}
                </div>
              ))}
              <button
                type="submit"
                className={`bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded ${
                  isDarkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'
                }`}
              >
                Add Movie
              </button>
            </form>
          </div>
        </main>
      </div>

      {/* ToastContainer to show toast messages */}
      <ToastContainer />
    </div>
  );
};

export default AdminCreateMoviePage;
