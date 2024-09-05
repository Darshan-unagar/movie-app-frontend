import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Utility function to check password strength
const getPasswordStrength = (password) => {
  if (password.length < 8) return 'Weak';
  if (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(password)) return 'Strong';
  if (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}/.test(password)) return 'Medium';
  return 'Weak';
};

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordStrength, setPasswordStrength] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'password') {
      setPasswordStrength(getPasswordStrength(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      await axios.post('https://netstar.info.codesquareinfotech.com/users/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      toast.success('Signup successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Signup failed');
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  return (
    <div
      className="relative bg-black text-white min-h-screen bg-cover bg-center flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage:
          "url('https://wallpapers.com/images/featured/movie-9pvmdtvz4cb0xl37.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center w-full max-w-md">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Create Your Account
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Join us to access your favorite movies and TV shows.
        </p>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 bg-opacity-80 p-8 rounded-lg shadow-lg w-full"
        >
          <div className="mb-4">
            <label htmlFor="username" className="block text-lg font-semibold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-white"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-white"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-lg font-semibold mb-2">
              Password
            </label>
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-white pr-10"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {isPasswordVisible ? (
                <FaEyeSlash className="text-gray-400" />
              ) : (
                <FaEye className="text-gray-400" />
              )}
            </button>
            <p className={`mt-2 text-sm ${passwordStrength === 'Weak' ? 'text-red-500' : passwordStrength === 'Medium' ? 'text-yellow-500' : 'text-green-500'}`}>
              Password Strength: {passwordStrength}
            </p>
          </div>
          <div className="mb-6 relative">
            <label htmlFor="confirmPassword" className="block text-lg font-semibold mb-2">
              Confirm Password
            </label>
            <input
              type={isConfirmPasswordVisible ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-white pr-10"
              placeholder="Confirm your password"
              required
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center mt-10"
            >
              {isConfirmPasswordVisible ? (
                <FaEyeSlash className="text-gray-400" />
              ) : (
                <FaEye className="text-gray-400" />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="bg-red-600 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-red-700 transition duration-300 w-full"
          >
            Sign Up
          </button>
          <p className="text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-red-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Signup;
