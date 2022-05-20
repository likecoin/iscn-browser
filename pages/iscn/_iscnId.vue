<template>
  <!-- <div id="detail">loading...</div> -->
  <div id="detail">
    <h1>{{ record.name }}</h1>
    <p data-bind="recordTimestamp"></p>
    <p data-bind="description|descrption"></p>
    <p>
      ISCN: {{ record.iscn }}
      <a target="_blank" :href="`https://app.like.co/view/${record.iscn}`">
        Open on app.like.co
      </a>
    </p>

    <p>
      <a target="_blank" :href="record.url">{{ record.url }}</a>
    </p>

    <p>Type: {{ record.type }}</p>

    <p>
      Owned by:
      <a :href="`/owner/${record.owner}`">
        {{ record.owner }}
      </a>
    </p>

    <p>Keywords:</p>
    <ul>
      <li v-for="keyword in record.keywords" :key="keyword">
        <a :href="`/keywords/${keyword}`">
          {{ keyword }}
        </a>
      </li>
    </ul>

    <p>Content Fingerprints:</p>
    <ul data-bind="contentFingerprints" data-attr="list">
      <li v-for="fingerprint in record.contentFingerprints" :key="fingerprint">
        <a target="_blank" :href="`/fingerprints/${fingerprint}`">
          {{ fingerprint }}
        </a>
      </li>
    </ul>

    <p>Stakeholders:</p>
    <ul data-bind="stakeholders" data-attr="list">
      <li v-for="holder in record.stakeholders" :key="holder.entity.name">
        <a :href="`/stakeholders/${holder.entity.name}`">
          {{ holder.entity.name }}
        </a>
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
    const { keywords } = contentMetadata

    const keywordList = keywords.split(',')
    this.record = {
      ...contentMetadata,
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
