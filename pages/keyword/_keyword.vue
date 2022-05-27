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
  name: 'KeywordList',
  data() {
    const keyword = this.$route.params.keyword
    return {
      url: `/iscn/records?keywords=${keyword}`,
    }
  },
}
</script>
