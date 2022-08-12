<template>
  <p v-if="$fetchState.pending">Loading...</p>
  <p v-else-if="$fetchState.error">An error occurs :(</p>
  <div v-else id="detail">
    <h1>Edit {{ iscnId }}</h1>
    <p>
      Owner:
      <NuxtLink :to="`/owner/${encodeURIComponent(owner)}`">
        {{ owner }}
      </NuxtLink>
    </p>
    <h2>ContentMetadata</h2>
    <h3>Description:</h3>
    <textarea v-model="contentMetadata.description" cols="150" rows="20"></textarea>

    <p>
      <label>URL: 
      <input v-model="contentMetadata.url" type="text" size="150">
      </label>
    </p>

    <p>
      <label>Type: 
      <input v-model="contentMetadata['@type']" type="text" size="10">
      </label>
    </p>

    <p>
      <label>Keywords: 
      <input v-model="contentMetadata.keywords" type="text" size="100">
      </label>
    </p>

    <h2>Stakeholders</h2>
    <div>
      <div v-for="(holder, i) in stakeholders" :key="i" class="stakehodlers">
        <p>
          <label>Id: 
          <input v-model="holder.entity['@id']" type="text" size="50">
          </label>
        </p>
        <p>
          <label>Name: 
          <input v-model="holder.entity.name" type="text" size="20">
          </label>
        </p>
        <p>
          <label>Contribution Type: 
          <input v-model="holder.contributionType" type="text" size="20">
          </label>
        </p>
        <p>
          <label>Reward Proportion: 
          <input v-model="holder.rewardProportion" type="number">
          </label>
        </p>
      </div>
    </div>

    <h2>ContentFingerprints</h2>
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

    <h2>Output JSON</h2>
    <pre><code>{{ toJSON() }}</code></pre>
  </div>
</template>

<script>
export default {
  name: 'EditISCN',
  data: () => ({
    iscnId: '',
    contentMetadata: {},
    stakeholders: {},
    contentFingerprints: {},
    recordNote: "",
    record: {},
  }),

  async fetch() {
    this.iscnId = this.$route.params.id
    const res = await this.$axios.$get(`/iscn/records?iscn_id=${this.iscnId}`)
    const record = res.records[0].data;
    Object.assign(this, record)
    console.log(record);
  },

  methods: {
    toJSON() {
      const {
        contentMetadata, contentFingerprints, stakeholders, recordNote
      } = this;
      return JSON.stringify({
        contentMetadata, contentFingerprints, stakeholders, recordNote
      }, null, '\t')
    },
    fingerprintLink(fingerprint) {
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
  },
}
</script>
