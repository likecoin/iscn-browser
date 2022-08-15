<template>
  <div>
    <TagList />
    <ISCNList :url="url" />
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      url: '/iscn/records?',
    }
  },
}
</script>
