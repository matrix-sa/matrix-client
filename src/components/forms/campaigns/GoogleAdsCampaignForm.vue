<script>

</script>
<template>
  <ApptextField
    label="Enter your name"
    placeholder="Name"
  />

  <AppNumberField
    label="Enter your value"
    placeholder="150"
  />

  <AppSelect
    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
    label="Select"
    placeholder="Select"
  />
</template>
<style lang="scss">
</style>
