<template>
  <div>
    <h3>Stakeholder: {{ stakeholder }}</h3>
    <ISCNList :url="url" />
  </div>
</template>

<script>
export default {
  name: 'StakholderList',
  data() {
    const stakeholder = this.$route.params.stakeholder
    return {
      stakeholder,
      url: `/iscn/records?stakeholders.entity.name=${encodeURIComponent(
        stakeholder
      )}`,
    }
  },
}
</script>
