<template>
  <ISCNList :url="url" />
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
