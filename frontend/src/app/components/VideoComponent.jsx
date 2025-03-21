import { useState, useRef } from "react";
import "../components/CSS/VideoComponent.css";

const VideoComponent = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleVideo = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="video-container">
      <video autoPlay muted loop ref={videoRef} id="background-video">
        <source src="src/assets/videos/Waterfall.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Text */}
      <h1 className="video-title">Wanderlust</h1>

      {/* Play Button */}
      <div className="play-button" onClick={toggleVideo}>
        <img
          src={
            isPlaying
              ? "src/assets/images/PauseButton.png"
              : "src/assets/images/PlayButton.png"
          }
          alt="Play Button"
        />
      </div>
    </div>
  );
};

export default VideoComponent;
