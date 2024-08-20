import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Spin } from "antd";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ReviewSection from "../components/ReviewSection";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`https://movie-app-backend-bthx.onrender.com/movies/${id}`);
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  function getYouTubeVideoId(url) {
    const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/v\/|youtube\.com\/watch\?v=|youtube\.com\/watch\?v%3D|youtube\.com\/watch\?v%3D|youtube\.com\/watch\?v%3D)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : "";
  }

  const handleWatchNow = () => {
    navigate(`/movies/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <Spin size="large" />
      </div>
    );
  }

  if (!movie) {
    return <div className="text-center text-white">Movie not found.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header className="sticky top-0 z-10" />

      <div className="flex-grow container mx-auto p-6">
        {/* Movie Title */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
        </div>
        <hr className="my-6 border-gray-600" />

        {/* Movie Poster */}
        <div className="flex justify-center mb-6 relative">
          <div className="w-64 h-96 overflow-hidden relative">
            <img
              src={movie.coverImage || "https://via.placeholder.com/300x450"}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Watch Now Button */}
        {movie.videoUrl && (
          <div className="text-center mb-8">
            <button
              onClick={handleWatchNow}
              className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-full text-lg font-semibold transition duration-300"
            >
              Watch Now
            </button>
          </div>
        )}
        <hr className="my-6 border-gray-600" />

        {/* Movie Details */}
        <div className="text-center mb-8">
          <p className="text-lg mb-2">
            <strong>IMDb Rating:</strong> {movie.imdbRating || "N/A"}
          </p>
          <p className="text-lg mb-2">
            <strong>Genre:</strong>{" "}
            {Array.isArray(movie.genre) ? movie.genre.join(" | ") : "N/A"}
          </p>

          <p className="text-lg mb-2">
            <strong>Stars:</strong>{" "}
            {Array.isArray(movie.stars) ? movie.stars.join(", ") : "N/A"}
          </p>
          <p className="text-lg mb-2">
            <strong>Director:</strong> {movie.director}
          </p>
          <p className="text-lg mb-2">
            <strong>Language:</strong> {movie.language}
          </p>
        </div>
        <hr className="my-6 border-gray-600" />

        {/* Movie Gallery */}
        <h2 className="text-2xl font-semibold mb-8 text-center">Gallery :</h2>
        <div className="grid grid-cols-2 gap-4 mb-8">
          {movie.images.map((imgUrl, index) => (
            <div
              key={index}
              className="w-full aspect-w-1 aspect-h-1 overflow-hidden rounded-lg shadow-md"
            >
              <img
                src={imgUrl}
                alt={`Movie scene ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <hr className="my-6 border-gray-600" />

        {/* Watch Trailer Button */}
        {movie.trailerUrl && (
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Watch the Trailer
            </h2>
            <a
              href={movie.trailerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block relative w-full max-w-[400px] mx-auto"
            >
              <div className="relative w-full aspect-w-1 aspect-h-1 overflow-hidden rounded-lg shadow-md">
                <img
                  src={`https://img.youtube.com/vi/${getYouTubeVideoId(
                    movie.trailerUrl
                  )}/hqdefault.jpg`}
                  alt="Trailer thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </div>
              </div>
            </a>
          </div>
        )}
        <hr className="my-6 border-gray-600" />

        {/* Movie Story */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-red-600">
            Story Line :
          </h2>
          <p className="mb-6">{movie.story}</p>
        </div>
        <hr className="my-6 border-gray-600" />

        {/* User Reviews Section */}
        <ReviewSection movieId={id} />
      </div>

      <Footer className="mt-auto" />
    </div>
  );
};

export default MovieDetail;
