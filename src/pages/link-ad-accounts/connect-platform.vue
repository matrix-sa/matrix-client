<script setup>
  const show = ref(true)
</script>
<template>
  <div>
    <button @click="show = !show">Toggle</button>
    <p v-if="show">hello</p>
  </div>
</template>

<style>

</style>
