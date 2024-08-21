import { CssBaseline, GeistProvider } from '@geist-ui/core';
import type { AppProps } from 'next/app';
import NextHead from 'next/head';
import GithubCorner from 'react-github-corner';
import '../styles/globals.css';

// Imports
import { createConfig, WagmiProvider } from 'wagmi'; // Import from wagmi
import { JsonRpcProvider } from 'ethers'; // Import directly from ethers

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { reconnect } from '@wagmi/core';

import { mainnet, polygon, optimism, arbitrum, bsc, gnosis, nexilix, zksync, classic, base } from '../chain'; // Correct path for chain.ts
import { z } from 'zod';
import { useIsMounted } from '../hooks';
import { type Chain } from 'viem'; // Ensure Chain type is imported

// Define chains
const chains: readonly [Chain, ...Chain[]] = [mainnet, polygon, optimism, arbitrum, bsc, gnosis, nexilix, zksync, classic, base];

// WalletConnect project ID from environment variables
const walletConnectProjectId = z
  .string()
  .parse(process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID);

// Default Wallets Configuration
const { connectors } = getDefaultWallets({
  appName: 'rosewood',
  projectId: walletConnectProjectId,
});

// Set up Wagmi Client
const wagmiConfig = createConfig({
  reconnect: true,
  connectors,
  provider: () => new JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_PROJECT_ID}`),
  chains, // Ensure chains are correctly typed
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

      <WagmiProvider config={wagmiConfig}> {/* Use WagmiProvider with the correct config */}
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
