<template>
  <div>
    <header></header>
    <div class="container">
      <div><a class="gradient-text" href="/">ISCN Browser</a></div>
      <div id="tags-list">
        <h3>Featured Tags</h3>
        <ul data-bind="tags" data-attr="list"></ul>
      </div>
      <div id="block-list">Loading...</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  css: ['@/assets/css/index.css'],
}
</script>
