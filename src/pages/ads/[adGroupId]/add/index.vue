<script setup>
  const route = useRoute()
</script>
<template>
  <h1>Create Ad for ad group {{ route.params.adGroupId }}
    for platform {{ route.query.platform }}</h1>
</template>
