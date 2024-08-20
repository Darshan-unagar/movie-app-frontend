import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [moviesByCategory, setMoviesByCategory] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://movie-app-backend-bthx.onrender.com/movies/category');
        setCategories(response.data);

        const moviesData = {};
        for (const category of response.data) {
          const moviesResponse = await axios.get(`https://movie-app-backend-bthx.onrender.com/movies/category/${category}`);
          const movies = moviesResponse.data;

          // Group movies by unique genres
          const genreMap = {};
          movies.forEach(movie => {
            if (Array.isArray(movie.genres)) {
              movie.genres.forEach(genre => {
                if (!genreMap[genre]) {
                  genreMap[genre] = [];
                }
                if (!genreMap[genre].find(m => m._id === movie._id)) {
                  genreMap[genre].push(movie);
                }
              });
            }
          });

          moviesData[category] = genreMap;
        }

        setMoviesByCategory(moviesData);
      } catch (error) {
        console.error('Error fetching categories or movies:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col min-h-screen text-white">
      <div 
        className="fixed inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: 'url(https://wallpapers.com/images/featured/movie-9pvmdtvz4cb0xl37.jpg)' }}
      ></div>
      <div className="fixed inset-0 bg-black opacity-60 z-10"></div>
      
      <div className="relative z-20 flex flex-col flex-grow">
        <Header />
        <main className="container mx-auto px-6 md:px-12 py-12 flex-grow">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-red-600">
            Explore Movie Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/category/${category}`}
                className="relative bg-gray-800 p-6 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:bg-red-600 hover:text-white hover:shadow-2xl"
              >
                <h3 className="text-xl font-semibold text-white text-center capitalize mb-4">
                  {category}
                </h3>
                <div className="space-y-6">
                  {moviesByCategory[category] && Object.keys(moviesByCategory[category]).map((genre) => (
                    <div key={genre} className="p-4 bg-gray-900 rounded-lg">
                      <h4 className="text-lg font-semibold text-red-500 capitalize">{genre}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                        {moviesByCategory[category][genre].map(movie => (
                          <Link to={`/movie/${movie._id}`} key={movie._id} className="block">
                            <img
                              src={movie.coverImage || 'https://via.placeholder.com/200x300'}
                              alt={movie.title}
                              className="w-full h-40 object-cover rounded-lg mb-2"
                            />
                            <p className="text-sm text-white">{movie.title}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default CategoryList;
