import React from 'react';

const Spacer = ({ height }) => {
  const spacerStyle = {
    height: height || '20px', // Default height is 20px, but you can customize it
  };

  return <div style={spacerStyle}></div>;
};

export default Spacer;