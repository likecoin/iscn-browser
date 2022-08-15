<template>
  <!-- <div id="detail">loading...</div> -->
  <p v-if="$fetchState.pending">
    Loading...
  </p>
  <p v-else-if="$fetchState.error">
    An error occurs :(
  </p>
  <div v-else id="detail">
    <h1>{{ record.name }}</h1>
    <p data-bind="recordTimestamp" />
    <p data-bind="description|descrption" />
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

    <div v-if="record.keywords && record.keywords.length != 0">
      <h3>Keywords:</h3>
      <ul>
        <li v-for="keyword in record.keywords" :key="keyword">
          <NuxtLink :to="`/keyword/${encodeURIComponent(keyword)}`">
            {{ keyword }}
          </NuxtLink>
        </li>
      </ul>
    </div>
    <p v-else>
      Keywords: There is no keywords
    </p>

    <div class="fingerprint">
      <p>Content Fingerprints:</p>
      <ul
        v-if="record.contentFingerprints && record.contentFingerprints.length != 1"
        data-bind="contentFingerprints"
        data-attr="list"
      >
        <li
          v-for="fingerprint in record.contentFingerprints"
          :key="fingerprint"
        >
          <a :href="fingerprintLink(fingerprint)" target="blank">
            {{ fingerprint }}
          </a>
        </li>
      </ul>
    </div>

    <div class="stakehodlers">
      <h3>Stakeholders:</h3>
      <ul
        v-if="
          record.stakeholders !== undefined && record.stakeholders.length != 0
        "
        data-bind="stakeholders"
        data-attr="list"
      >
        <li v-for="holder in record.stakeholders" :key="holder.entity.name">
          <NuxtLink
            :to="`/stakeholder/${encodeURIComponent(holder.entity.name)}`"
          >
            {{ holder.entity.name }}
          </NuxtLink>
        </li>
      </ul>
      <p v-else>
        None
      </p>
    </div>
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
      keywords: ['test', 'example', 'likecoin']
    },
  }),

  async fetch () {
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

    const keywordList = keywords
      .split(',')
      .map(k => k.trim())
      .filter(k => k !== '')
    console.log(keywordList)
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
  methods: {
    fingerprintLink (fingerprint) {
      const [schema, value] = fingerprint.split('://')
      switch (schema) {
        case 'ipfs':
          return `https://infura-ipfs.io/ipfs/${value}`

        case 'ar':
          return `https://arweave.net/${value}`

        default:
          return `/fingerprint/${encodeURIComponent(fingerprint)}`
      }
    },
  }
}
</script>
