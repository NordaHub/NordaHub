import React from 'react';
import '../App.css'; // Import CSS for styling
const NewsModal = ({ onClose }) => {
  return (
    <div className="faq-modal-overlay"> 
      <div className="faq-modal">          
        <button className="close-button2" onClick={onClose}>
          X
        </button>
        <div className="faq-modal-content">

          <div className="faq-section">  
            <h2>BETA Release Of NordaHub Quiz App</h2>         
            <img
              src="https://media.discordapp.net/attachments/972039284410449920/1210024450959872061/asdasd.png?ex=65e90e16&is=65d69916&hm=3ba64dab59f4aa5b6d6f5165aab7e42b5247884320791cd46fc353773d932bcd&=&format=webp&quality=lossless&width=598&height=141"
              alt="News Image 1"
              className="news-image"
            />
            <p>
              Introducing NordaHub Beta: Your Gateway to Crypto Learning and Earning! Embark on a revolutionary journey into the world of cryptocurrency with NordaHub Beta, our cutting-edge Learn-to-Earn decentralized application (DApp). Designed to empower users with both knowledge and tangible rewards, NordaHub Beta is your passport to unlocking the full potential of blockchain technology.
            </p>
          </div>

          {/* Section Divider */}
          <hr className="section-divider" />

          {/* Other news sections */}
          <div className="faq-section">
            {/* Add more news sections here */}
          </div>

        </div>
      </div>
    </div>
  );
};

export default NewsModal;