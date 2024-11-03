<script setup>
</script>
<template>
  <div class="router-container">
    <DesktopLayout v-if="$vuetify.display.mdAndUp" />
    <MobileLayout v-if="!$vuetify.display.mdAndUp" class="mobile-layout" />
  </div>
</template>

<style lang="scss" scoped>
</style>
