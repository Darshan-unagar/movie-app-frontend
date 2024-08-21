import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "antd";
import Header from "../components/Header";
import AccountManu from "../components/AccountManu";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const imgRefs = useRef([]);

  const fetchMovies = async (query = "") => {
    try {
      const response = await axios.get("https://movie-app-backend-bthx.onrender.com/movies");
      const moviesData = response.data;
      if (query) {
        setFilteredMovies(
          moviesData.filter((movie) =>
            movie.title.toLowerCase().includes(query.toLowerCase())
          )
        );
      } else {
        setMovies(moviesData);
        const randomMovie = getRandomMovie(moviesData);
        setFeaturedMovie(randomMovie); 
        setFilteredMovies(moviesData.filter((movie) => movie._id !== randomMovie._id));
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const getRandomMovie = (moviesArray) => {
    const randomIndex = Math.floor(Math.random() * moviesArray.length);
    return moviesArray[randomIndex];
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const imgElement = entry.target;
          imgElement.src = imgElement.dataset.src;
          observer.unobserve(imgElement);
        }
      });
    }, {
      rootMargin: '0px 0px 100px 0px', // Preload images 100px before they appear
    });

    imgRefs.current.forEach((img) => {
      if (img) observer.observe(img);
    });

    return () => observer.disconnect();
  }, [filteredMovies]);

  const handleSearch = (value) => {
    fetchMovies(value);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        handleSearch={handleSearch}
        accountMenu={<AccountManu />}
      />

      <main className="flex-1">
        <section className="relative h-[70vh] overflow-hidden">
          {featuredMovie && (
            <>
              <img
                src={featuredMovie.coverImage || "/placeholder.svg"}
                alt={featuredMovie.title}
                className="w-full h-full object-cover"
                width={1920}
                height={1080}
                loading="lazy"
                style={{ aspectRatio: "1920/1080", objectFit: "cover" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 text-white max-w-xl">
                <h1 className="text-4xl font-bold mb-4">
                  {featuredMovie.title}
                </h1>
                <p className="mb-6">{featuredMovie.description}</p>
                <div className="flex gap-4">
                  <Link to={`/movie/${featuredMovie._id}`}>
                    <Button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded">
                      Watch Now
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </section>

        <section className="py-12 px-6">
          <h2 className="text-2xl font-bold mb-6">Newly Added Movies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMovies.map((movie, index) => (
              <Link
                to={`/movie/${movie._id}`}
                key={movie._id}
                className="group"
              >
                <img
                  data-src={movie.coverImage || "/placeholder.svg"}
                  alt={movie.title}
                  className="w-full h-[300px] object-cover rounded-lg group-hover:scale-105 transition-transform"
                  ref={(el) => (imgRefs.current[index] = el)}
                  width={300}
                  height={450}
                  loading="lazy"
                  style={{ aspectRatio: "300/450", objectFit: "cover" }}
                />
                <h3 className="text-lg font-bold mt-2 group-hover:underline">
                  {movie.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-[#1a1a1a] text-white py-6 px-6 flex items-center justify-between">
        <p>&copy; 2023 MovieStream. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link to="/about" className="hover:underline">
            About
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
          <Link to="/privacy" className="hover:underline">
            Privacy
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Home;
