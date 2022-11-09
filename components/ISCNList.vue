<template>
  <p v-if="$fetchState.pending">
    Loading...
  </p>
  <p v-else-if="$fetchState.error">
    Not found
  </p>
  <div v-else class="main">
    <NuxtLink :to="`?key=${key}&reverse=${reverse}`">
      Next
    </NuxtLink>
    <NuxtLink :to="`?reverse=${!reverse}`">
      Reverse
    </NuxtLink>
    <table>
      <tr>
        <th>Timestamp</th>
        <th>Name</th>
        <th>Keywords</th>
        <th>Stakeholders</th>
        <th>Owner</th>
        <th>URL</th>
        <th>Fingerprints</th>
      </tr>
      <tr v-for="record in records.filter(r => isValid(r))" :key="record.iscn">
        <td>{{ record.timestamp }}</td>
        <td>
          <a
            target="_blank"
            :href="`https://app.like.co/view/${record.iscnEncoded}`"
          >
            {{ record.contentMetadata.name }}
          </a>
        </td>
        <td>
          <NuxtLink
            v-for="keyword in record.contentMetadata.keywords"
            :key="keyword"
            :to="`/keyword/${encodeURIComponent(keyword)}`"
          >
            {{ keyword }}
          </NuxtLink>
        </td>
        <td>
          <NuxtLink
            v-for="holder in record.stakeholders.filter(s => s.entity)"
            :key="holder.entity.name"
            :to="`/stakeholder/${encodeURIComponent(holder.entity.name)}`"
          >
            {{ holder.entity.name }}
          </NuxtLink>
        </td>
        <td>
          <NuxtLink :to="`/owner/${encodeURIComponent(record.owner)}`">
            {{ record.owner }}
          </NuxtLink>
        </td>
        <td>
          <a
            v-if="record.contentMetadata.url"
            rel="noreferrer noopener"
            :href="record.contentMetadata.url"
            target="_blank"
          >
            {{ domain_from_url(record.contentMetadata.url) }}
          </a>
        </td>
        <td v-if="record.contentFingerprints">
          <a
            v-for="[schema, link, target] in record.contentFingerprints.map(fingerprintLink)"
            :key="schema"
            :href="link"
            :target="target"
          >
            {{ schema }}
          </a>
        </td>
        <td v-else />
        <td v-if="walletAddress">
          <NuxtLink
            v-if="walletAddress === record.owner"
            :to="`/edit/${encodeURIComponent(getIscnPrefix(record.iscn))}`"
          >
            Edit
          </NuxtLink>
          <br>
          <NuxtLink
            v-if="walletAddress === record.owner"
            :to="`/transfer/${encodeURIComponent(getIscnPrefix(record.iscn))}`"
          >
            Transfer
          </NuxtLink>
        </td>
      </tr>
    </table>
    <p>There are {{ records.length }} results in total.</p>
    <NuxtLink :to="`?key=${key}&reverse=${reverse}`">
      Next
    </NuxtLink>
    <NuxtLink :to="`?reverse=${!reverse}`">
      Reverse
    </NuxtLink>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { IPFS_GATEWAY, ARWEAVE_GATEWAY, INDEXER } from '../config.js'
import { getIscnPrefix } from '@/utils/utils'

function isDepub (record) {
  try {
    return record.contentMetadata.url === undefined && record.contentFingerprints.includes('https://depub.blog')
  } catch (err) {
    return false
  }
}
export default {
  props: {
    url: {
      type: String,
      default: ''
    },
  },
  data () {
    return {
      records: [],
      limit: 12,
      next: '',
      previous: '',
      last: 0,
      INDEXER,
    }
  },
  async fetch () {
    const limit = 100
    const key = this.$route.query.key || 0
    this.reverse = this.$route.query.reverse !== 'false'
    const url = `${this.$props.url}&limit=${limit}&key=${key}&reverse=${this.reverse}`
    const res = await this.$axios.$get(url)
    this.key = res.pagination.next_key
    this.records = res.records.map((record) => {
      const { data } = record
      const datetime = new Date(data.recordTimestamp)
      const timestamp = datetime.toLocaleString()
      const iscn = data['@id']
      if (isDepub(data)) {
        const depubUrl = iscn.replace(/iscn:\/\/[^/]+\//g, '')
        data.contentMetadata.url = `https://depub.space/${depubUrl}`
      }
      if (data.contentMetadata.keywords) {
        data.contentMetadata.keywords = data.contentMetadata.keywords
          .split(',')
          .map(k => k.trim())
          .filter(k => k !== '')
      }
      return { iscn, iscnEncoded: encodeURIComponent(iscn), timestamp, ...data }
    })
  },
  computed: {
    ...mapState('wallet', {
      walletAddress: state => state.walletAddress,
    }),
  },
  watch: {
    '$route.query.key': '$fetch',
    '$route.query.reverse': '$fetch',
  },
  methods: {
    getIscnPrefix,
    domain_from_url: (url) => {
      try {
        const domain = new URL(url)
        return domain.hostname.replace('www.', '')
      } catch {
        return ''
      }
    },
    fingerprintLink (fingerprint) {
      const [schema, value] = fingerprint.split('://')
      switch (schema) {
        case 'ipfs':
          return [schema, `${IPFS_GATEWAY}/ipfs/${value}`, 'blank']

        case 'ar':
          return [schema, `${ARWEAVE_GATEWAY}/${value}`, 'blank']

        default:
          return [schema, `./fingerprint/${encodeURIComponent(fingerprint)}`, '']
      }
    },
    isValid (record) {
      return record.contentMetadata && record.contentFingerprints && record.stakeholders
    },
  }
}
</script>

<style scoped>
div.main {
  align-items: center;
}

table {
  width: 100%;
  table-layout: fixed;
  overflow-wrap: break-word;
}

table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}

td a {
  margin-left: 5px;
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
