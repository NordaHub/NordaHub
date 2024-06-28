import { useState } from "react";

const PlayButtonSVG = () => (
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="50" cy="50" r="48" stroke="black" strokeWidth="4" fill="red" />
    <polygon points="40,30 70,50 40,70" fill="white" />
  </svg>
);

const VideoPlaceholder = ({ title, videoId }) => {
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  const handleClick = () => {
    setIsVideoVisible(true);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        cursor: "pointer",
        position: "relative",
        width: "100%",
        paddingBottom: "56.25%",
        height: 0,
      }}
    >
      {!isVideoVisible ? (
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            borderRadius: "8px",
          }}
        >
          <PlayButtonSVG />
        </div>
      ) : (
        <iframe
          title={title}
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: "absolute", top: 0, left: 0 }}
        ></iframe>
      )}
    </div>
  );
};

export default VideoPlaceholder;
