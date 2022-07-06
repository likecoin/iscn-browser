<template>
  <div>
    <h3>Fingerprint: {{ fingerprint }}</h3>
    <ISCNList :url="url" />
  </div>
</template>

<script>
export default {
  name: 'FingerprintList',
  data() {
    const fingerprint = this.$route.params.fingerprint
    return {
      fingerprint,
      url: `/iscn/records?fingerprint=${encodeURIComponent(fingerprint)}`,
    }
  },
}
</script>
