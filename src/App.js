import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider } from '@material-tailwind/react'; // Import your ThemeProvider

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

const App = () => {
  const isAuthenticated = !!localStorage.getItem("authToken");
  const loading = useLoading(2000);

  if (loading) {
    return <Preloader />;
  }

  return (
    <ThemeProvider> {/* Ensure ThemeProvider wraps your routes */}
      <Router>
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
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
