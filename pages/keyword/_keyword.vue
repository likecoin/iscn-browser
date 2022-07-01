<template>
  <div>
    <h3>Keyword: {{ keyword }}</h3>
    <ISCNList :url="url" />
  </div>
</template>

<script>
export default {
  name: 'KeywordList',
  data() {
    const keyword = this.$route.params.keyword
    return {
      keyword,
      url: `/iscn/records?keywords=${keyword}`,
    }
  },
}
</script>
