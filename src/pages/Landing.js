import React, { useEffect, useState, Suspense, lazy } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AdComponent from "../components/AdComponent ";

const Landing = () => {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [moviesList, setMoviesList] = useState([]);
  const navigate = useNavigate(); // useNavigate hook

  const LazyBackgroundVideo = lazy(() => import("../components/BackgroundVideo"));
  const LazyMoviesList = lazy(() => import("../components/MovieList"));

  // Refresh the page when component loads
  useEffect(() => {
    const refreshPage = () => {
      if (performance.getEntriesByType("navigation")[0].type !== "reload") {
        window.location.reload();
      }
    };
    refreshPage();

    const fetchFeaturedMovies = async () => {
      try {
        const response = await axios.get(
          "https://netstar.info.codesquareinfotech.com/movies/featured-random"
        );
        setFeaturedMovies(response.data);
      } catch (error) {
        console.error("Error fetching featured movies:", error);
      }
    };

    const fetchMoviesList = async () => {
      try {
        const response = await axios.get("https://movie-app-backend-bthx.onrender.com/movies");
        setMoviesList(response.data);
      } catch (error) {
        console.error("Error fetching movies list:", error);
      }
    };

    fetchFeaturedMovies();
    fetchMoviesList();
  }, []);

  const handleGetStartedClick = () => {
    navigate("/home");
  };

  return (
    <div>
      {/* Header with Logo and Search Box */}
      <div className="relative z-20 bg-black text-white py-4 px-6">
        <AdComponent />
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="text-3xl font-bold text-red-600">NetStar</div>
          <div className="space-x-4">
            <Link
              to="/login"
              className="text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      <div className="relative bg-black text-white h-screen">
        {/* Background video */}
        <Suspense fallback={<div>Loading background video...</div>}>
          <LazyBackgroundVideo />
        </Suspense>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-60 z-10"></div>

        {/* Main Content */}
        <div className="relative z-20 flex flex-col items-center justify-center h-screen px-6 lg:px-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Stream Your Favorite Movies and Shows
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Enjoy the best content from Netflix, Hotstar, and Amazon Prime all
            in one place.
          </p>
          <button
            onClick={handleGetStartedClick}
            className="bg-red-600 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-red-700 transition duration-300"
          >
            Get Started
          </button>
        </div>

        {/* Movies List */}
        <Suspense fallback={<div>Loading movies list...</div>}>
          <LazyMoviesList moviesList={moviesList} />
        </Suspense>

        {/* Call to Action */}
        <div className="relative z-20 py-12 bg-gray-900 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Watch?
          </h2>
          <p className="text-lg mb-6">
            Sign up today and start exploring a world of entertainment.
          </p>
          <Link
            to="/signup"
            className="bg-yellow-500 text-black py-3 px-8 rounded-full text-lg font-semibold hover:bg-yellow-600 transition duration-300"
          >
            Sign Up
          </Link>
        </div>

        {/* Footer */}
        <footer className="bg-black text-white py-6 px-4">
          <div className="container mx-auto text-center">
            <p className="text-sm mb-4">© 2024 NetStar. All rights reserved.</p>
            <div className="flex justify-center space-x-4 mb-4">
              <Link to="/about" className="hover:underline">
                About Us
              </Link>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
              <Link to="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:underline">
                Terms of Service
              </Link>
            </div>
            <p className="text-sm">
              Follow us on{" "}
              <a
                href="https://twitter.com"
                className="text-red-600 hover:underline"
              >
                Twitter
              </a>{" "}
              and{" "}
              <a
                href="https://facebook.com"
                className="text-red-600 hover:underline"
              >
                Facebook
              </a>
              .
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
