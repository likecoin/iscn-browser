<template>
  <p v-if="$fetchState.pending">Loading...</p>
  <p v-else-if="$fetchState.error">An error occurs :(</p>
  <div v-else>
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
      <div v-for="(holder, i) in stakeholders" :key="i" class="stakeholder">
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
        <button @click="deleteStakeholer(i)">Delete</button>
      </div>
      <button @click="newStakeholer">New Stakeholder</button>
    </div>

    <h2>ContentFingerprints</h2>
    <div>
      <div v-for="(fingerprint, i) in contentFingerprints" :key="i" class="fingerprint" >
        <p> <input v-model="contentFingerprints[i]" type="text" size="50"> </p>
        <button @click="deleteFingerprint(i)">Delete</button>
      </div>
      <button @click="newFingerprint">New Fingerprint</button>
    </div>

    <h2>Record Note</h2>
    <p>
      <input v-model="recordNote" type="text" size="20">
    </p>

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
        contentMetadata, stakeholders, contentFingerprints, recordNote
      } = this;
      return JSON.stringify({
        contentMetadata, stakeholders, contentFingerprints, recordNote
      }, null, '\t')
    },
    deleteStakeholer(i) {
      this.stakeholders = this.stakeholders.filter((_, j) => j !== i);
    },
    newStakeholer() {
      this.stakeholders.push({ entity: {} });
    },
    deleteFingerprint(i) {
      this.contentFingerprints = this.contentFingerprints.filter((_, j) => j !== i);
    },
    newFingerprint() {
      this.contentFingerprints.push("");
    },
  },
}
</script>

<style>
.stakeholder {
  padding-left: 10px;
  margin: 5px;
  border-style: solid;
}

.fingerprint {
  padding-left: 10px;
  margin: 5px;
  border-style: solid;
}
</style>
