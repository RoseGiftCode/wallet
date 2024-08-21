import { CssBaseline, GeistProvider } from '@geist-ui/core';
import type { AppProps } from 'next/app';
import NextHead from 'next/head';
import GithubCorner from 'react-github-corner';
import '../styles/globals.css';

// Imports
import { WagmiProvider, createConfig } from 'wagmi'; // Import from wagmi
import { JsonRpcProvider } from 'ethers'; // Import directly from ethers
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

import { mainnet, polygon, optimism, arbitrum, bsc, gnosis, nexilix, zksync, classic, base } from '../chain'; // Correct path for chain.ts
import { z } from 'zod';
import { useIsMounted } from '../hooks';
import { type Chain } from '@rainbow-me/rainbowkit'; // Ensure Chain type is imported

// Define chains
const chains: readonly [Chain, ...Chain[]] = [
  {
    ...mainnet,
    iconBackground: '#000',
    iconUrl: 'https://example.com/icons/ethereum.png',
  },
  {
    ...polygon,
    iconBackground: '#f0f0f0',
    iconUrl: 'https://example.com/icons/polygon.png',
  },
  // Add more chains with their specific configuration
];

// WalletConnect project ID from environment variables
const walletConnectProjectId = z
  .string()
  .parse(process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID);

// Default Wallets Configuration
const { connectors } = getDefaultWallets({
  appName: 'rosewood',
  projectId: walletConnectProjectId,
});

// Set up Wagmi Client configuration
const wagmiConfig = createConfig({
  connectors,
  chains,
});

// The App component
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
      <WagmiProvider config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
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
