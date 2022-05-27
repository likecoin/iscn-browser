<template>
  <p v-if="$fetchState.pending">Loading...</p>
  <p v-else-if="$fetchState.error">An error occurs...</p>
  <div v-else class="main">
    <Paginate
      :page-count="pageCount"
      :container-class="'pagination'"
      :page-class="'page-item'"
      :click-handler="(pageNum) => (page = pageNum)"
      v-model="page"
    ></Paginate>
    <div id="block-list">
      <NuxtLink
        v-for="record in records.slice((page - 1) * limit, page * limit)"
        :key="record.iscn"
        :to="`/iscn/${record.iscn}`"
        class="block-item"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.5 1.44338C7.8094 1.26474 8.1906 1.26474 8.5 1.44338L13.4282 4.28868C13.7376 4.46731 13.9282 4.79744 13.9282 5.1547V10.8453C13.9282 11.2026 13.7376 11.5327 13.4282 11.7113L8.5 14.5566C8.1906 14.7353 7.8094 14.7353 7.5 14.5566L2.5718 11.7113C2.2624 11.5327 2.0718 11.2026 2.0718 10.8453V5.1547C2.0718 4.79743 2.2624 4.46731 2.5718 4.28868L7.5 1.44338Z"
            stroke="#50E3C2"
            stroke-width="2"
          />
        </svg>
        <h2>
          {{ record.name }}
        </h2>
        <div>
          <div class="time-stamp strong">Publish date</div>
          <p class="time-stamp">{{ record.timestamp }}</p>
        </div>
      </NuxtLink>
    </div>
    <Paginate
      :page-count="pageCount"
      :container-class="'pagination'"
      :page-class="'page-item'"
      :click-handler="(pageNum) => (page = pageNum)"
      v-model="page"
    ></Paginate>
    <p>There are {{ records.length }} results in total.</p>
  </div>
</template>

<script>
import Paginate from 'vuejs-paginate'
export default {
  props: {
    url: String,
  },
  components: {
    Paginate,
  },
  methods: {
    changePage: (pageNum) => {
      this.page = pageNum
    },
  },
  data() {
    return {
      records: [],
      page: 1,
      limit: 12,
      pageCount: 0,
      next: '',
      previous: '',
    }
  },
  async fetch() {
    const limit = 60
    const url = `${this.$props.url}&limit=${limit}`
    console.log(url)
    const res = await this.$axios.$get(url)
    this.records = res.records.map((record) => {
      const { data } = record
      const datetime = new Date(data.recordTimestamp)
      const timestamp = datetime.toLocaleString()
      const iscn = encodeURIComponent(data['@id'])
      const content = data.contentMetadata
      return { iscn, timestamp, ...content }
    })
    this.pageCount = Math.ceil(this.records.length / this.limit)
  },
}
</script>

<style>
div.main {
  align-items: center;
}
ul.pagination {
  display: inline-block;
  padding: 0;
  margin: 0;
}

ul.pagination li {
  display: inline;
}
ul.pagination li a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
}
ul.pagination li.active a {
  background-color: #28646e;
  color: white;
}
</style>
