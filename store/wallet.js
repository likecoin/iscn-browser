import { LikeCoinWalletConnector, LikeCoinWalletConnectorMethod } from '@likecoin/wallet-connector'
import { ISCNSigningClient } from '@likecoin/iscn-js'
import { WALLET_CONFIG } from '../config'

let connector = null

export const state = () => ({
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
      state.txHash = result.transactionHash
    } else {
      state.error = result.rawLog
    }
  },

  setError (state, error) {
    state.error = error
    state.isSending = false
  },
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
    if (session?.accounts) {
      commit('setWallet', session)
    }
  },

  async connect ({ commit }) {
    const wallet = await connector.openConnectWalletModal()
    if (!wallet) { return }
    commit('setWallet', wallet)
  },

  async updateISCN ({ state, commit, dispatch }, { iscnId, payload }) {
    if (!connector) {
      dispatch('init')
    }
    commit('setWallet', await connector.initIfNecessary())
    commit('prepareTx')
    const client = new ISCNSigningClient()
    await client.connectWithSigner(
      connector.rpcURL,
      state.offlineSigner,
    )

    try {
      const result = await client.updateISCNRecord(
        state.walletAddress,
        iscnId,
        payload,
      )
      commit('doneTx', result)
    } catch (err) {
      commit('setError', err)
      // eslint-disable-next-line no-console
      console.error(err)
    }
  },

  async transfer ({ state, commit, dispatch }, { iscnId, receiver }) {
    if (!connector) {
      dispatch('init')
    }

    commit('setWallet', await connector.initIfNecessary())
    commit('prepareTx')
    const client = new ISCNSigningClient()
    await client.connectWithSigner(
      connector.rpcURL,
      state.offlineSigner,
    )

    try {
      const result = await client.changeISCNOwnership(
        state.walletAddress,
        receiver,
        iscnId,
      )
      commit('doneTx', result)
    } catch (err) {
      commit('setError', err)
      // eslint-disable-next-line no-console
      console.error(err)
    }
  },
}
