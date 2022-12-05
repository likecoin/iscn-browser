<template>
  <NuxtLink :to="`/owner/${encodeURIComponent(wallet)}`">
    {{ likerId || wallet }}
  </NuxtLink>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'UserLink',
  props: {
    wallet: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters('userInfo', ['getLikerIdByAddress']),
    likerId () {
      return this.getLikerIdByAddress(this.wallet)
    },
  },
  mounted () {
    this.fetchLikerIdByAddress(this.wallet)
  },
  methods: {
    ...mapActions('userInfo', ['fetchLikerIdByAddress']),
  },
}
</script>
