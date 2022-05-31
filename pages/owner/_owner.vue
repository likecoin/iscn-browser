<template>
  <ISCNList :url="url" />
</template>

<script>
export default {
  name: 'OwnerList',
  data() {
    const owner = this.$route.params.owner
    return {
      url: `/iscn/records?owner=${owner}`,
    }
  },
}
</script>
