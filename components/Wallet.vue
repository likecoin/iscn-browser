<template>
  <div>
    <div v-if="walletAddress">
      <p>
        <NuxtLink :to="`/owner/${walletAddress}`">
          {{ walletAddress }}
        </NuxtLink>
      </p>
      <p>{{ chainId }}</p>
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
import { WALLET_CONFIG } from '../config.js'

export default {
  name: 'WalletConnector',
  data () {
    return {
      chainId: WALLET_CONFIG.chainId,
    }
  },
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
