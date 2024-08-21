import { CssBaseline, GeistProvider } from '@geist-ui/core';
import type { AppProps } from 'next/app';
import NextHead from 'next/head';
import GithubCorner from 'react-github-corner';
import '../styles/globals.css';

// Imports
import { createConfig, WagmiProvider } from '@wagmi/core'; // Correct import for createConfig and WagmiProvider
import { http, getClient, getConnectorClient } from '@wagmi/core'; // Import http, getClient, and getConnectorClient
import { JsonRpcProvider } from 'ethers'; // Import directly from ethers

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

import { arbitrum, bsc, gnosis, optimism, polygon, mainnet } from 'viem/chains'; // Import chains
import { z } from 'zod';
import { useIsMounted } from '../hooks';

// Define chains
const chains = [mainnet, polygon, optimism, arbitrum, bsc, gnosis];

// WalletConnect project ID from environment variables
const walletConnectProjectId = z
  .string()
  .parse(process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID);

// Default Wallets Configuration
const { connectors } = getDefaultWallets({
  appName: 'rosewood',
  projectId: walletConnectProjectId,
});

// Set up Wagmi Config
const wagmiConfig = createConfig({
  chains,
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
    [bsc.id]: http(),
    [gnosis.id]: http(),
  },
});

// Extract a Viem Client for the current active chain
const publicClient = getClient(wagmiConfig);

// Extract a Viem Client for the current active chain & account
const walletClient = getConnectorClient(wagmiConfig);

const App = ({ Component, pageProps }: AppProps) => {
  const isMounted = useIsMounted();

  if (!isMounted) return null;
  return (
    <>
      <GithubCorner
        href="https://github.com/dawsbot/drain"
        size="140"
        bannerColor="#e056fd"
      />

      <WagmiProvider config={wagmiConfig}> {/* Use WagmiProvider with config prop */}
        <RainbowKitProvider coolMode chains={chains}>
          <NextHead>
            <title>Drain</title>
            <meta
              name="description"
              content="Send all tokens from one wallet to another"
            />
            <link rel="icon" href="/favicon.ico" />
          </NextHead>
          <GeistProvider>
            <CssBaseline />
            <Component {...pageProps} />
          </GeistProvider>
        </RainbowKitProvider>
      </WagmiProvider>
    </>
  );
};

export default App;
