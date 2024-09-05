import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MoviesByCategory = () => {
  const { category } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const refreshPage = () => {
      if (performance.getEntriesByType("navigation")[0].type !== "reload") {
        window.location.reload();
      }
    };
    refreshPage();
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`https://netstar.info.codesquareinfotech.com/movies/category/${category}`);
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [category]);

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
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-red-600 capitalize">
            {category} Movies
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {movies.length > 0 ? (
              movies.map(movie => (
                <Link
                  to={`/movie/${movie._id}`}
                  key={movie._id}
                  className="relative bg-gray-800 p-6 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
                >
                  <img
                    src={movie.coverImage || 'https://via.placeholder.com/200x300'}
                    alt={movie.title}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold text-white text-center capitalize mb-2">
                    {movie.title}
                  </h3>
                  <p className="text-sm text-white text-center">{movie.description}</p>
                </Link>
              ))
            ) : (
              <p className="text-center text-white">No movies found in this category.</p>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MoviesByCategory;
