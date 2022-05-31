<template>
  <ISCNList :url="url" />
</template>

<script>
export default {
  name: 'KeywordList',
  data() {
    const keyword = this.$route.params.keyword
    return {
      url: `/iscn/records?keywords=${keyword}`,
    }
  },
}
</script>
