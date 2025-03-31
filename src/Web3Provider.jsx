import { WagmiProvider, createConfig, http } from "wagmi";
import { eduChainTestnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const config = createConfig(
  getDefaultConfig({
    chains: [eduChainTestnet], // Ensure this is correctly defined
    walletConnectProjectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID, // Ensure it's set in .env
    appName: "My Web3 App",
    appDescription: "A decentralized application using EduChain Testnet.",
    appUrl: "https://myweb3app.com", // Replace with actual site or localhost
    appIcon: "https://myweb3app.com/icon.png", // Replace with an actual image URL
  })
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
