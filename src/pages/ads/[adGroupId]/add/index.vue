<script setup>
  const route = useRoute()
  const adGroupId = route.params.adGroupId
  const platform = route.query.platform
</script>
<template>
  <AdFormTiktok
    v-if="platform === 'tiktok'"
    :ad-group-id="adGroupId"
    :platform="platform"
  />
</template>
