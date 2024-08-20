import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SidebarWithBurgerMenu from './components/Sidebar';
import Header from './components/Header';

const AdminHomePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false); // Default to light mode
  const navigate = useNavigate();

  useEffect(() => {
    // Check for authentication token
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login', { replace: true });
    }

    // Retrieve and apply the saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, [navigate]);

  useEffect(() => {
    // Apply the theme class to the document element when isDarkMode changes
    document.documentElement.classList.toggle('dark', isDarkMode);
    // Save the theme preference to localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleThemeToggle = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <SidebarWithBurgerMenu isDarkMode={isDarkMode} />
      <div className="flex-grow flex flex-col">
        <Header 
          isDarkMode={isDarkMode} 
          onThemeToggle={handleThemeToggle} 
        />
        
        <main className="flex-grow mt-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className={`p-6 rounded-lg shadow-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
              <h2 className="text-xl font-semibold mb-4">Manage Movies</h2>
              <p className="mb-4">Add, update, or delete movies in the system.</p>
              <Link to="/admin/movies" className="text-blue-400 hover:underline">
                Go to Movies
              </Link>
            </div>
          </div>
        </main>

        <footer className={`w-full p-4 text-center ${isDarkMode ? 'bg-gray-800 text-gray-500' : 'bg-white text-gray-900'}`}>
          <p>&copy; 2024 Movie App. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default AdminHomePage;
