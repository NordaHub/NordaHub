import React, { createContext, useState, useContext, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);

  const connectWallet = async () => {
    try {
      const web3Modal = new Web3Modal();
      const instance = await web3Modal.connect();
      const provider = new ethers.BrowserProvider(instance);
      const signer = await provider.getSigner();
      setProvider(provider);
      const address = await signer.getAddress();
      setAccount(address);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const disconnectWallet = async () => {
    const web3Modal = new Web3Modal();
    const clear = await web3Modal.clearCachedProvider();
    setAccount(null);
    setProvider(null);
  };

  useEffect(() => {
    if (provider) {
      provider.on("accountsChanged", (accounts) => {
        setAccount(accounts[0]);
      });
    }
  }, [provider]);

  return (
    <Web3Context.Provider value={{ account, connectWallet, disconnectWallet }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  return useContext(Web3Context);
};
