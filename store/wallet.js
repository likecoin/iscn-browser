import {
  assertIsDeliverTxSuccess,
  SigningStargateClient,
} from '@cosmjs/stargate'

import { LikeCoinWalletConnector, LikeCoinWalletConnectorMethod } from '@likecoin/wallet-connector'
import { ISCNSigningClient } from '@likecoin/iscn-js'
import { WALLET_CONFIG } from '../config'

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

export const getters = {
  formattedWalletAddress (state) {
    return (
      state.walletAddress.split('1')[0] + '…' + state.walletAddress.slice(-4)
    )
  },

  txURL (state) {
    return state.connector
      ? `${state.connector.restURL}/cosmos/tx/v1beta1/txs/${state.txHash}`
      : ''
  },
}

export const mutations = {
  setWallet (state, wallet) {
    const { accounts: [account], offlineSigner } = wallet
    state.offlineSigner = offlineSigner
    state.walletAddress = account.bech32Address || account.address
  },

  logout (state) {
    connector.disconnect()
    state.walletAddress = ''
  },

  prepareTx (state) {
    state.error = false
    state.txHash = ''
    state.isSending = true
  },

  doneTx (state, result) {
    state.isSending = false

    if (result.code === 0) {
      state.txHash = result.code
    } else {
      state.error = result.rawLog
    }
  }
}

export const actions = {
  init ({ commit }) {
    connector = new LikeCoinWalletConnector({
      availableMethods: [
        LikeCoinWalletConnectorMethod.Keplr,
        LikeCoinWalletConnectorMethod.KeplrMobile,
        LikeCoinWalletConnectorMethod.LikerId,
        LikeCoinWalletConnectorMethod.Cosmostation,
      ],
      ...WALLET_CONFIG,
    })
    const session = connector.restoreSession()
    console.log(session)
    if (session?.accounts) {
      commit('setWallet', session)
    }
    console.log(state)
  },

  async connect ({ commit }) {
    const wallet = await connector.openConnectWalletModal()
    if (!wallet) { return }
    commit('setWallet', wallet)
  },

  async updateISCN ({ state, commit }, { iscnId, payload }) {
    console.log(iscnId, payload)
    await connector.initIfNecessary()
    commit('prepareTx')
    const client = new ISCNSigningClient()
    console.log(state.offlineSigner)
    await client.connectWithSigner(
      connector.rpcURL,
      state.offlineSigner,
    )

    const result = await client.updateISCNRecord(
      state.walletAddress,
      iscnId,
      payload,
    )
    console.log(result)
    commit('doneTx', result)
  },
}
