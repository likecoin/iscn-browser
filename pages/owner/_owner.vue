<template>
  <div>
    <h3>Owner: {{ owner }}</h3>
    <ISCNList :url="url" />
  </div>
</template>

<script>
export default {
  name: 'OwnerList',
  data () {
    const owner = this.$route.params.owner
    return {
      owner,
      url: `/iscn/records?owner=${encodeURIComponent(owner)}`,
    }
  },
}
</script>
