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
  name: 'FingerprintList',
  data() {
    const fingerprint = this.$route.params.fingerprint
    return {
      url: `/iscn/records?fingerprint=${fingerprint}`,
    }
  },
}
</script>
