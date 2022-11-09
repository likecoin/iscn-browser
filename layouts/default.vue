<template>
  <div>
    <MainHeader />
    <main>
      <Nuxt />
    </main>
  </div>
</template>
<script>
export default {
  name: 'DefaultLayout',
}
</script>
<style scoped>
main {
  margin: 20px;
}
</style>
