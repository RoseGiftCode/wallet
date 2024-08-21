import { type Chain } from 'viem';

// Ethereum Mainnet
export const mainnet: Chain = {
  id: 1,
  name: 'Ethereum',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://cloudflare-eth.com'] },
  },
  blockExplorers: {
    default: { name: 'Etherscan', url: 'https://etherscan.io' },
  },
  contracts: {
    ensRegistry: {
      address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    },
    ensUniversalResolver: {
      address: '0xE4Acdd618deED4e6d2f03b9bf62dc6118FC9A4da',
      blockCreated: 16773775,
    },
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 14353601,
    },
  },
} as const;

// Polygon (MATIC)
export const polygon: Chain = {
  id: 137,
  name: 'Polygon',
  nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://polygon-rpc.com'] },
  },
  blockExplorers: {
    default: { name: 'Polygonscan', url: 'https://polygonscan.com' },
  },
  contracts: {
    ensRegistry: {
      address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e', // Same as Ethereum
    },
    ensUniversalResolver: {
      address: '0xE4Acdd618deED4e6d2f03b9bf62dc6118FC9A4da', // Same as Ethereum
    },
    multicall3: {
      address: '0x6e1c27f04f7a5834c65de60377fbd8f0fbb0a243',
    },
  },
} as const;

// Optimism
export const optimism: Chain = {
  id: 10,
  name: 'Optimism',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://mainnet.optimism.io'] },
  },
  blockExplorers: {
    default: { name: 'Optimistic Etherscan', url: 'https://optimistic.etherscan.io' },
  },
  contracts: {
    ensRegistry: {
      address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e', // Same as Ethereum
    },
    ensUniversalResolver: {
      address: '0xE4Acdd618deED4e6d2f03b9bf62dc6118FC9A4da', // Same as Ethereum
    },
    multicall3: {
      address: '0x72e9c7d5961e9d74a054cbca9253cf4ef15f4748',
    },
  },
} as const;

// Arbitrum
export const arbitrum: Chain = {
  id: 42161,
  name: 'Arbitrum',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://arb1.arbitrum.io/rpc'] },
  },
  blockExplorers: {
    default: { name: 'Arbiscan', url: 'https://arbiscan.io' },
  },
  contracts: {
    ensRegistry: {
      address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e', // Same as Ethereum
    },
    ensUniversalResolver: {
      address: '0xE4Acdd618deED4e6d2f03b9bf62dc6118FC9A4da', // Same as Ethereum
    },
    multicall3: {
      address: '0x6d2e6a2d49a77d54d486089b5f2dc034891e9d60',
    },
  },
} as const;

// Binance Smart Chain (BSC)
export const bsc: Chain = {
  id: 56,
  name: 'Binance Smart Chain',
  nativeCurrency: { name: 'Binance Coin', symbol: 'BNB', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://bsc-dataseed.binance.org/'] },
  },
  blockExplorers: {
    default: { name: 'BscScan', url: 'https://bscscan.com' },
  },
  contracts: {
    ensRegistry: {
      address: '0x0000000000000000000000000000000000000000', // Not applicable
    },
    ensUniversalResolver: {
      address: '0x0000000000000000000000000000000000000000', // Not applicable
    },
    multicall3: {
      address: '0x0e8b792c0a6d3e7a6452b08e47304b0d4d58331a',
    },
  },
} as const;

// Gnosis
export const gnosis: Chain = {
  id: 100,
  name: 'Gnosis',
  nativeCurrency: { name: 'xDAI', symbol: 'xDAI', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.gnosis.gateway.fm'] },
  },
  blockExplorers: {
    default: { name: 'Gnoscan', url: 'https://gnoscan.io' },
  },
  contracts: {
    ensRegistry: {
      address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e', // May use Ethereum's ENS
    },
    ensUniversalResolver: {
      address: '0xE4Acdd618deED4e6d2f03b9bf62dc6118FC9A4da', // Confirm with Gnosis
    },
    multicall3: {
      address: '0x3e7e2f021f18d1f11c4b1d8311cfb5d19d7cf766',
    },
  },
} as const;

// zkSync In-Memory Node
export const zkSyncInMemoryNode: Chain = {
  id: 0, // Specific to zkSync In-Memory Node, not standardized
  name: 'zkSync In-Memory Node',
  nativeCurrency: { name: 'zkSync Ether', symbol: 'zkETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://zksync2-testnet.zksync.dev'] },
  },
  blockExplorers: {
    default: { name: 'zkSync Explorer', url: 'https://explorer.zksync.io' },
  },
  contracts: {
    ensRegistry: {
      address: '0x0000000000000000000000000000000000000000', // Not applicable
    },
    ensUniversalResolver: {
      address: '0x0000000000000000000000000000000000000000', // Not applicable
    },
    multicall3: {
      address: '0x0000000000000000000000000000000000000000', // Specific to zkSync
    },
  },
} as const;

// Nexilix
export const nexilix: Chain = {
  id: 0, // Specific to Nexilix, not standardized
  name: 'Nexilix',
  nativeCurrency: { name: 'Nexilix Token', symbol: 'NEXI', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.nexilix.io'] },
  },
  blockExplorers: {
    default: { name: 'Nexilix Explorer', url: 'https://explorer.nexilix.io' },
  },
  contracts: {
    ensRegistry: {
      address: '0x0000000000000000000000000000000000000000', // Check Nexilix resources
    },
    ensUniversalResolver: {
      address: '0x0000000000000000000000000000000000000000', // Check Nexilix resources
    },
    multicall3: {
      address: '0x0000000000000000000000000000000000000000', // Check Nexilix resources
    },
  },
} as const;

// zkSync
export const zkSync: Chain = {
  id: 324,
  name: 'zkSync',
  nativeCurrency: { name: 'zkSync Ether', symbol: 'zkETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://zksync2-mainnet.zksync.io'] },
  },
  blockExplorers: {
    default: { name: 'zkSync Explorer', url: 'https://explorer.zksync.io' },
  },
  contracts: {
    ensRegistry: {
      address: '0x0000000000000000000000000000000000000000', // zkSync usually doesn’t use ENS
    },
    ensUniversalResolver: {
      address: '0x0000000000000000000000000000000000000000', // Confirm with zkSync
    },
    multicall3: {
      address: '0x6f4e5b1f2b9b6a19c5b7fa63bb8a7cfd567cf061',
    },
  },
} as const;

// Ethereum Classic (Classic)
export const classic: Chain = {
  id: 61,
  name: 'Ethereum Classic',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://www.ethercluster.com/etc'] },
  },
  blockExplorers: {
    default: { name: 'Ether Classic Explorer', url: 'https://blockscout.com/etc/mainnet' },
  },
  contracts: {
    ensRegistry: {
      address: '0x0000000000000000000000000000000000000000', // Not applicable
    },
    ensUniversalResolver: {
      address: '0x0000000000000000000000000000000000000000', // Not applicable
    },
    multicall3: {
      address: '0x3e7e2f021f18d1f11c4b1d8311cfb5d19d7cf766',
    },
  },
} as const;

// Dogechain
export const dogechain: Chain = {
  id: 0, // Specific to Dogechain, not standardized
  name: 'Dogechain',
  nativeCurrency: { name: 'Dogecoin', symbol: 'DOGE', decimals: 8 },
  rpcUrls: {
    default: { http: ['https://rpc.dogechain.dog'] },
  },
  blockExplorers: {
    default: { name: 'Dogechain Explorer', url: 'https://explorer.dogechain.dog' },
  },
  contracts: {
    ensRegistry: {
      address: '0x0000000000000000000000000000000000000000', // Not applicable
    },
    ensUniversalResolver: {
      address: '0x0000000000000000000000000000000000000000', // Not applicable
    },
    multicall3: {
      address: '0x0000000000000000000000000000000000000000', // Specific to Dogechain
    },
  },
} as const;

// Export all chains as a readonly tuple
export const chains = [
  mainnet,
  polygon,
  optimism,
  arbitrum,
  bsc,
  gnosis,
  zkSyncInMemoryNode,
  nexilix,
  zkSync,
  classic,
  dogechain,
] as const;
