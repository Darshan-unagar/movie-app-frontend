import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SidebarWithBurgerMenu from './components/Sidebar';
import Header from './components/Header';

const ManageUsersPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [users, setUsers] = useState([]);
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
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('https://netstar.info.codesquareinfotech.com/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error.message);
      }
    };

    fetchUsers();
  }, []);


  const handleThemeToggle = () => {
    setIsDarkMode(prev => !prev);
  };

  const handleDeleteUser = async (userId) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`https://netstar.info.codesquareinfotech.com/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Failed to delete user:', error.message);
    }
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
          <h1 className="text-3xl font-bold mb-8">Manage Users</h1>
          {users.length === 0 ? (
            <p className="text-lg text-gray-500">No users found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map(user => (
                <div key={user._id} className={`p-6 rounded-lg shadow-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
                  <h2 className="text-xl font-semibold mb-2">{user.username}</h2>
                  <p className="mb-4">{user.email}</p>
                  <p className="mb-4">Role: {user.role}</p>
                  <Link to={`/admin/users/edit/${user._id}`} className="text-blue-400 hover:underline mr-4">
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDeleteUser(user._id)} 
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </main>

        <footer className={`w-full p-4 text-center ${isDarkMode ? 'bg-gray-800 text-gray-500' : 'bg-white text-gray-900'}`}>
          <p>&copy; 2024 Movie App. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default ManageUsersPage;
