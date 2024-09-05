import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ThemeProvider } from '@material-tailwind/react'; 

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import useLoading from "./hooks/useLoading";
import Preloader from "./components/Preloader";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetails";
import CategoryList from "./pages/CategoryList";
import MoviesByCategory from "./components/MoviesByCategory";
import Profile from "./pages/Profile";
import UpdatePassword from "./components/UpdatePassword";
import MoviePlayer from "./components/MoviePlayer";
import AdminHomePage from "./pages/admin/AdminHomePage";
import AdminMoviesPage from "./pages/admin/AdminMoviesPage";
import AdminCreateMoviePage from "./pages/admin/AdminCreateMoviePage";
import EditMoviePage from "./pages/admin/EditMoviePage";
import ManageUsersPage from "./pages/admin/ManageUsersPage ";
import EditUserPage from "./pages/admin/EditUserPage ";

const App = () => {
  const isAuthenticated = !!localStorage.getItem("authToken");
  const loading = useLoading(2000);
  const location = useLocation(); 
  const navigate = useNavigate(); // Hook for navigating programmatically

  // Effect to simulate a page refresh on route change
  useEffect(() => {
    navigate(location.pathname, { replace: true }); // Navigate to the same path to refresh
  }, [location.pathname, navigate]);

  if (loading) {
    return <Preloader />;
  }

  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" replace />} />
        <Route path="/updatepassword" element={isAuthenticated ? <UpdatePassword /> : <Navigate to="/login" replace />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/category/:category" element={<MoviesByCategory />} />
        <Route path="/movies/:id" element={<MoviePlayer />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/admin/home" element={<AdminHomePage />} />
        <Route path="/admin/movies" element={<AdminMoviesPage />} />
        <Route path="/admin/movies/create" element={<AdminCreateMoviePage />} />
        <Route path="/admin/movies/edit/:id" element={<EditMoviePage />} />
        <Route path="/admin/users" element={<ManageUsersPage />} />
        <Route path="/admin/users/edit/:id" element={<EditUserPage />} />
      </Routes>
    </ThemeProvider>
  );
};

const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
