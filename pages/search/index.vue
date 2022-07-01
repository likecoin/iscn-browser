<template>
  <div>
    <h3>Search: {{ q }}</h3>
    <ISCNList :url="url" />
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    const q = this.$route.query.q
    return {
      q,
      url: `/iscn/records?q=${q}`,
    }
  },
}
</script>
