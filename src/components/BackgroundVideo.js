import React from "react";

const BackgroundVideo = () => {
  return (
    <video
      autoPlay
      muted
      loop
      className="absolute top-0 left-0 w-full h-full object-cover"
    >
      <source
        src="https://assets.mixkit.co/videos/23350/23350-720.mp4"
        type="video/mp4"
      />
    </video>
  );
};

export default BackgroundVideo;
