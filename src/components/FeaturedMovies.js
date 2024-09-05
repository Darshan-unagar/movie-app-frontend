// src/components/FeaturedMovies.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


const FeaturedMovies = () => {
  const [featuredMovies, setFeaturedMovies] = useState([]);

  useEffect(() => {
    const refreshPage = () => {
      if (performance.getEntriesByType("navigation")[0].type !== "reload") {
        window.location.reload();
      }
    };
    refreshPage();
    const fetchFeaturedMovies = async () => {
      try {
        const response = await axios.get("https://netstar.info.codesquareinfotech.com/movies");
        setFeaturedMovies(response.data);
      } catch (error) {
        console.error("Error fetching featured movies:", error);
      }
    };

    fetchFeaturedMovies();
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="flex-1">
        <div className="py-12 bg-dark">
          <div className="container mx-auto px-6 md:px-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Featured Movies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredMovies.length > 0 ? (
                featuredMovies.map((movie) => (
                  <div
                    key={movie._id}
                    className="bg-black bg-opacity-70 p-4 rounded-lg"
                  >
                    <Link to={`/movie/${movie._id}`}>
                      <img
                        src={
                          movie.coverImage || "https://via.placeholder.com/200x300"
                        }
                        alt={movie.title}
                        className="w-full h-60 object-cover rounded-lg mb-2"
                      />
                      <h3 className="text-xl font-semibold mb-1">{movie.title}</h3>
                      <p className="text-sm">{movie.description}</p>
                    </Link>
                  </div>
                ))
              ) : (
                <p className="text-center text-white">Loading featured movies...</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <Footer className="absolute bottom-0 w-full" /> */}
    </div>
  );
};

export default FeaturedMovies;
