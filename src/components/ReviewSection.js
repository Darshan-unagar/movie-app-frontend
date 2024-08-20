import React, { useState, useEffect } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Correct import for jwtDecode
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ReviewSection = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false); // State to toggle login form visibility
  const [loginError, setLoginError] = useState(""); // State to store login errors
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Fetch reviews
  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `https://movie-app-backend-bthx.onrender.com/movies/${movieId}`
      );
      setReviews(response.data.reviews.reverse());
      setLoading(false);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [movieId]);

  // Refetch reviews
  const refetchReviews = async () => {
    await fetchReviews();
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://movie-app-backend-bthx.onrender.com/movies/${movieId}/reviews`,
        { content: newReview },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      setNewReview("");
      refetchReviews();
    } catch (error) {
      setError("Failed to submit review");
      console.error("Error submitting review:", error);
    }
  };

  const handleLike = async (reviewId) => {
    try {
      const response = await axios.post(
        `https://movie-app-backend-bthx.onrender.com/movies/${movieId}/reviews/${reviewId}/like`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review._id === reviewId
            ? {
                ...review,
                likes: response.data.likes,
                likedBy: response.data.likedBy,
              }
            : review
        )
      );
    } catch (error) {
      console.error("Error liking review:", error);
    }
  };

  const handleDislike = async (reviewId) => {
    try {
      const response = await axios.post(
        `https://movie-app-backend-bthx.onrender.com/movies/${movieId}/reviews/${reviewId}/dislike`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review._id === reviewId
            ? {
                ...review,
                dislikes: response.data.dislikes,
                dislikedBy: response.data.dislikedBy,
              }
            : review
        )
      );
    } catch (error) {
      console.error("Error disliking review:", error);
    }
  };

  const hasUserLiked = (review) => {
    const token = localStorage.getItem("authToken");
    if (!token) return false;

    const decoded = jwtDecode(token);
    return Array.isArray(review.likedBy) && review.likedBy.includes(decoded.id);
  };

  const hasUserDisliked = (review) => {
    const token = localStorage.getItem("authToken");
    if (!token) return false;

    const decoded = jwtDecode(token);
    return (
      Array.isArray(review.dislikedBy) && review.dislikedBy.includes(decoded.id)
    );
  };

  const generateAvatar = (username) => {
    const initials = username
      .split(" ")
      .map((name) => name[0])
      .join("");
    return (
      <div className="w-10 h-10 flex items-center justify-center bg-gray-700 text-white rounded-full">
        {initials}
      </div>
    );
  };

  const toggleLoginForm = () => {
    setShowLogin(!showLogin);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://movie-app-backend-bthx.onrender.com/users/login", {
        email: loginEmail,
        password: loginPassword,
      });

      localStorage.setItem("authToken", response.data.token);
      setIsLoggedIn(true);
      setShowLogin(false);
      setLoginEmail("");
      setLoginPassword("");
      window.location.reload();
    } catch (error) {
      setLoginError("Failed to log in");
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="mt-8 relative">
      <h2 className="text-2xl font-semibold mb-4">User Reviews</h2>
      {/* Review Form or Login Alert */}
      {isLoggedIn ? (
        <form onSubmit={handleReviewSubmit} className="mb-6">
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            className="w-full bg-gray-900 text-white p-4 rounded-lg mb-4"
            placeholder="Write your review..."
            rows="4"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
          >
            Submit Review
          </button>
        </form>
      ) : (
        <div
          className="bg-red-600 text-white py-4 px-6 rounded-lg mb-6 cursor-pointer"
          onClick={toggleLoginForm}
        >
          <p>Please log in to submit a review.</p>
        </div>
      )}
      {/* Login Form */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-lg w-96 relative">
            <button
              onClick={toggleLoginForm}
              className="absolute top-2 right-2 text-white text-xl"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4">Log In</h3>
            {loginError && (
              <div className="text-red-500 mb-4">{loginError}</div>
            )}
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <label className="block text-white mb-1">Email:</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-6 relative">
                <label className="block text-white mb-1">Password:</label>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 text-white pr-10"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center mt-5"
                >
                  {isPasswordVisible ? (
                    <FaEyeSlash className="text-gray-400" />
                  ) : (
                    <FaEye className="text-gray-400" />
                  )}
                </button>
              </div>
              <button
                type="submit"
                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
              >
                Log In
              </button>
              <a
                href="/signup"
                className="text-red-600 hover:text-red-700 underline mt-4 block text-center"
              >
                Don't have an account? Register here.
              </a>
            </form>
          </div>
        </div>
      )}
      {/* Reviews List */}
      {loading ? (
        <div className="text-light-gray text-center">Loading reviews...</div>
      ) : reviews.length > 0 ? (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li key={review._id} className="bg-charcoal-light p-4 rounded-md">
              <div className="flex items-start space-x-3">
                {generateAvatar(review.username)}
                <div>
                  <p className="mb-2 text-lg font-semibold text-light-gray">
                    <strong>{review.username}</strong>
                  </p>
                  <p className="text-light-gray">{review.content}</p>
                  {isLoggedIn && (
                    <div className="flex items-center mt-2 space-x-4">
                      <div
                        onClick={() => handleLike(review._id)}
                        className={`cursor-pointer flex items-center space-x-1 ${
                          hasUserLiked(review) ? "text-blue-500" : ""
                        }`}
                      >
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        <span>{review.likes}</span>
                      </div>
                      <div
                        onClick={() => handleDislike(review._id)}
                        className={`cursor-pointer flex items-center space-x-1 ${
                          hasUserDisliked(review) ? "text-red-500" : ""
                        }`}
                      >
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2c1.65 0 3.26.7 4.4 1.85L18.55 5 19.7 6.14C21.23 8.53 22 11.07 22 13.5c0 4.08-4.35 7.73-9.47 12.1L12 21.35l-1.53-1.39C6.35 21.23 2 17.58 2 13.5c0-2.43.77-4.97 1.99-7.37L6.6 3.85C7.74 2.7 9.35 2 12 2zm0 2c-1.3 0-2.55.46-3.55 1.3L7.65 6.36c-1.17 1.04-1.8 2.43-1.8 3.9 0 3.19 3.02 6.02 7.65 10.04 4.62-4.02 7.64-6.85 7.64-10.04 0-1.47-.63-2.86-1.8-3.9l-1.8-1.06C14.55 4.46 13.3 4 12 4z" />
                        </svg>
                        <span>{review.dislikes}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-light-gray text-center">
          No reviews yet. Be the first to review this movie!
        </p>
      )}
    </div>
  );
};

export default ReviewSection;
