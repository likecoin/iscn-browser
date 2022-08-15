<template>
  <div>
    <div v-if="walletAddress">
      <p>{{ walletAddress }}</p>
      <button @click="logout">
        Disconnect
      </button>
    </div>
    <button v-else @click="connect">
      Connect
    </button>
  </div>
</template>

<script>
export default {
  name: 'WalletConnector',
  computed: {
    walletAddress () {
      return this.$store.wallet.walletAddress
    }
  }
}
</script>
