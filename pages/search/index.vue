<template>
  <div>
    <h3>Search: {{ q }}</h3>
    <ISCNList :url="url" />
  </div>
</template>

<script>
export default {
  name: 'SearchPage',
  data () {
    const q = this.$route.query.q
    return {
      q,
      url: `/iscn/records?q=${encodeURIComponent(q)}`,
    }
  },
}
</script>
