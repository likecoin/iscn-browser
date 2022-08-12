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
      <p v-else>None</p>
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
    // this.contentMetadata = record.contentMetadata
    // this.stakeholders = record.stakeholders
    // this.contentFingerprints = record.contentFingerprints 
    // this.recordNote = record.recordNote
    console.log(record);
  },

  methods: {
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
