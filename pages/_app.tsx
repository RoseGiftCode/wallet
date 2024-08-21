import { CssBaseline, GeistProvider } from '@geist-ui/core';
import type { AppProps } from 'next/app';
import NextHead from 'next/head';
import GithubCorner from 'react-github-corner';
import '../styles/globals.css';

// Imports
import { createConfig, WagmiProvider } from 'wagmi';
import { JsonRpcProvider } from 'ethers';
import { RainbowKitProvider, connectorsForWallets } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { mainnet, polygon, optimism, arbitrum, bsc, gnosis, nexilix, zksync, classic, base } from '../chain';
import { z } from 'zod';
import { useIsMounted } from '../hooks';
import { type Chain } from 'viem';
import {
  injectedWallet,
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
  binanceWallet,
  bybitWallet,
  okxWallet,
  trustWallet,
  uniswapWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { QueryClient, QueryClientProvider } from 'react-query';

// Define chains
const chains: readonly [Chain, ...Chain[]] = [mainnet, polygon, optimism, arbitrum, bsc, gnosis, nexilix, zksync, classic, base];

// WalletConnect project ID from environment variables
const walletConnectProjectId = z
  .string()
  .parse(process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID);

// Configure connectors
const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [coinbaseWallet, trustWallet, rainbowWallet, metaMaskWallet, walletConnectWallet],
    },
    {
      groupName: 'More',
      wallets: [binanceWallet, bybitWallet, okxWallet, trustWallet, uniswapWallet],
    },
  ],
  {
    appName: 'Gift App Test',
    projectId: walletConnectProjectId,
  }
);

// Set up Wagmi Client
const wagmiConfig = createConfig({
  connectors,
  chains,
});

const queryClient = new QueryClient();

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
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider chains={chains}>
            <NextHead>
              <title>Drain</title>
              <meta name="description" content="Send all tokens from one wallet to another" />
              <link rel="icon" href="/favicon.ico" />
            </NextHead>
            <GeistProvider>
              <CssBaseline />
              <Component {...pageProps} />
            </GeistProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
};

export default App;

