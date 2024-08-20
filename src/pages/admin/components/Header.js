import React from 'react';
import { Link } from 'react-router-dom';
import { BgColorsOutlined, LogoutOutlined,MenuOutlined } from '@ant-design/icons';

const Header = ({ isDarkMode, onThemeToggle, onSidebarToggle }) => {
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login'; // Redirect to login page after logout
  };
  return (
    <header className={`w-full p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} shadow-md relative`}>
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <button
          onClick={onSidebarToggle}
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 md:hidden p-2 z-20 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
          aria-label="Toggle sidebar"
        >
          <MenuOutlined className="w-6 h-6" />
        </button>
        <div className="flex-grow flex items-center justify-center">
          <h1 className="text-3xl font-bold">NetStar</h1>
        </div>
        <nav className="flex items-center space-x-4 ml-auto">
          <button
            onClick={onThemeToggle}
            className={`p-2 rounded-full ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} hover:bg-gray-600 hover:text-white transition duration-300`}
            aria-label="Toggle theme"
          >
            <BgColorsOutlined className="w-6 h-6" />
          </button>
          <Link 
            to="#" 
            className="text-gray-500 hover:text-gray-700 transition duration-300"
            aria-label="Logout"
            onClick={handleLogout}
          >
            <LogoutOutlined className="w-6 h-6" />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
