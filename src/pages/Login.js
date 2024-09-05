import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://movie-app-backend-bthx.onrender.com/users/login", {
        email,
        password,
      });
      const { token, role } = response.data;

      localStorage.setItem("authToken", token);
      if (role === "admin") {
        navigate("/admin/home", { replace: true });
      } else {
        navigate("/home", { replace: true });
      }
      window.location.reload(); 
    } catch (err) {
      setError(err.response?.data?.error || "Invalid email or password");
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div
      className="relative bg-black text-white h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://wallpapers.com/images/featured/movie-9pvmdtvz4cb0xl37.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-6 lg:px-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Login to Your Account
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Access your favorite movies and TV shows.
        </p>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 bg-opacity-80 p-8 rounded-lg shadow-lg max-w-md w-full mx-auto"
        >
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-white"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="block text-lg font-semibold mb-2"
            >
              Password
            </label>
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-white pr-10"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center mt-10"
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
            className="bg-red-600 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-red-700 transition duration-300"
          >
            Login
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          <p className="text-sm mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-red-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
