<template>
  <p v-if="$fetchState.pending">
    Loading...
  </p>
  <p v-else-if="$fetchState.error">
    An error occurs :(
  </p>
  <p v-else-if="!walletAddress">
    <strong>Connect wallet to continue</strong>
  </p>
  <p v-else-if="walletAddress !== owner">
    <strong>You are not the owner of this ISCN</strong>
  </p>
  <div v-else>
    <p>{{ iscnId }}</p>
    <p>Owner: {{ owner }}</p>
    <p>{{ contentMetadata.name }}</p>
    <label>Transfer to:
      <input v-model="receiver" type="text" size="40">
      <p v-if="receiver && !validateAddress" class="error">Invalid receiver address</p>
      <br v-else>
    </label>
    <button class="button" :disabled="!validateAddress" @click="transfer">
      Transfer
    </button>
    <p v-if="isSending">
      Sending...
    </p>
    <p v-else>
      <a :href="`${INDEXER}/txs/${txHash}`">
        {{ txHash }}
      </a>
    </p>
    <p v-if="error" class="error">
      {{ error }}
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { validateAddress } from '@/utils/utils'
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

  async fetch () {
    this.iscnId = this.$route.params.id
    const res = await this.$axios.$get(`/iscn/records?iscn_id=${this.iscnId}`)
    const record = res.records[0].data
    Object.assign(this, record)
    this.contentMetadata.keywords = record.contentMetadata.keywords.split(',').filter(k => k !== '')
  },

  computed: {
    ...mapState('wallet', {
      walletAddress: state => state.walletAddress,
      txHash: state => state.txHash,
      isSending: state => state.isSending,
      error: state => state.error,
    }),
    validateAddress () {
      return validateAddress(this.receiver)
    },
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
