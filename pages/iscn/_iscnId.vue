<template>
  <!-- <div id="detail">loading...</div> -->
  <div id="detail">
    <h1>{{ record.name }}</h1>
    <p data-bind="recordTimestamp"></p>
    <p data-bind="description|descrption"></p>
    <p>
      ISCN: {{ record.iscn }}
      <a
        target="_blank"
        :href="`https://app.like.co/view/${encodeURIComponent(record.iscn)}`"
      >
        Open on app.like.co
      </a>
    </p>

    <p>{{ record.description }}</p>

    <p>
      <a target="_blank" :href="record.url">{{ record.url }}</a>
    </p>

    <p>Type: {{ record.type }}</p>

    <p>
      Owned by:
      <NuxtLink :to="`/owner/${encodeURIComponent(record.owner)}`">
        {{ record.owner }}
      </NuxtLink>
    </p>

    <div v-if="record.keywords.length == 0">
      <h3>Keywords:</h3>
      <ul>
        <li v-for="keyword in record.keywords" :key="keyword">
          <NuxtLink :to="`/keywords/${encodeURIComponent(keyword)}`">
            {{ keyword }}
          </NuxtLink>
        </li>
      </ul>
    </div>
    <p v-else>Keywords: There is no keywords</p>

    <p>Content Fingerprints:</p>
    <ul data-bind="contentFingerprints" data-attr="list">
      <li v-for="fingerprint in record.contentFingerprints" :key="fingerprint">
        <NuxtLink :to="`/fingerprints/${encodeURIComponent(fingerprint)}`">
          {{ fingerprint }}
        </NuxtLink>
      </li>
    </ul>

    <p>Stakeholders:</p>
    <ul data-bind="stakeholders" data-attr="list">
      <li v-for="holder in record.stakeholders" :key="holder.entity.name">
        <NuxtLink
          :to="`/stakeholders/${encodeURIComponent(holder.entity.name)}`"
        >
          {{ holder.entity.name }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ISCNRecord',
  data: () => ({
    record: {
      name: 'The Title Here',
      iscn: 'iscn://1234617892361',
      url: 'http://example.com',
      type: 'Article',
      owner: 'like1jcapowiejpoicmapwoeijfp',
      keywords: ['test', 'example', 'likecoin'],
    },
  }),

  async fetch() {
    const iscnId = this.$route.params.iscnId
    const res = await this.$axios.$get(`/iscn/records?iscn_id=${iscnId}`)
    const record = res.records[0]
    const {
      owner,
      contentMetadata,
      contentFingerprints,
      recordTimestamp,
      stakeholders,
    } = record.data
    const { name, url, description, keywords } = contentMetadata

    const keywordList = keywords.split(',')
    this.record = {
      name,
      url,
      description,
      type: contentMetadata['@type'],
      owner,
      recordTimestamp,
      iscn: iscnId,
      keywords: keywordList,
      contentFingerprints,
      stakeholders,
    }
  },
}
</script>
