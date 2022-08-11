<template>
  <p v-if="$fetchState.pending">Loading...</p>
  <p v-else-if="$fetchState.error">Not found</p>
  <div v-else class="main">
    <NuxtLink :to="`?key=${key}&reverse=${reverse}`">Next</NuxtLink>
    <NuxtLink :to="`?reverse=${!reverse}`">Reverse</NuxtLink>
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
      <tr v-for="record in records"
        :key="record.iscn"
      >
        <td>{{ record.timestamp }}</td>
        <td>{{ record.contentMetadata.name }}</td>
        <td>
          <NuxtLink v-for="keyword in record.contentMetadata.keywords"
            :key="keyword" :to="`/keyword/${encodeURIComponent(keyword)}`">
            {{ keyword }}
          </NuxtLink>
        </td>
        <td>
        <a v-for="holder in record.stakeholders" :key="holder.entity.name">
          <NuxtLink
            :to="`/stakeholder/${encodeURIComponent(holder.entity.name)}`"
          >
            {{ holder.entity.name }}
          </NuxtLink>
        </a>
        </td>
        <td><NuxtLink :to="`/owner/${encodeURIComponent(record.owner)}`">{{ record.owner }}</NuxtLink></td>
        <td><a
            v-if="record.contentMetadata.url"
            :href="record.contentMetadata.url"
            target="_blank">
            {{ domain_from_url(record.contentMetadata.url) }}
        </a></td>
        <td v-if="record.contentFingerprints">
          <a
            v-for="[schema, link] in record.contentFingerprints.map(fingerprintLink)"
            :key="schema"
            :href="link"
            target="blank"
          >
              {{ schema }}
          </a>
        </td>
        <td v-else>
        </td>
        <td>
          <a
            target="_blank"
            :href="`https://app.like.co/view/${encodeURIComponent(record.iscn)}`"
          >Detail
          </a>
          <a
            target="_blank"
            :href="`${INDEXER}/iscn/records?iscn_id=${record.iscn}`">
            Raw Data
          </a>
        </td>
      </tr>
    </table>
    <p>There are {{ records.length }} results in total.</p>
    <NuxtLink :to="`?key=${key}&reverse=${reverse}`">Next</NuxtLink>
    <NuxtLink :to="`?reverse=${!reverse}`">Reverse</NuxtLink>
  </div>
</template>

<script>
import { IPFS_GATEWAY, ARWEAVE_GATEWAY, INDEXER } from '../config.js';

function isDepub(record) {
  try {
    return record.contentMetadata.url === undefined && record.contentFingerprints.includes("https://depub.blog")
  } catch (err) {
      return false
    }
}
export default {
  props: {
    url: String,
  },
  data() {
    return {
      records: [],
      page: 1,
      limit: 12,
      pageCount: 0,
      next: '',
      previous: '',
      last: 0,
      INDEXER,
    }
  },
  async fetch() {
    const limit = 100
    const key = this.$route.query.key || 0
    this.reverse = this.$route.query.reverse !== 'false'
    const url = `${this.$props.url}&limit=${limit}&key=${key}&reverse=${this.reverse}`
    console.log(url)
    const res = await this.$axios.$get(url)
    this.key = res.pagination.next_key
    this.records = res.records.map((record) => {
      const { data } = record
      const datetime = new Date(data.recordTimestamp)
      const timestamp = datetime.toLocaleString()
      const iscn = data["@id"]
      if (isDepub(data)) {
        const re = RegExp('iscn://[^/]+/', 'g') // eslint-disable-line
        const depubUrl = iscn.replace(re, '')
        data.contentMetadata.url = `https://depub.space/${depubUrl}`
      }
      if (data.contentMetadata.keywords) {
        data.contentMetadata.keywords = data.contentMetadata.keywords
          .split(',')
          .map((k) => k.trim())
          .filter((k) => k !== '')
      }
      return { iscn, timestamp, ...data }
    })
    this.pageCount = Math.ceil(this.records.length / this.limit)
  },
  watch: {
    '$route.query': '$fetch'
  },
  methods: {
    changePage: (pageNum) => {
      this.page = pageNum
    },
    domain_from_url: (url) => {
      try {
        const domain = new URL(url);
        return domain.hostname.replace("www.", "")
      } catch {
        return ""
      }
    },
    fingerprintLink(fingerprint) {
      const [schema, value] = fingerprint.split('://')
      switch (schema) {
        case 'ipfs':
          return [schema, `${IPFS_GATEWAY}/ipfs/${value}`]

          case 'ar':
          return [schema, `${ARWEAVE_GATEWAY}/${value}`]

          default:
          return [schema, `/fingerprint/${encodeURIComponent(fingerprint)}`]
      }
    },
  },
}
</script>

<style>
div.main {
  align-items: center;
}
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
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
