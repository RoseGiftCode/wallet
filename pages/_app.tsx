import { CssBaseline, GeistProvider } from '@geist-ui/core';
import type { AppProps } from 'next/app';
import NextHead from 'next/head';
import GithubCorner from 'react-github-corner';
import '../styles/globals.css';

// Imports
import { createClient, WagmiConfig } from 'wagmi'; // Use the correct function from wagmi
import { JsonRpcProvider } from 'ethers'; // Import from ethers

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

import { arbitrum, bsc, gnosis, optimism, polygon, mainnet } from 'viem/chains'; // Import chains
import { z } from 'zod';
import { useIsMounted } from '../hooks';

// Create JsonRpcProvider instances for each chain
const rpcProvider = (chainId: number) => new JsonRpcProvider(`https://rpc.${chainId}.com`);

const walletConnectProjectId = z
  .string()
  .parse(process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID);

// Define chains
const chains = [mainnet, polygon, optimism, arbitrum, bsc, gnosis];

// Default Wallets Configuration
const { connectors } = getDefaultWallets({
  appName: 'rosewood',
  projectId: walletConnectProjectId, // Use the dynamic projectId from environment variables
});

// Configure Wagmi Client
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider: rpcProvider, // Adjust provider if needed
  chains, // Ensure chains is correctly typed as an array of Chain objects
});

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

      <WagmiConfig client={wagmiClient}> {/* Use "client" prop */}
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
      </WagmiConfig>
    </>
  );
};

export default App;
