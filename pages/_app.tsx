import { CssBaseline, GeistProvider } from '@geist-ui/core';
import type { AppProps } from 'next/app';
import NextHead from 'next/head';
import GithubCorner from 'react-github-corner';
import '../styles/globals.css';

// Imports
import { createConfig, WagmiConfig } from 'wagmi';
import { JsonRpcProvider } from 'ethers'; // Import from ethers

import { getDefaultWallets, RainbowKitProvider, connectorsForWallets } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

import { arbitrum, bsc, gnosis, optimism, polygon, mainnet } from 'viem/chains';
import { z } from 'zod';
import { useIsMounted } from '../hooks';

// Create JsonRpcProvider instances for each chain
const rpcProvider = (chainId: number) => new JsonRpcProvider(`https://rpc.${chainId}.com`);

const walletConnectProjectId = z
  .string()
  .parse(process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID);

const chains = [mainnet, polygon, optimism, arbitrum, bsc, gnosis];

// Default Wallets Configuration
const { wallets } = getDefaultWallets({
  appName: 'rosewood',
  projectId: walletConnectProjectId, // Use the dynamic projectId from environment variables
});

// Define additional wallets
const additionalWallets = [
  argentWallet({ projectId: walletConnectProjectId }),
  trustWallet({ projectId: walletConnectProjectId }),
  ledgerWallet({ projectId: walletConnectProjectId }),
];

// Connectors Configuration
const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: additionalWallets,
  },
]);

const wagmiClient = createConfig({
  autoConnect: true,
  connectors,
  provider: publicClient, // Use the provider directly
  chains, // Use the native chains parameter
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

      <WagmiConfig config={wagmiClient}> {/* Updated to use "config" prop */}
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
