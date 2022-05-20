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
  css: ['@/assets/css/index.css'],
  data() {
    return {
      url: '/iscn/records',
    }
  },
}
</script>
