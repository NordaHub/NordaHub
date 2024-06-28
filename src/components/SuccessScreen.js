import React from 'react';

const SuccessScreen = ({ onClose }) => {
  return (
    <div className="success-screen">
      <h2>Congratulations!</h2>
      <p>You have successfully completed the Traffic Tracker quiz.</p>
      <p>Thank you for participating!</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default SuccessScreen;