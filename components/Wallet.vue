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
    connectWallet () {
      this.$store.dispatch('wallet/connect')
    },
    init () {
      this.$store.dispatch('wallet/init')
    },
    ...mapMutations({
      logout: 'wallet/logout',
    })
  },
}
</script>
