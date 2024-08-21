import { CssBaseline, GeistProvider } from '@geist-ui/core';
import type { AppProps } from 'next/app';
import NextHead from 'next/head';
import GithubCorner from 'react-github-corner';
import '../styles/globals.css';

// Imports
import { createConfig, WagmiConfig } from 'wagmi';
import { JsonRpcProvider } from '@ethersproject/providers'; // Import from @ethersproject/providers

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

import { arbitrum, bsc, gnosis, optimism, polygon, mainnet } from 'viem/chains';
import { z } from 'zod';
import { useIsMounted } from '../hooks';

// Create JsonRpcProvider instances for each chain
const rpcProvider = new JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_PROJECT_ID}`);

// Define chains
const chains = [mainnet, polygon, optimism, arbitrum, bsc, gnosis] as const; // Ensure chains are typed correctly

// WalletConnect project ID from environment variables
const walletConnectProjectId = z
  .string()
  .parse(process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID);

// Default Wallets Configuration
const { connectors } = getDefaultWallets({
  appName: 'rosewood',
  projectId: walletConnectProjectId,
  chains,
});

// Configure Wagmi Client
const wagmiConfig = createConfig({
  connectors,
  provider: () => rpcProvider, // Ensure the provider is correctly returned
  publicClient: rpcProvider, // Add the publicClient property
  chains,
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

      <WagmiConfig config={wagmiConfig}>
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
