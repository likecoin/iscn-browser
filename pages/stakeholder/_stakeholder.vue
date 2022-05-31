<template>
  <ISCNList :url="url" />
</template>

<script>
export default {
  name: 'StakholderList',
  data() {
    const stakeholder = this.$route.params.stakeholder
    return {
      url: `/iscn/records?stakeholders.entity.name=${stakeholder}`,
    }
  },
}
</script>
