<script setup>
  const route = useRoute()
  const adGroupId = route.params.adGroupId
  const platform = route.query.platform?.toLowerCase()
</script>
<template>
  <AdFormFieldsTiktok
    v-if="platform === 'tiktok'"
    :ad-group-id="adGroupId"
    :platform="platform"
  />
  <AdFormFieldsSnapchat
    v-if="platform === 'snapchat'"
    :ad-group-id="adGroupId"
    :platform="platform"
  />
  <AdFormFieldsX
    v-if="platform === 'twitter'"
    :ad-group-id="adGroupId"
    :platform="platform"
  />
</template>
