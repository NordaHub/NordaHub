import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "303a0843dee0458584aea6c2797e4bcd", // required
    },
  },
};

const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions, // required
});

export const connectWallet = async () => {
  const instance = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(instance);
  const signer = provider.getSigner();
  return { provider, signer };
};

export const disconnectWallet = async () => {
  web3Modal.clearCachedProvider();
};

export default web3Modal;