<template>
  <div class="tags">
    <h3>Featured Keywords</h3>
    <ul>
      <li v-for="keyword in keywords" :key="keyword">
        <a :href="`/keywords/${keyword}`">{{ keyword }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keywords: ['LikeCoin', 'DHK', 'Cosmos'],
    }
  },
}
</script>
