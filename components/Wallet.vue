<template>
  <div>
    <div v-if="walletAddress">
      <p>{{ walletAddress }}</p>
      <button @click="logout">
        Disconnect
      </button>
    </div>
    <button v-else @click="connectWallet">
      Connect
    </button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'WalletConnector',
  computed: {
    walletAddress () {
      return this.$store.state.wallet.walletAddress
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    connect () {
      this.$store.dispatch('wallet/connect')
    },
    ...mapMutations({
      init: 'wallet/init',
      connectWallet: 'wallet/connect',
      logout: 'wallet/logout',
    })
  },
}
</script>
