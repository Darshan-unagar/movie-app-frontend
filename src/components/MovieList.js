import React from "react";
import { Link } from "react-router-dom";

const MoviesList = ({ moviesList }) => {
  return (
    <div className="relative z-20 py-12 bg-gray-900">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Movies List
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {moviesList.length > 0 ? (
            moviesList
              .sort(() => 0.5 - Math.random()) // Shuffle the movies array
              .slice(0, 4) // Select the first 4 movies after shuffle
              .map((movie) => (
                <Link
                  key={movie._id}
                  to={`/movie/${movie._id}`} // Updated path here
                  className="bg-black bg-opacity-70 p-4 rounded-lg transform transition-transform duration-300 hover:scale-105 shadow-lg hover:shadow-2xl"
                >
                  <img
                    src={
                      movie.coverImage ||
                      "https://via.placeholder.com/200x300"
                    }
                    alt={movie.title}
                    className="w-full h-64 object-cover rounded-lg mb-2"
                    width={200}
                    height={300}
                    style={{ aspectRatio: "200/300", objectFit: "cover" }}
                  />
                  <h3 className="text-xl font-semibold mb-1 text-white">
                    {movie.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {movie.description}
                  </p>
                </Link>
              ))
          ) : (
            <p className="text-center text-white">Loading movies...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoviesList;
