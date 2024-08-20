import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Spin } from "antd";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MoviePlayer = () => {
  const { id } = useParams();
  const [movie, setMovie] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <Spin size="large" />
      </div>
    );
  }

  if (!movie || !movie.videoUrl) {
    return <div className="text-center text-white">Movie not found or video URL is missing.</div>;
  }

  // Extract the video ID from the URL
  const videoId = getYouTubeVideoId(movie.videoUrl);
  const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header className="sticky top-0 z-10" />

      <div className="flex-grow container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6 text-center">{movie.title}</h1>
        <div className="flex justify-center mb-6">
          <iframe
            width="100%"
            height="600"
            src={videoUrl}
            title={movie.title}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      </div>

      <Footer className="mt-auto" />
    </div>
  );
};

export default MoviePlayer;

// Helper function to extract YouTube video ID from a URL
function getYouTubeVideoId(url) {
  const regex =
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/v\/|youtube\.com\/watch\?v=|youtube\.com\/watch\?v%3D|youtube\.com\/watch\?v%3D|youtube\.com\/watch\?v%3D)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : "";
}
