import Vue from 'vue'
import { validateAddress } from '../utils/utils'
import { API_PUBLIC_URL } from '../config.js'

export const state = () => ({
  likerIdByAddressMap: {},
})

export const getters = {
  getLikerIdByAddress: state => address => state.likerIdByAddressMap[address],
}

export const mutations = {
  setLikerIdByAddress (state, { address, likerId }) {
    Vue.set(state.likerIdByAddressMap, address, likerId)
  },
  deleteLikerIdByAddress (state, address) {
    Vue.delete(state.likerIdByAddressMap, address)
  },
}

export const actions = {
  async fetchLikerIdByAddress ({ commit, state }, address) {
    try {
      if (!validateAddress(address) || state.likerIdByAddressMap[address] !== undefined) { return }
      // set the key to prevent duplicate requests
      commit('setLikerIdByAddress', { address, likerId: null })
      const { data } = await this.$axios.get(`${API_PUBLIC_URL}/users/addr/${address}/min`)
      const likerId = data.user
      commit('setLikerIdByAddress', { address, likerId })
    } catch (error) {
      if (error.response?.status !== 404) {
        // remove the key to unblock future requests
        commit('deleteLikerIdByAddress', address)
      }
    }
  }
}
