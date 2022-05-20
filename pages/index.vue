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
  name: 'IndexPage',
  data() {
    return {
      url: '/iscn/records?',
    }
  },
}
</script>
