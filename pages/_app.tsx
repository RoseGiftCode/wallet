import { CssBaseline, GeistProvider } from '@geist-ui/core';
import type { AppProps } from 'next/app';
import NextHead from 'next/head';
import GithubCorner from 'react-github-corner';
import '../styles/globals.css';

// Imports
import { createConfig, WagmiProvider, http } from 'wagmi';
import { RainbowKitProvider, connectorsForWallets } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { chains } from '../chain'; // Importing from your custom chains file
import { z } from 'zod';
import { useIsMounted } from '../hooks';
import { QueryClient, QueryClientProvider } from 'react-query';

import {
  rainbowWallet,
  walletConnectWallet,
  coinbaseWallet,
  trustWallet,
  uniswapWallet,
  okxWallet,
  metaMaskWallet,
  bybitWallet,
  walletConnectWallet,
  binanceWallet,
} from '@rainbow-me/rainbowkit/wallets';


// Define connectors
const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [coinbaseWallet, trustWallet, rainbowWallet, metaMaskWallet, walletConnectWallet],
  },
  {
    groupName: 'More',
    wallets: [binanceWallet, bybitWallet, okxWallet, trustWallet, uniswapWallet],
  },
], {
  appName: 'Test App',
  projectId: z.string().parse(process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID),
});

// Configure wagmi
const wagmiConfig = createConfig({
  connectors,
  chains: Object.values(chains), // Use chains exported from chain.ts
  transports: {
    [1]: http('https://cloudflare-eth.com'),
    [137]: http('https://polygon-rpc.com'),
    [10]: http('https://mainnet.optimism.io'),
    [42_161]: http('https://arb1.arbitrum.io/rpc'),
    [56]: http('https://rpc.ankr.com/bsc'),
    [100]: http('https://rpc.gnosischain.com'),
    [240]: http('https://rpcurl.pos.nexilix.com'),
    [324]: http('https://mainnet.era.zksync.io'),
    [61]: http('https://etc.rivet.link'),
    [8453]: http('https://mainnet.base.org'),
    [43_114]: http('https://api.avax.network/ext/bc/C/rpc'),
  },
});

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  return (
    <>
      <GithubCorner href="https://github.com/dawsbot/drain" size="140" bannerColor="#e056fd" />

      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider chains={Object.values(chains)}>
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
