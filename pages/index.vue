<template>
  <div>
    <header></header>
    <div class="container">
      <div><a class="gradient-text" href="/">ISCN Browser</a></div>
      <div class="tags">
        <h3>Featured Tags</h3>
        <ul data-bind="tags" data-attr="list">
          <li v-for="tag in tags" :key="tag">
            <a :href="`/tags/${tag}`">{{ tag }}</a>
          </li>
        </ul>
      </div>
      <div id="block-list">
        <a
          v-for="record in records"
          :key="record.iscn"
          :href="`/iscn/${record.iscn}`"
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
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  css: ['@/assets/css/index.css'],
  data: () => ({
    tags: ['LikeCoin', 'DHK', 'Cosmos'],
    records: [
      {
        iscn: 'iscn://1234566780',
        name: 'First ISCN Record',
        timestamp: '2022-05-02 21:26:00',
      },
      {
        iscn: 'iscn://234456174312934',
        name: 'Second ISCN Record',
        timestamp: '2022-05-02 21:26:00',
      },
      {
        iscn: 'iscn://234456174312934',
        name: 'Second ISCN Record',
        timestamp: '2022-05-02 21:26:00',
      },
      {
        iscn: 'iscn://234456174312934',
        name: 'Second ISCN Record',
        timestamp: '2022-05-02 21:26:00',
      },
    ],
  }),

  // async fetch() {
  //   const records = await this.$http.$get(
  //     `https://mainnet-node.like.co/iscn/records?limit=12`
  //   )
  // },
}
</script>
