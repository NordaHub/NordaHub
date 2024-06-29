import React from "react";
import { useWeb3 } from "./contexts/Web3Context";
import "./wallet.css";

const WalletConnectButton = () => {
  const { account, connectWallet, disconnectWallet } = useWeb3();

  return (
    <div>
      {account ? (
        <button className="wallet-button" onClick={disconnectWallet}>
          Disconnect Wallet
        </button>
      ) : (
        <button className="wallet-button" onClick={connectWallet}>
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default WalletConnectButton;
