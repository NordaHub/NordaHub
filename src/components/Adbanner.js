import React from 'react';

const AdBanner = ({ adImages }) => {
  return (
    <div className="ad-content">
      {adImages.map((imageUrl, index) => (
        <img key={index} src={imageUrl} alt={`Ad Banner ${index + 1}`} />
      ))}
    </div>
  );
}

export default AdBanner;