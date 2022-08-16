<template>
  <p v-if="$fetchState.pending">
    Loading...
  </p>
  <p v-else-if="$fetchState.error">
    An error occurs :(
  </p>
  <div v-else>
    <p v-if="!walletAddress">
      <strong>Connect wallet to continue</strong>
    </p>
    <p v-else-if="walletAddress !== owner">
      <strong>Warning: You are not the owner of this ISCN</strong>
    </p>
    <p>{{ iscnId }}</p>
    <p>Owner: {{ owner }}</p>
    <p>{{ contentMetadata.name }}</p>
    <label>Transfer to:
      <input v-model="receiver" type="text" size="40">
    </label>
    <button :disabled="owner !== walletAddress" @click="transfer">
      Transfer
    </button>
    <p v-if="owner !== walletAddress">
      <strong>Warning: You are not the owner of this ISCN</strong>
    </p>
    <p v-if="isSending">
      Sending...
    </p>
    <p v-else>
      <a :href="`${INDEXER}/txs/${txHash}`">
        {{ txHash }}
      </a>
    </p>
    <p v-if="error">
      {{ error }}
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { INDEXER } from '@/config'

export default {
  name: 'EditISCN',
  data: () => ({
    iscnId: '',
    owner: '',
    contentMetadata: {},
    receiver: '',
    INDEXER,
  }),

  computed: {
    ...mapState('wallet', {
      walletAddress: state => state.walletAddress,
      txHash: state => state.txHash,
      isSending: state => state.isSending,
      error: state => state.error,
    }),
  },

  async fetch () {
    this.iscnId = this.$route.params.id
    const res = await this.$axios.$get(`/iscn/records?iscn_id=${this.iscnId}`)
    const record = res.records[0].data
    Object.assign(this, record)
    this.contentMetadata.keywords = record.contentMetadata.keywords.split(',').filter(k => k !== '')
  },

  methods: {
    transfer () {
      this.$store.dispatch('wallet/transfer', {
        iscnId: this.iscnId,
        receiver: this.receiver,
      })
    },
  },
}
</script>
