import {
  assertIsDeliverTxSuccess,
  SigningStargateClient,
} from '@cosmjs/stargate'

import { LikeCoinWalletConnector, LikeCoinWalletConnectorMethod } from '@likecoin/wallet-connector'

let connector = null

export const state = () => ({
  connector: null,
  offlineSigner: null,
  walletAddress: '',
  isSending: false,
  isShowAlert: false,
  txHash: '',
  error: '',
})

// export const getters = {
//   formattedWalletAddress (state) {
//     return (
//       state.walletAddress.split('1')[0] + '…' + state.walletAddress.slice(-4)
//     )
//   },
//   txURL (state) {
//     return state.connector
//       ? `${state.connector.restURL}/cosmos/tx/v1beta1/txs/${state.txHash}`
//       : ''
//   },
// }

export const mutations = {
  init (state) {
    connector = new LikeCoinWalletConnector({
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
      availableMethods: [
        LikeCoinWalletConnectorMethod.Keplr,
        LikeCoinWalletConnectorMethod.KeplrMobile,
        LikeCoinWalletConnectorMethod.LikerId,
        LikeCoinWalletConnectorMethod.Cosmostation,
      ],
    })
    const session = connector.restoreSession()
    if (session?.accounts) {
      const { accounts: [account] } = session
      state.walletAddress = account.bech32Address || account.address
    }
    console.log('init', connector)
  },
  setWallet (state, wallet) {
    const { accounts: [account], offlineSigner } = wallet
    state.offlineSigner = offlineSigner
    state.walletAddress = account.bech32Address || account.address
  },
  logout (state) {
    connector.disconnect()
    state.walletAddress = ''
  },
}

export const actions = {
  async connect ({ commit }) {
    console.log('connect', connector)
    const wallet = await connector.openConnectWalletModal()
    console.log('wallet', wallet)
    if (!wallet) { return }
    commit('setWallet', wallet)
  },
  async send (state) {
    await state.connector.initIfNecessary()
    state.error = false
    state.txHash = ''
    state.isSending = true
    const client = await SigningStargateClient.connectWithSigner(
      state.connector.rpcURL,
      state.offlineSigner,
    )

    const denom = state.connector.coinMinimalDenom
    const amount = [
      {
        amount: `${state.amount * Math.pow(10, state.connector.coinDecimals)}`,
        denom,
      },
    ]
    const fee = {
      amount: [
        {
          amount: '5000',
          denom,
        },
      ],
      gas: '200000',
    }
    const result = await client.sendTokens(
      state.walletAddress,
      state.toAddress,
      amount,
      fee,
      '',
    )
    assertIsDeliverTxSuccess(result)
    state.isSending = false

    if (result.code === 0) {
      state.txHash = result.code
    } else {
      state.error = result.rawLog
    }
  },
}
