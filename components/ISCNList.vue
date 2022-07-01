<template>
  <p v-if="$fetchState.pending">Loading...</p>
  <p v-else-if="$fetchState.error">Not found</p>
  <div v-else class="main">
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
            :key="keyword" :to="`/keyword/${keyword}`">
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
        <td><NuxtLink :to="`/owner/${record.owner}`">{{ record.owner }}</NuxtLink></td>
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
            :href="`https://mainnet-node.like.co/iscn/records/id?iscn_id=${record.iscn}`">
            Raw Data
          </a>
        </td>
      </tr>
    </table>
    <p>There are {{ records.length }} results in total.</p>
  </div>
</template>

<script>
import Paginate from 'vuejs-paginate'
function isDepub(record) {
  try {
    return record.contentMetadata.url === "" && record.contentFingerprints.includes("https://depub.blog")
  } catch (err) {
      return false
    }
}
export default {
  props: {
    url: String,
  },
  components: {
    Paginate,
  },
  methods: {
    changePage: (pageNum) => {
      this.page = pageNum
    },
    domain_from_url: (url) => {
      try {
        let domain = new URL(url);
        console.log(domain);
        return domain.hostname.replace("www.", "")
      } catch {
        return ""
      }
    },
    fingerprintLink(fingerprint) {
      const [schema, value] = fingerprint.split('://')
      switch (schema) {
        case 'ipfs':
          return [schema, `https://infura-ipfs.io/ipfs/${value}`]

          case 'ar':
          return [schema, `https://arweave.net/${value}`]

          default:
          return [schema, `/fingerprint/${encodeURIComponent(fingerprint)}`]
      }
    },
  },
  data() {
    return {
      records: [],
      page: 1,
      limit: 12,
      pageCount: 0,
      next: '',
      previous: '',
    }
  },
  async fetch() {
    const limit = 100
    const url = `${this.$props.url}&limit=${limit}`
    console.log(url)
    const res = await this.$axios.$get(url)
    this.records = res.records.map((record) => {
      console.log(record)
      const { data } = record
      const datetime = new Date(data.recordTimestamp)
      const timestamp = datetime.toLocaleString()
      const iscn = data["@id"]
      if (isDepub(data)) {
        let depubUrl = iscn.replace(/iscn:\/\/[^\/]+\//, '')
                                    data.contentMetadata.url = `https://depub.space/${depubUrl}`
      }
      if (data.contentMetadata.keywords) {
        data.contentMetadata.keywords = data.contentMetadata.keywords
          .split(',')
          .map((k) => k.trim())
          .filter((k) => k !== '')
          console.log(data.contentMetadata.keywords)
      }
      return { iscn, timestamp, ...data }
    })
    this.pageCount = Math.ceil(this.records.length / this.limit)
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
#block-list {
  margin-top: 60px;
  display: grid;
  row-gap: 48px;
  column-gap: 24px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.block-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;

  text-decoration: none;
  color: black;

  min-height: 280px;
  border: 2px solid black;
  padding: 12px;
  border-radius: 24px;
}

.tags {
  margin-top: 20px;
}
/* text style */

.time-stamp {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: darkgrey;
}

.strong {
  margin: 0;
  margin-top: 16px;
  font-size: 18px;
  font-weight: 600;
  color: darkgrey;
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
