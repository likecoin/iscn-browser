<template>
  <div>
    <MainHeader />
    <div>
      <TagList />
      <ISCNList :url="url" />
    </div>
  </div>
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
