import React from "react";
import "./web3modal.css";

const Web3Modal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="web3-modal-overlay">
            <div className="web3-modal">
                <div className="web3-button-container">
                    <div className="web3-containerRow">
                        <div id="placeholderfox" className="web3-wishbutton"></div>
                        <div id="placeholdercrocodile" className="web3-wishbutton"></div>
                    </div>
                    
                    <div className="web3-containerRow">
                        <div id="placeholdersnake" className="web3-wishbutton"></div>
                        <div id="placeholderhorse" className="web3-wishbutton"></div>
                    </div>
                   


                </div>
                <h1>Web3 Modal</h1>
                <p>This is a placeholder for your Web3 modal content.</p>
                <button onClick={onClose}>X</button>
            </div>
        </div>
    );
};

export default Web3Modal;