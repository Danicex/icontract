import { useAccount, useDisconnect } from 'wagmi';
import { ConnectKitButton } from 'connectkit';
import { useNavigate } from 'react-router-dom';
import { useMyContext } from '@/Context/AppContext';

const ConnectWallet = () => {
  const { walletAdd, setWalletAdd } = useMyContext(); // Call it as a function
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const navigate = useNavigate();

  if (isConnected) {
    // Store user wallet address in local storage
    localStorage.setItem('wallet', address);

    // Update context state
    setWalletAdd(address);

    // Navigate to the "/create" page
    navigate('/create');
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {isConnected ? (
        <div>
          <p className="text-green-500">Connected: {address}</p>
          <button 
            onClick={() => disconnect()} 
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Disconnect
          </button>
        </div>
      ) : (
        <ConnectKitButton />
      )}
    </div>
  );
};

export default ConnectWallet;
