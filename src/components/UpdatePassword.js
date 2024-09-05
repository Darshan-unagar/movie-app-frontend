import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('https://movie-app-backend-bthx.onrender.com/users/update-password', {
        currentPassword,
        newPassword
      }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
      });

      setMessage(response.data.message);
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update password');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(https://wallpapers.com/images/hd/movie-poster-background-q1zm830g0hfww2lk.jpg)' }}>
      <Header />
      <main className="flex-grow flex items-center justify-center p-6 md:p-12">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-4xl font-bold mb-8 text-center text-white">Change Password</h1>
          
          {error && <div className="text-red-500 mb-6 text-center">{error}</div>}
          {message && <div className="text-green-500 mb-6 text-center">{message}</div>}
          
          <form onSubmit={handlePasswordUpdate} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-white" htmlFor="currentPassword">Current Password</label>
              <input
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter your current password"
                className="border border-gray-700 bg-gray-900 text-white p-3 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-white" htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                placeholder="Enter your new password"
                onChange={(e) => setNewPassword(e.target.value)}
                className="border border-gray-700 bg-gray-900 text-white p-3 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
            </div>
            <button type="submit" className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-md font-semibold shadow-md transition duration-300">Change Password</button>
          </form>
        </div>
      </main>
      <Footer className="w-full" />
    </div>
  );
};

export default UpdatePassword;
