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
        <source src="assets/videos/Waterfall.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Text */}
      <h1 className="video-title">Wanderlust</h1>

      {/* Play Button */}
      <div className="play-button" onClick={toggleVideo}>
        <img
          src={
            isPlaying
              ? "assets/images/PauseButton.png"
              : "assets/images/PlayButton.png"
          }
          alt="Play Button"
        />
      </div>
    </div>
  );
};

export default VideoComponent;

// import { useEffect, useRef, useState } from "react";
// import "../components/CSS/VideoComponent.css";

// const VideoComponent = () => {
//   const videoRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(true);

//   const toggleVideo = () => {
//     if (!videoRef.current) return;

//     if (videoRef.current.paused) {
//       videoRef.current.play().catch((err) => {
//         console.warn("Play interrupted:", err);
//       });
//       setIsPlaying(true);
//     } else {
//       videoRef.current.pause();
//       setIsPlaying(false);
//     }
//   };

//   // Safely handle autoplay with effect
//   useEffect(() => {
//     const video = videoRef.current;
//     if (video) {
//       const playPromise = video.play();
//       if (playPromise !== undefined) {
//         playPromise.catch((error) => {
//           console.warn("AutoPlay failed:", error);
//         });
//       }
//     }

//     return () => {
//       if (video) {
//         video.pause();
//         video.remove(); // Clean up video on unmount
//       }
//     };
//   }, []);

//   return (
//     <div className="video-container">
//       <video autoPlay muted loop ref={videoRef} id="background-video">
//         <source src="/assets/videos/Waterfall.mp4" type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>

//       <h1 className="video-title">Wanderlust</h1>

//       <div className="play-button" onClick={toggleVideo}>
//         <img
//           src={
//             isPlaying
//               ? "/assets/images/PauseButton.png"
//               : "/assets/images/PlayButton.png"
//           }
//           alt="Play Button"
//         />
//       </div>
//     </div>
//   );
// };

// export default VideoComponent;
