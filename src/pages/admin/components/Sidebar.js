import React, { useState } from 'react';
import { MenuOutlined, CloseOutlined, HomeOutlined, LogoutOutlined, PlusOutlined, VideoCameraOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login'; // Redirect to login page after logout
  };

  return (
    <div className="relative h-screen flex">
      {/* Sidebar Toggle Button */}
      <button 
        onClick={toggleSidebar} 
        className="fixed top-4 left-4 p-2 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 z-50"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <CloseOutlined /> : <MenuOutlined />}
      </button>

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-40 w-64 h-full transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} bg-gray-50 dark:bg-gray-800`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto mt-14">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/admin/home" // Replace with the correct path for Home Page
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <HomeOutlined className="w-5 h-5" />
                <span className="ms-3">Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/movies" // Replace with the correct path for All Movies Page
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <VideoCameraOutlined className="w-5 h-5" />
                <span className="ms-3">All Movies</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/movies/create" // Replace with the correct path for Add New Movie Page
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <PlusOutlined className="w-5 h-5" />
                <span className="ms-3">Add New Movie</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/users" // Path for Manage Users Page
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <UserOutlined className="w-5 h-5" />
                <span className="ms-3">Manage Users</span>
              </Link>
            </li>
            <li className="flex items-center p-2 cursor-pointer" onClick={handleLogout}>
              <LogoutOutlined className="h-5 w-5" />
              <span className="ml-2">Log Out</span>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
