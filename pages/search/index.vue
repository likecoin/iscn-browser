<template>
  <ISCNList :url="url" />
</template>

<script>
export default {
  name: 'Search',
  data() {
    const q = this.$route.query.q
    return {
      url: `/iscn/records/search?q=${q}`,
    }
  },
}
</script>
