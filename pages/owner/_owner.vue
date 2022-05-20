<template>
  <div>
    <MainHeader />
    <div>
      <TagList />
      <ISCNList :url="url" />
    </div>
  </div>
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
