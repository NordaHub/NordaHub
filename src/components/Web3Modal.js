import React from "react";
import "./web3modal.css";
import CrossIcon24black from "./CrossIconblack";

const Web3Modal = ({onClose }) => {


    return (
        <div className="web3-modal-overlay">
            <div className="web3-modal">
            <button className="close-button" onClick={onClose}>
          <CrossIcon24black />
        </button>
                <div className="web3-button-container">
                    <div className="web3-containerRow">
                        <div id="placeholderfox" className="web3-wishbutton"><img src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.1546980028.1719590400&semt=sph"/></div>
                        <div id="placeholdercrocodile" className="web3-wishbutton"><img src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.1546980028.1719590400&semt=sph"/></div>
                    </div>
                    
                    <div className="web3-containerRow">
                        <div id="placeholdersnake" className="web3-wishbutton"><img src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.1546980028.1719590400&semt=sph"/></div>
                        <div id="placeholderhorse" className="web3-wishbutton"><img src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.1546980028.1719590400&semt=sph"/></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Web3Modal;