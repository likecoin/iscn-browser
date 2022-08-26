const { NODE_ENV } = process.env
export const IPFS_GATEWAY = 'https://cloudflare-ipfs.com'
export const ARWEAVE_GATEWAY = 'https://arweave.net'
export const isDev = NODE_ENV === 'development'
export const BASE_PATH = '/iscn-browser'
export const INDEXER = isDev
  ? 'https://node.testnet.like.co'
  : 'https://mainnet-node.like.co'
export const WALLET_CONFIG = isDev
  ? {
      chainId: 'likecoin-public-testnet-5',
      chainName: 'LikeCoin',
      rpcURL: 'https://node.testnet.like.co/rpc/',
      restURL: 'https://node.testnet.like.co',
      coinType: 118,
      coinDenom: 'EKIL',
      coinMinimalDenom: 'nanoekil',
      coinDecimals: 9,
      bech32PrefixAccAddr: 'like',
      bech32PrefixAccPub: 'likepub',
      bech32PrefixValAddr: 'likevaloper',
      bech32PrefixValPub: 'likevaloperpub',
      bech32PrefixConsAddr: 'likevalcons',
      bech32PrefixConsPub: 'likevalconspub',
    }
  : {
      chainId: 'likecoin-mainnet-2',
      chainName: 'LikeCoin',
      rpcURL: 'https://mainnet-node.like.co/rpc/',
      restURL: 'https://mainnet-node.like.co',
      coinType: 118,
      coinDenom: 'LIKE',
      coinMinimalDenom: 'nanolike',
      coinDecimals: 9,
      bech32PrefixAccAddr: 'like',
      bech32PrefixAccPub: 'likepub',
      bech32PrefixValAddr: 'likevaloper',
      bech32PrefixValPub: 'likevaloperpub',
      bech32PrefixConsAddr: 'likevalcons',
      bech32PrefixConsPub: 'likevalconspub',
    }
