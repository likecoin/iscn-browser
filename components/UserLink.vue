<template>
  <NuxtLink :to="`/owner/${encodeURIComponent(wallet)}`">
    {{ likerId || wallet }}
  </NuxtLink>
</template>

<script>
export default {
  name: 'UserLink',
  props: {
    wallet: {
      type: String,
      required: true,
    },
  },
  computed: {
    likerId () {
      return this.$store.getters['userInfo/getLikerIdByAddress'](this.wallet)
    },
  },
  mounted () {
    this.$store.dispatch('userInfo/fetchLikerIdByAddress', this.wallet)
  },
}
</script>
