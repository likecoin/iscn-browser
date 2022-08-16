<template>
  <p v-if="$fetchState.pending">
    Loading...
  </p>
  <p v-else-if="$fetchState.error">
    An error occurs :(
  </p>
  <div v-else>
    <h1>Edit {{ iscnId }}</h1>
    <p v-if="owner !== walletAddress">
      <strong>Alarm: You are not the owner of this record</strong>
    </p>
    <p>
      Owner:
      <NuxtLink :to="`/owner/${encodeURIComponent(owner)}`">
        {{ owner }}
      </NuxtLink>
    </p>
    <h2>ContentMetadata</h2>
    <div>
      <p>
        <label>name:
          <input v-model="contentMetadata.name" type="text" size="50">
        </label>
      </p>

      <p>
        <label>url:
          <input v-model="contentMetadata.url" type="text" size="150">
        </label>
      </p>

      <p>
        <label>type:
          <input v-model="contentMetadata['@type']" type="text" size="10">
        </label>
      </p>

      <p>
        <label>version:
          <input v-model="contentMetadata.version" type="number">
        </label>
      </p>

      <p>description:</p>
      <textarea v-model="contentMetadata.description" cols="150" rows="20" />

      <p>
        <label>usage info:
          <input v-model="contentMetadata.usageInfo" type="text" size="30">
        </label>
      </p>

      <p>keywords</p>
      <div>
        <div v-for="(keyword, i) in contentMetadata.keywords" :key="i" class="keyword">
          <p>
            <input v-model="contentMetadata.keywords[i]" type="text" size="50">
            <button @click="deleteKeyword(i)">
              Delete
            </button>
          </p>
        </div>
        <button @click="newKeyword">
          New Keyword
        </button>
      </div>

      <p
        v-for="[key] in Object.entries(contentMetadata).filter(
          ([k]) => !(defaultFields.includes(k) || excludeFields.includes(k)))"
        :key="key"
      >
        <label>{{ key }}:
          <input v-model="contentMetadata[key]" type="text" size="100">
          <button @click="deleteField(key)">Delete</button>
        </label>
      </p>
      <input v-model="newField" type="text">
      <button @click="addField">
        Add field
      </button>
    </div>

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
        <button @click="deleteStakeholer(i)">
          Delete
        </button>
      </div>
      <button @click="newStakeholer">
        New Stakeholder
      </button>
    </div>

    <h2>ContentFingerprints</h2>
    <div>
      <div v-for="(fingerprint, i) in contentFingerprints" :key="i" class="fingerprint">
        <p> <input v-model="contentFingerprints[i]" type="text" size="50"> </p>
        <button @click="deleteFingerprint(i)">
          Delete
        </button>
      </div>
      <button @click="newFingerprint">
        New Fingerprint
      </button>
    </div>

    <h2>Record Notes</h2>
    <p>
      <input v-model="recordNotes" type="text" size="20">
    </p>

    <button :disabled="owner !== walletAddress" @click="updateISCN">
      Update
    </button>
    <p v-if="owner !== walletAddress">
      <strong>Alarm: You are not the owner of this record</strong>
    </p>
    <p v-if="isSending">
      Sending...
    </p>
    <p v-else>
      <a :href="`${INDEXER}/txs/${txHash}`">
        {{ txHash }}
      </a>
    </p>
    <p v-if="error">
      {{ error }}
    </p>

    <h2>Output JSON</h2>
    <pre><code>{{ toJSON() }}</code></pre>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { INDEXER } from '@/config'

export default {
  name: 'EditISCN',
  data: () => ({
    INDEXER,
    iscnId: '',
    owner: '',
    contentMetadata: {},
    stakeholders: {},
    contentFingerprints: {},
    recordNotes: '',
    defaultFields: ['@type', 'description', 'url', 'name', 'keywords', 'version', 'usageInfo'],
    excludeFields: ['@context'],
    newField: '',
  }),

  async fetch () {
    this.iscnId = this.$route.params.id
    const res = await this.$axios.$get(`/iscn/records?iscn_id=${this.iscnId}`)
    // this.owner = res.owner
    const record = res.records[0].data
    Object.assign(this, record)
    this.contentMetadata.keywords = record.contentMetadata.keywords.split(',').filter(k => k !== '')
    console.log(this)
  },

  computed: {
    ...mapState('wallet', {
      walletAddress: state => state.walletAddress,
      txHash: state => state.txHash,
      isSending: state => state.isSending,
      error: state => state.error,
    }),
  },

  methods: {
    toJSON () {
      const {
        contentMetadata, stakeholders, contentFingerprints, recordNotes,
      } = this
      return JSON.stringify({
        contentMetadata: {
          ...contentMetadata,
          keywords: contentMetadata.keywords.join(','),
        },
        stakeholders,
        contentFingerprints,
        recordNotes,
      }, null, '\t')
    },
    deleteStakeholer (i) {
      this.stakeholders = this.stakeholders.filter((_, j) => j !== i)
    },
    newStakeholer () {
      this.stakeholders.push({ entity: {} })
    },
    deleteFingerprint (i) {
      this.contentFingerprints = this.contentFingerprints.filter((_, j) => j !== i)
    },
    newFingerprint () {
      this.contentFingerprints.push('')
    },
    deleteKeyword (i) {
      this.contentMetadata.keywords = this.contentMetadata.keywords.filter((_, j) => j !== i)
    },
    newKeyword () {
      this.contentMetadata.keywords.push('')
    },
    addField () {
      this.contentMetadata[this.newField] = ''
      this.newField = ''
    },
    deleteField (key) {
      delete this.contentMetadata[key]
      this.$forceUpdate()
    },
    updateISCN () {
      const {
        stakeholders, contentFingerprints, recordNotes,
      } = this
      this.$store.dispatch('wallet/updateISCN', {
        iscnId: this.iscnId,
        payload: {
          stakeholders,
          contentFingerprints,
          recordNotes,
          ...this.contentMetadata
        }
      })
    }
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
