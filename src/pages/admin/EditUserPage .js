import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SidebarWithBurgerMenu from './components/Sidebar';
import Header from './components/Header';

const EditUserPage = () => {
  const { id } = useParams(); // User ID from the URL
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login', { replace: true });
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, [navigate]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`https://movie-app-backend-bthx.onrender.com/admin/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        setRole(response.data.role);
      } catch (error) {
        console.error('Failed to fetch user:', error.message);
      }
    };

    fetchUser();
  }, [id]);

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.put(`https://movie-app-backend-bthx.onrender.com/admin/users/${id}`, { role }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/admin/users'); // Redirect to users page after update
    } catch (error) {
      console.error('Failed to update user:', error.message);
    }
  };

  const handleThemeToggle = () => {
    setIsDarkMode(prev => !prev);
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <SidebarWithBurgerMenu isDarkMode={isDarkMode} />
      <div className="flex-grow flex flex-col">
        <Header 
          isDarkMode={isDarkMode} 
          onThemeToggle={handleThemeToggle} 
        />
        
        <main className="flex-grow mt-10 max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Edit User</h1>
          <div className={`p-6 rounded-lg shadow-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
            {/* <h2 className="text-xl font-semibold mb-4">Edit User Details</h2> */}
            <p className="mb-4">Username: {user.username}</p>
            <p className="mb-4">Email: {user.email}</p>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Role:</label>
              <select 
                value={role} 
                onChange={handleRoleChange} 
                className={`block w-full p-2 border rounded ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button 
              onClick={handleSave} 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </main>

        <footer className={`w-full p-4 text-center ${isDarkMode ? 'bg-gray-800 text-gray-500' : 'bg-white text-gray-900'}`}>
          <p>&copy; 2024 Movie App. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default EditUserPage;
