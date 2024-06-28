import React, { useState, useEffect } from 'react';

function ScrollingAd() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalTime = 15000; // 15 seconds in milliseconds

  useEffect(() => {
    const adImages = document.querySelectorAll(".ad-content img");

    const showNextImage = () => {
      adImages[currentImageIndex].style.display = "none";
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % adImages.length);
      adImages[currentImageIndex].style.display = "block";
    };

    // Show the first image initially
    adImages[0].style.display = "block";

    // Set interval to switch images
    const interval = setInterval(showNextImage, intervalTime);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [currentImageIndex]); // Re-run effect when currentImageIndex changes
import React, { useState, useEffect } from 'react';

function ScrollingAd() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalTime = 15000; // 15 seconds in milliseconds

  useEffect(() => {
    const adImages = document.querySelectorAll(".ad-content img");

    const showNextImage = () => {
      adImages[currentImageIndex].style.display = "none";
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % adImages.length);
      adImages[currentImageIndex].style.display = "block";
    };

    // Show the first image initially
    adImages[0].style.display = "block";

    // Set interval to switch images
    const interval = setInterval(showNextImage, intervalTime);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [currentImageIndex]); // Re-run effect when currentImageIndex changes

export default Scrollingad;