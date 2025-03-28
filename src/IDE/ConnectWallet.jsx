import React, { useState } from 'react';
import { ethers } from 'ethers';

function ConnectWallet () {
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        const account = accounts[0];
        setWalletAddress(account);

        const balance = await provider.getBalance(account);
        setBalance(ethers.utils.formatEther(balance));
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      alert('MetaMask is not installed. Please install it to use this app.');
    }
  };

  return (
    <div className="">
      <header className="App-header">
        <h1>Connect to MetaMask</h1>
        {walletAddress ? (
          <div>
            <p>Wallet Address: {walletAddress}</p>
            <p>Balance: {balance} ETH</p>
          </div>
        ) : (
          <button onClick={connectWallet}>Connect Wallet</button>
        )}
      </header>
    </div>
  );
}

export default ConnectWallet

