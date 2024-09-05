import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { DeleteOutlined } from "@ant-design/icons";
import DefaultProfilePicture from "../components/DefaultProfilePicture"; // Import the component

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const refreshPage = () => {
      if (performance.getEntriesByType("navigation")[0].type !== "reload") {
        window.location.reload();
      }
    };
    refreshPage()
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('https://movie-app-backend-bthx.onrender.com/users/profile', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
        });
        setUser(response.data);
      } catch (err) {
        setError('Failed to fetch user profile');
      }
    };
    fetchUserProfile();
  }, []);

  const handleRemoveFromWatchlist = async (movieId) => {
    try {
      await axios.post('https://movie-app-backend-bthx.onrender.com/users/remove-from-watchlist', 
      { movieId }, 
      { headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` } 
    });
      setUser({
        ...user,
        watchlist: user.watchlist.filter((movie) => movie._id !== movieId),
      });
    } catch (err) {
      setError('Failed to remove movie from watchlist');
    }
  };

  if (!user) return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="text-white">Loading...</div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 md:px-8 py-6">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg mb-6">
            <h1 className="text-3xl font-bold mb-4">Profile</h1>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {message && <div className="text-green-500 mb-4">{message}</div>}
            <div className="flex items-center mb-6">
              <DefaultProfilePicture username={user.username} /> {/* Use the component */}
              <div className="ml-4">
                <h2 className="text-2xl font-semibold mb-2">{user.username}</h2>
                <p className="text-gray-400">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Watchlist</h2>
            {user.watchlist.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {user.watchlist.map(movie => (
                  <div key={movie._id} className="relative bg-gray-800 rounded-lg overflow-hidden">
                    <img src={movie.coverImage} alt={movie.title} className="w-full h-auto" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-75 p-2">
                      <span className="block text-white text-sm truncate">{movie.title}</span>
                      <a href={movie.trailerUrl} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline text-xs">Watch Trailer</a>
                      <DeleteOutlined
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700 cursor-pointer"
                        onClick={() => handleRemoveFromWatchlist(movie._id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No movies in watchlist.</p>
            )}
          </div>
        </div>
      </main>
      <Footer className="w-full" />
    </div>
  );
};

export default Profile;
