import { type Chain } from 'viem';

function defineChain(chain: Chain) {
  return {
    formatters: undefined,
    fees: undefined,
    serializers: undefined,
    ...chain,
  };
}

const opStackChainConfig = {
  contracts: {
    multicall3: {
      address: '0x...',
      blockCreated: 0,
    },
  },
};

const zksyncChainConfig = {
  contracts: {
    multicall3: {
      address: '0x...',
      blockCreated: 0,
    },
  },
};

// Avalanche
export const avalanche = /*#__PURE__*/ defineChain({
  id: 43_114,
  name: 'Avalanche',
  nativeCurrency: {
    decimals: 18,
    name: 'Avalanche',
    symbol: 'AVAX',
  },
  rpcUrls: {
    default: { http: ['https://api.avax.network/ext/bc/C/rpc'] },
  },
  blockExplorers: {
    default: {
      name: 'SnowTrace',
      url: 'https://snowtrace.io',
      apiUrl: 'https://api.snowtrace.io',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 11907934,
    },
  },
})

// Arbitrum
export const arbitrum = /*#__PURE__*/ defineChain({
  id: 42_161,
  name: 'Arbitrum One',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://arb1.arbitrum.io/rpc'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Arbiscan',
      url: 'https://arbiscan.io',
      apiUrl: 'https://api.arbiscan.io/api',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 7654707,
    },
  },
})

// BNB Smart Chain (BSC)
export const bsc = /*#__PURE__*/ defineChain({
  id: 56,
  name: 'BNB Smart Chain',
  nativeCurrency: {
    decimals: 18,
    name: 'BNB',
    symbol: 'BNB',
  },
  rpcUrls: {
    default: { http: ['https://rpc.ankr.com/bsc'] },
  },
  blockExplorers: {
    default: {
      name: 'BscScan',
      url: 'https://bscscan.com',
      apiUrl: 'https://api.bscscan.com/api',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 15921452,
    },
  },
})

// Base
const baseSourceId = 1 // mainnet
export const base = /*#__PURE__*/ defineChain({
  ...opStackChainConfig,
  id: 8453,
  name: 'Base',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://mainnet.base.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Basescan',
      url: 'https://basescan.org',
      apiUrl: 'https://api.basescan.org/api',
    },
  },
  contracts: {
    ...opStackChainConfig.contracts,
    l2OutputOracle: {
      [baseSourceId]: {
        address: '0x56315b90c40730925ec5485cf004d835058518A0',
      },
    },
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 5022,
    },
    portal: {
      [baseSourceId]: {
        address: '0x49048044D57e1C92A77f79988d21Fa8fAF74E97e',
        blockCreated: 17482143,
      },
    },
    l1StandardBridge: {
      [baseSourceId]: {
        address: '0x3154Cf16ccdb4C6d922629664174b904d80F2C35',
        blockCreated: 17482143,
      },
    },
  },
  sourceId: baseSourceId,
})

// Polygon
export const polygon = /*#__PURE__*/ defineChain({
  id: 137,
  name: 'Polygon',
  nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://polygon-rpc.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'PolygonScan',
      url: 'https://polygonscan.com',
      apiUrl: 'https://api.polygonscan.com/api',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 25770160,
    },
  },
})

// ZKsync Era
export const zksync = /*#__PURE__*/ defineChain({
  ...zksyncChainConfig,
  id: 324,
  name: 'ZKsync Era',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://mainnet.era.zksync.io'],
      webSocket: ['wss://mainnet.era.zksync.io/ws'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Etherscan',
      url: 'https://era.zksync.network/',
      apiUrl: 'https://api-era.zksync.network/api',
    },
    native: {
      name: 'ZKsync Explorer',
      url: 'https://explorer.zksync.io/',
      apiUrl: 'https://block-explorer-api.mainnet.zksync.io/api',
    },
  },
  contracts: {
    multicall3: {
      address: '0xF9cda624FBC7e059355ce98a31693d299FACd963',
    },
  },
})

// Nexilix Smart Chain
export const nexilix = /*#__PURE__*/ defineChain({
  id: 240,
  name: 'Nexilix Smart Chain',
  nativeCurrency: {
    decimals: 18,
    name: 'Nexilix',
    symbol: 'NEXILIX',
  },
  rpcUrls: {
    default: { http: ['https://rpcurl.pos.nexilix.com'] },
  },
  blockExplorers: {
    default: {
      name: 'NexilixScan',
      url: 'https://scan.nexilix.com',
    },
  },
  contracts: {
    multicall3: {
      address: '0x58381c8e2BF9d0C2C4259cA14BdA9Afe02831244',
      blockCreated: 74448,
    },
  },
})

// Gnosis
export const gnosis = /*#__PURE__*/ defineChain({
  id: 100,
  name: 'Gnosis',
  nativeCurrency: {
    decimals: 18,
    name: 'Gnosis',
    symbol: 'xDAI',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.gnosischain.com'],
      webSocket: ['wss://rpc.gnosischain.com/wss'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Gnosisscan',
      url: 'https://gnosisscan.io',
      apiUrl: 'https://api.gnosisscan.io/api',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 21022491,
    },
  },
})

// Ethereum Classic
export const classic = /*#__PURE__*/ defineChain({
  id: 61,
  name: 'Ethereum Classic',
  nativeCurrency: {
    decimals: 18,
    name: 'ETC',
    symbol: 'ETC',
  },
  rpcUrls: {
    default: { http: ['https://etc.rivet.link'] },
  },
  blockExplorers: {
    default: {
      name: 'Blockscout',
      url: 'https://blockscout.com/etc/mainnet',
    },
  },
})

// Ethereum Mainnet
export const mainnet = /*#__PURE__*/ defineChain({
  id: 1,
  name: 'Ethereum',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://cloudflare-eth.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Etherscan',
      url: 'https://etherscan.io',
      apiUrl: 'https://api.etherscan.io/api',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 14353601,
    },
  },
})

const sourceId = 1 // mainnet

export const optimism = /*#__PURE__*/ defineChain({
  ...chainConfig,
  id: 10,
  name: 'OP Mainnet',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://mainnet.optimism.io'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Optimism Explorer',
      url: 'https://optimistic.etherscan.io',
      apiUrl: 'https://api-optimistic.etherscan.io/api',
    },
  },
  contracts: {
    ...chainConfig.contracts,
    disputeGameFactory: {
      [sourceId]: {
        address: '0xe5965Ab5962eDc7477C8520243A95517CD252fA9',
      },
    },
    l2OutputOracle: {
      [sourceId]: {
        address: '0xdfe97868233d1aa22e815a266982f2cf17685a27',
      },
    },
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 4286263,
    },
    portal: {
      [sourceId]: {
        address: '0xbEb5Fc579115071764c7423A4f12eDde41f106Ed',
      },
    },
    l1StandardBridge: {
      [sourceId]: {
        address: '0x99C9fc46f92E8a1c0deC1b1747d010903E884bE1',
      },
    },
  },
  sourceId,
})

// Dogechain
export const dogechain = /*#__PURE__*/ defineChain({
  id: 2000,
  name: 'Dogechain',
  nativeCurrency: {
    decimals: 18,
    name: 'DOGE',
    symbol: 'DOGE',
  },
  rpcUrls: {
    default: { http: ['https://rpc01.dogechain.dog'] },
  },
  blockExplorers: {
    default: {
      name: 'Dogechain Explorer',
      url: 'https://explorer.dogechain.dog',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 344484,
    },
  },
})

// Export chains
export const chains = {
  avalanche,
  arbitrum,
  bsc,
  base,
  polygon,
  zksync,
  nexilix,
  gnosis,
  classic,
  mainnet,
  dogechain,
  Optimism,
}
